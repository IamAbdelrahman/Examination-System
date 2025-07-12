using ProjectAngularApi.Models.DTOs.Questions;
using System.ComponentModel.DataAnnotations;

namespace ProjectAngularApi.Models.DTOs.Exam
{
    public class CreateExamDto
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        [Required]
        [MinLength(1, ErrorMessage = "An exam must have at least one question")]
        public List<CreateQuestionDto> Questions { get; set; }
    } 
}
