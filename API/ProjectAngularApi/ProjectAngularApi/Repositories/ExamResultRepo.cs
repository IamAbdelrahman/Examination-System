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
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public List<ExamResult> GetAll()
        {
            throw new NotImplementedException();
        }

        public ExamResult GetById(int id)
        {
            throw new NotImplementedException();
        }

        public void save()
        {
            throw new NotImplementedException();
        }

        public void Update(ExamResult entity)
        {
            throw new NotImplementedException();
        }
    }
}
