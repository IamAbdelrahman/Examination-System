using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectAngularApi.Models;
using ProjectAngularApi.Models.DTOs.Exam;
using ProjectAngularApi.Models.Entities;
using ProjectAngularApi.Repositories.IRepositories;

namespace ProjectAngularApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ExamController : ControllerBase
    {
        private readonly IExamRepo examRepo;

        public ExamController(IExamRepo examRepo)
        {
            this.examRepo = examRepo;
        }
        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpGet]
        public IActionResult GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                var exams = examRepo.GetAll()
                        .Skip((page - 1) * pageSize)
                        .Take(pageSize)
                        .ToList();
                return Ok(exams);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving exams.");
            }
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var exam = examRepo.GetById(id);
                if (exam == null)
                    return NotFound($"Exam with ID {id} not found.");

                return Ok(exam);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving the exam.");
            }
        }

        [Authorize(Roles="Admin", AuthenticationSchemes = "Bearer")]
        [HttpPost]
        public IActionResult CreateExam([FromBody] CreateExamDto examDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (examDto.Questions == null || examDto.Questions.Count == 0)
                return BadRequest("An exam must have at least one question.");

            foreach (var question in examDto.Questions)
            {
                if (question.Options == null || question.Options.Count < 2)
                    return BadRequest("Each question must have at least 2 options.");

                var correctAnswers = question.Options.Count(o => o.IsCorrect);
                if (correctAnswers != 1)
                    return BadRequest("Each question must have exactly one correct answer.");
            }

            try
            {
                var exam = new Exam
                {
                    Title = examDto.Title,
                    Description = examDto.Description,
                    Questions = examDto.Questions.Select(q => new Question
                    {
                        Text = q.Text,
                        Options = q.Options.Select(o => new Option
                        {
                            Text = o.Text,
                            IsCorrect = o.IsCorrect
                        }).ToList()
                    }).ToList()
                };

                examRepo.Add(exam);
                examRepo.save();

                var responseDto = new ExamResponseDto
                {
                    Id = exam.Id,
                    Title = exam.Title,
                    Description = exam.Description,
                    Questions = exam.Questions.Select(q => new QuestionResponseDto
                    {
                        Id = q.Id,
                        Text = q.Text,
                        Options = q.Options.Select(o => new OptionResponseDto
                        {
                            Id = o.Id,
                            Text = o.Text,
                            IsCorrect = o.IsCorrect
                        }).ToList()
                    }).ToList()
                };

                return CreatedAtAction(nameof(GetById), new { id = exam.Id }, responseDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while creating the exam.");
            }
        }

        [Authorize(Roles = "Admin", AuthenticationSchemes = "Bearer")]
        [HttpPut("{id}")]
        public IActionResult UpdateExam(int id, [FromBody] CreateExamDto examDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (examDto.Questions == null || examDto.Questions.Count == 0)
                return BadRequest("An exam must have at least one question.");

            foreach (var question in examDto.Questions)
            {
                if (question.Options == null || question.Options.Count < 2)
                    return BadRequest("Each question must have at least 2 options.");

                var correctAnswers = question.Options.Count(o => o.IsCorrect);
                if (correctAnswers != 1)
                    return BadRequest("Each question must have exactly one correct answer.");
            }

            try
            {
                var existingExam = examRepo.GetById(id);
                if (existingExam == null)
                    return NotFound($"Exam with ID {id} not found.");

                existingExam.Title = examDto.Title;
                existingExam.Description = examDto.Description;

                existingExam.Questions = examDto.Questions.Select(q => new Question
                {
                    Text = q.Text,
                    ExamId = id,
                    Options = q.Options.Select(o => new Option
                    {
                        Text = o.Text,
                        IsCorrect = o.IsCorrect
                    }).ToList()
                }).ToList();

                examRepo.Update(existingExam);
                examRepo.save();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while updating the exam.");
            }
        }

        [Authorize(Roles = "Admin", AuthenticationSchemes = "Bearer")]
        [HttpDelete("{id}")]
        public IActionResult DeleteExam(int id)
        {
            try
            {
                var exam = examRepo.GetById(id);
                if (exam == null)
                    return NotFound($"Exam with ID {id} not found.");

                examRepo.Delete(id);
                examRepo.save();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while deleting the exam.");
            }
        }

        [HttpGet("details/{id}")]
        public IActionResult GetByIdDetails(int id)
        {
            try
            {
                var exam = examRepo.GetByIdWithDetails(id); 
                if (exam == null)
                    return NotFound($"Exam with ID {id} not found.");

                var responseDto = new ExamResponseDto
                {
                    Id = exam.Id,
                    Title = exam.Title,
                    Description = exam.Description,
                    Questions = exam.Questions?.Select(q => new QuestionResponseDto
                    {
                        Id = q.Id,
                        Text = q.Text,
                        Options = q.Options?.Select(o => new OptionResponseDto
                        {
                            Id = o.Id,
                            Text = o.Text,
                            IsCorrect = o.IsCorrect
                        }).ToList() ?? new List<OptionResponseDto>()
                    }).ToList() ?? new List<QuestionResponseDto>()
                };

                return Ok(responseDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving the exam.");
            }
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpGet("search")]
        public IActionResult SearchExams([FromQuery] string title)
        {
            try
            {
                var exams = examRepo.GetAll();

                if (!string.IsNullOrEmpty(title))
                {
                    exams = exams.Where(e => e.Title.Contains(title, StringComparison.OrdinalIgnoreCase)).ToList();
                }

                return Ok(exams);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while searching exams.");
            }
        }
    }
}