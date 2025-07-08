using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectAngularApi.Dtos;
using ProjectAngularApi.Models;
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

                return CreatedAtAction(nameof(GetById), new { id = exam.Id }, exam);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while creating the exam.");
            }
        }

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

        [HttpGet("{id}/questions")]
        public IActionResult GetExamQuestions(int id)
        {
            try
            {
                var exam = examRepo.GetById(id);
                if (exam == null)
                    return NotFound($"Exam with ID {id} not found.");

                return Ok(exam.Questions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving exam questions.");
            }
        }

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