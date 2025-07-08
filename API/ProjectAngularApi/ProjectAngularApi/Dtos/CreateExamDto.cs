namespace ProjectAngularApi.Dtos
{
    public class CreateExamDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public List<CreateQuestionDto> Questions { get; set; }
    }
}
