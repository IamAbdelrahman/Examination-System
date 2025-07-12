namespace ProjectAngularApi.Models.DTOs.Exam
{
    public class ExamResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public List<QuestionResponseDto> Questions { get; set; }
    }

    public class QuestionResponseDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public List<OptionResponseDto> Options { get; set; }
    }

    public class OptionResponseDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public bool IsCorrect { get; set; }
    }
}
