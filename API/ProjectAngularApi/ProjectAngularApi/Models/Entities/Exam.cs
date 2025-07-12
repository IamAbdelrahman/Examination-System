using System.ComponentModel.DataAnnotations;

namespace ProjectAngularApi.Models.Entities
{
    public class Exam
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        public List<Question> Questions { get; set; } = new List<Question>();
    }
}
