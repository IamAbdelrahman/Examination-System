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
        public IActionResult GetAll()
        {
            var exams = examRepo.GetAll();
            return Ok(exams);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var exam = examRepo.GetById(id);
            if (exam == null)
                return NotFound();

            return Ok(exam);
        }

        [HttpPost]
        public IActionResult CreateExam([FromBody] CreateExamDto examDto)
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

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var exam = examRepo.GetById(id);
            if (exam == null)
                return NotFound();

            examRepo.Delete(id);
            examRepo.save();
            return NoContent();
        }
    }

}
