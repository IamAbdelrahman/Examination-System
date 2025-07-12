using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ProjectAngularApi.Models.Entities
{
    public class ExamResult
    {
        public int Id { get; set; }

        [Required]
        [ForeignKey("Student")]
        public string StudentId { get; set; }
        public ApplicationUser Student { get; set; }

        [Required]
        [ForeignKey("Exam")]
        public int ExamId { get; set; }
        public Exam Exam { get; set; }

        public int Score { get; set; }

        public DateTime DateTaken { get; set; }
    }
}
