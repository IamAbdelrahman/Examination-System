using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ProjectAngularApi.Dtos;
using ProjectAngularApi.Models;
using ProjectAngularApi.Models.Entities;
using ProjectAngularApi.Repositories.IRepositories;
using ProjectAngularApi.Service.DB;
using System.Security.Claims;

namespace ProjectAngularApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class StudentExamController : ControllerBase
    {
        private readonly IExamRepo examRepo;
        private readonly IExamResultRepo examResultRepo;
        private readonly UserManager<ApplicationUser> userManager;

        public StudentExamController(
            IExamRepo examRepo,
            IExamResultRepo examResultRepo,
            UserManager<ApplicationUser> userManager)
        {
            this.examRepo = examRepo;
            this.examResultRepo = examResultRepo;
            this.userManager = userManager;
        }

        [HttpGet]
        public IActionResult GetAvailableExams([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                var exams = examRepo.GetAll()
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Select(e => new StudentExamListDto
                    {
                        Id = e.Id,
                        Title = e.Title,
                        Description = e.Description,
                        QuestionCount = e.Questions.Count
                    })
                    .ToList();

                return Ok(exams);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving exams.");
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetExamForTaking(int id)
        {
            try
            {
                var exam = examRepo.GetByIdWithDetails(id);
                if (exam == null)
                    return NotFound($"Exam with ID {id} not found.");

                var studentExamDto = new StudentExamDetailDto
                {
                    Id = exam.Id,
                    Title = exam.Title,
                    Description = exam.Description,
                    Questions = exam.Questions.Select(q => new StudentQuestionDto
                    {
                        Id = q.Id,
                        Text = q.Text,
                        Options = q.Options.Select(o => new StudentOptionDto
                        {
                            Id = o.Id,
                            Text = o.Text
                        }).ToList()
                    }).ToList()
                };

                return Ok(studentExamDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving the exam.");
            }
        }

        [HttpPost("submit")]
        public async Task<IActionResult> SubmitExam([FromBody] ExamSubmissionDto submissionDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var userId = User.FindFirst("Uid")?.Value;

                if (string.IsNullOrEmpty(userId))
                {
                    userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                }

                if (string.IsNullOrEmpty(userId))
                    return Unauthorized("User not authenticated or user ID not found in token.");

                // Debug logging
                Console.WriteLine($"User ID from token: {userId}");
                Console.WriteLine($"Exam ID: {submissionDto.ExamId}");

                var user = await userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    Console.WriteLine($"User with ID {userId} not found in database");
                    return Unauthorized("User not found in database.");
                }

                var exam = examRepo.GetByIdWithDetails(submissionDto.ExamId);
                if (exam == null)
                    return NotFound($"Exam with ID {submissionDto.ExamId} not found.");

                if (exam.Questions == null || exam.Questions.Count == 0)
                    return BadRequest("Exam has no questions.");

                if (submissionDto.Answers == null || submissionDto.Answers.Count == 0)
                    return BadRequest("No answers provided.");

                if (submissionDto.Answers.Count != exam.Questions.Count)
                    return BadRequest("Number of answers must match number of questions.");

                var existingResult = examResultRepo.GetByStudentAndExam(userId, submissionDto.ExamId);
                if (existingResult != null)
                    return BadRequest("You have already taken this exam.");

                int score = 0;
                var questionResults = new List<QuestionResultDto>();

                foreach (var answer in submissionDto.Answers)
                {
                    var question = exam.Questions.FirstOrDefault(q => q.Id == answer.QuestionId);
                    if (question == null)
                        return BadRequest($"Question with ID {answer.QuestionId} not found in exam.");

                    if (question.Options == null || question.Options.Count == 0)
                        return BadRequest($"Question {answer.QuestionId} has no options.");

                    var selectedOption = question.Options.FirstOrDefault(o => o.Id == answer.SelectedOptionId);
                    if (selectedOption == null)
                        return BadRequest($"Option with ID {answer.SelectedOptionId} not found in question {answer.QuestionId}.");

                    var correctOption = question.Options.FirstOrDefault(o => o.IsCorrect);
                    if (correctOption == null)
                        return BadRequest($"Question {answer.QuestionId} has no correct answer defined.");

                    bool isCorrect = selectedOption.IsCorrect;

                    if (isCorrect)
                        score++;

                    questionResults.Add(new QuestionResultDto
                    {
                        QuestionId = question.Id,
                        QuestionText = question.Text,
                        SelectedOptionId = selectedOption.Id,
                        SelectedOptionText = selectedOption.Text,
                        CorrectOptionId = correctOption.Id,
                        CorrectOptionText = correctOption.Text,
                        IsCorrect = isCorrect
                    });
                }

                var examResult = new ExamResult
                {
                    StudentId = userId,
                    ExamId = submissionDto.ExamId,
                    Score = score,
                    DateTaken = DateTime.Now
                };

                Console.WriteLine($"Creating ExamResult: StudentId={examResult.StudentId}, ExamId={examResult.ExamId}, Score={examResult.Score}");

                try
                {
                    examResultRepo.Add(examResult);
                    examResultRepo.save();
                    Console.WriteLine($"ExamResult saved successfully with ID: {examResult.Id}");
                }
                catch (Exception saveEx)
                {
                    Console.WriteLine($"Error saving ExamResult: {saveEx.Message}");
                    Console.WriteLine($"Inner exception: {saveEx.InnerException?.Message}");
                    throw;
                }

                var resultDto = new ExamResultDto
                {
                    Id = examResult.Id,
                    ExamId = exam.Id,
                    ExamTitle = exam.Title,
                    Score = score,
                    TotalQuestions = exam.Questions.Count,
                    Percentage = Math.Round((double)score / exam.Questions.Count * 100, 2),
                    DateTaken = examResult.DateTaken,
                    QuestionResults = questionResults
                };

                return Ok(resultDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in SubmitExam: {ex.Message}");
                Console.WriteLine($"Inner Exception: {ex.InnerException?.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return StatusCode(500, $"An error occurred while submitting the exam: {ex.Message}");
            }
        }

        [HttpGet("results")]
        public IActionResult GetMyResults([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                var userId = User.FindFirst("Uid")?.Value ??
                           User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(userId))
                    return Unauthorized("User not authenticated.");

                var results = examResultRepo.GetByStudentId(userId)
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Select(r => new StudentResultSummaryDto
                    {
                        ResultId = r.Id,
                        ExamTitle = r.Exam.Title,
                        Score = r.Score,
                        TotalQuestions = r.Exam.Questions.Count,
                        Percentage = Math.Round((double)r.Score / r.Exam.Questions.Count * 100, 2),
                        DateTaken = r.DateTaken
                    })
                    .ToList();

                return Ok(results);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving your results.");
            }
        }

        [HttpGet("results/{resultId}")]
        public IActionResult GetResultDetails(int resultId)
        {
            try
            {
                var userId = User.FindFirst("Uid")?.Value ??
                           User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(userId))
                    return Unauthorized("User not authenticated.");

                var result = examResultRepo.GetByIdWithDetails(resultId);
                if (result == null)
                    return NotFound($"Result with ID {resultId} not found.");

                if (result.StudentId != userId)
                    return Forbid("You can only view your own results.");

                var resultDto = new StudentResultSummaryDto
                {
                    ResultId = result.Id,
                    ExamTitle = result.Exam.Title,
                    Score = result.Score,
                    TotalQuestions = result.Exam.Questions.Count,
                    Percentage = Math.Round((double)result.Score / result.Exam.Questions.Count * 100, 2),
                    DateTaken = result.DateTaken
                };

                return Ok(resultDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving the result details.");
            }
        }

        [HttpGet("search")]
        public IActionResult SearchExams([FromQuery] string title, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                var exams = examRepo.GetAll().AsQueryable();

                if (!string.IsNullOrEmpty(title))
                {
                    exams = exams.Where(e => e.Title.Contains(title, StringComparison.OrdinalIgnoreCase));
                }

                var result = exams
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Select(e => new StudentExamListDto
                    {
                        Id = e.Id,
                        Title = e.Title,
                        Description = e.Description,
                        QuestionCount = e.Questions.Count
                    })
                    .ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while searching exams.");
            }
        }

        [HttpGet("debug/token")]
        public IActionResult DebugToken()
        {
            var claims = User.Claims.Select(c => new { c.Type, c.Value }).ToList();
            return Ok(new { Claims = claims });
        }
    }
}