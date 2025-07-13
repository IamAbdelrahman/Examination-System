using System.ComponentModel.DataAnnotations;

namespace ProjectAngularApi.Dtos
{
    public class StudentExamListDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int QuestionCount { get; set; }
    }

    public class StudentExamDetailDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public List<StudentQuestionDto> Questions { get; set; }
    }

    public class StudentQuestionDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public List<StudentOptionDto> Options { get; set; }
    }

    public class StudentOptionDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
    }

    public class ExamSubmissionDto
    {
        [Required]
        public int ExamId { get; set; }
        [Required]
        public List<QuestionAnswerDto> Answers { get; set; }
    }

    public class QuestionAnswerDto
    {
        [Required]
        public int QuestionId { get; set; }
        [Required]
        public int SelectedOptionId { get; set; }
    }

    public class ExamResultDto
    {
        public int Id { get; set; }
        public int ExamId { get; set; }
        public string ExamTitle { get; set; }
        public int Score { get; set; }
        public int TotalQuestions { get; set; }
        public double Percentage { get; set; }
        public DateTime DateTaken { get; set; }
        public List<QuestionResultDto> QuestionResults { get; set; }
    }

    public class QuestionResultDto
    {
        public int QuestionId { get; set; }
        public string QuestionText { get; set; }
        public int SelectedOptionId { get; set; }
        public string SelectedOptionText { get; set; }
        public int CorrectOptionId { get; set; }
        public string CorrectOptionText { get; set; }
        public bool IsCorrect { get; set; }
    }

    public class StudentResultSummaryDto
    {
        public int ResultId { get; set; }
        public string ExamTitle { get; set; }
        public int Score { get; set; }
        public int TotalQuestions { get; set; }
        public double Percentage { get; set; }
        public DateTime DateTaken { get; set; }
    }
}


