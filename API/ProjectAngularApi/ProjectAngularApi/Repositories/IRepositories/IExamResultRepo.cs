using ProjectAngularApi.Models;
using ProjectAngularApi.Models.Entities;

namespace ProjectAngularApi.Repositories.IRepositories
{
    public interface IExamResultRepo : IRepositorie<ExamResult>
    {
        ExamResult GetByIdWithDetails(int id);
        List<ExamResult> GetByStudentId(string studentId);
        ExamResult GetByStudentAndExam(string studentId, int examId);

    }
}
