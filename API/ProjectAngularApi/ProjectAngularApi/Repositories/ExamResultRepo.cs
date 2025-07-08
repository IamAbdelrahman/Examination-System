using ProjectAngularApi.Models;
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
            return context.ExamResults.ToList();
        }

        public ExamResult GetById(int id)
        {
            return context.ExamResults.Find(id);
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
