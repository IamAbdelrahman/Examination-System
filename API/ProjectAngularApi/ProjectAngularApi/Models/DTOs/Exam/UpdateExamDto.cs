using ProjectAngularApi.Models.DTOs.Questions;
namespace ProjectAngularApi.Models.DTOs.Exam
{
    public class UpdateExamDto 
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public List<CreateQuestionDto> Questions { get; set; }
    }
}
