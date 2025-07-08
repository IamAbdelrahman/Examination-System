using System.ComponentModel.DataAnnotations;

namespace ProjectAngularApi.Dtos
{
    public class CreateOptionDto
    {
        [Required]
        public string Text { get; set; }
        public bool IsCorrect { get; set; }
    }
}
