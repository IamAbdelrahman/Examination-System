using ProjectAngularApi.Models.Entities;
namespace ProjectAngularApi.Repositories.IRepositories
{
    public interface IExamRepo:IRepositorie<Exam>
    {
        Exam GetByIdWithDetails(int id);
        int ExamCounts();
    }
}
