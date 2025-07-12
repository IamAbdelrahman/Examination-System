using System.ComponentModel.DataAnnotations;

namespace ProjectAngularApi.Models.DTOs.Options
{
    public class CreateOptionDto
    {
        [Required]
        public string Text { get; set; }
        public bool IsCorrect { get; set; }
    }
}
