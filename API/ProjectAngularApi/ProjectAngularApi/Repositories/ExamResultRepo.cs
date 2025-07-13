using Microsoft.EntityFrameworkCore;
using ProjectAngularApi.Models;
using ProjectAngularApi.Models.Entities;
using ProjectAngularApi.Repositories.IRepositories;
using ProjectAngularApi.Service.DB;

namespace ProjectAngularApi.Repositories
{
    public class ExamResultRepo : IExamResultRepo
    {
        private readonly AngularContext context;

        public ExamResultRepo(AngularContext _context)
        {
            this.context = _context;
        }

        public void Add(ExamResult entity)
        {
            context.ExamResults.Add(entity);
        }

        public void Delete(int id)
        {
            ExamResult obj = GetById(id);
            context.ExamResults.Remove(obj);
        }

        public List<ExamResult> GetAll()
        {
            return context.ExamResults
                .Include(r => r.Exam)
                .Include(r => r.Student)
                .ToList();
        }

        public ExamResult GetById(int id)
        {
            return context.ExamResults.Find(id);
        }

        public ExamResult GetByIdWithDetails(int id)
        {
            return context.ExamResults
                .Include(r => r.Exam)
                    .ThenInclude(e => e.Questions)
                    .ThenInclude(q => q.Options)
                .Include(r => r.Student)
                .FirstOrDefault(r => r.Id == id);
        }

        public List<ExamResult> GetByStudentId(string studentId)
        {
            return context.ExamResults
                .Include(r => r.Exam)
                    .ThenInclude(e => e.Questions)
                .Where(r => r.StudentId == studentId)
                .OrderByDescending(r => r.DateTaken)
                .ToList();
        }

        public ExamResult GetByStudentAndExam(string studentId, int examId)
        {
            return context.ExamResults
                .Include(r => r.Exam)
                .FirstOrDefault(r => r.StudentId == studentId && r.ExamId == examId);
        }

        public void save()
        {
            context.SaveChanges();
        }

        public void Update(ExamResult entity)
        {
            context.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        }
    }
}

