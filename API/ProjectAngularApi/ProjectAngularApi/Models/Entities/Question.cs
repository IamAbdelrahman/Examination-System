using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ProjectAngularApi.Models.Entities
{
    public class Question
    {
        public int Id { get; set; }

        [Required]
        public string Text { get; set; }

        public List<Option> Options { get; set; } = new List<Option>();

        [ForeignKey("Exam")]
        public int ExamId { get; set; }
        public Exam Exam { get; set; }
    }
}
