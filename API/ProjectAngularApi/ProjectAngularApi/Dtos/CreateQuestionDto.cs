namespace ProjectAngularApi.Dtos
{
    public class CreateQuestionDto
    {
        public string Text { get; set; }
        public List<CreateOptionDto> Options { get; set; }
    }
}
