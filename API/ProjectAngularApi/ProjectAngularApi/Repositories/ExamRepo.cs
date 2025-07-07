using System;
using ProjectAngularApi.Models;
using ProjectAngularApi.Repositories.IRepositories;
using ProjectAngularApi.Service.DB;

namespace ProjectAngularApi.Repositories
{
    public class ExamRepo : IExamRepo
    {
        private readonly AngularContext context;

        public ExamRepo(AngularContext _context)
        {
            this.context = _context;
        }

        public void Add(Exam entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public List<Exam> GetAll()
        {
            throw new NotImplementedException();
        }

        public Exam GetById(int id)
        {
            throw new NotImplementedException();
        }

        public void save()
        {
            throw new NotImplementedException();
        }

        public void Update(Exam entity)
        {
            throw new NotImplementedException();
        }
    }
}
