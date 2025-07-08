
using ProjectAngularApi.Models;
namespace ProjectAngularApi.Repositories.IRepositories
{
    public interface IExamRepo:IRepositorie<Exam>
    {
        Exam GetByIdWithDetails(int id);

    }
}
