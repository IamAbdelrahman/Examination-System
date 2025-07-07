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
            context.Exams.Add(entity);  
            
        }

        public void Delete(int id)
        {
            Exam obj = GetById(id);
            context.Exams.Remove(obj);
        }

        public List<Exam> GetAll()
        {
            return context.Exams.ToList();  
        }

        public Exam GetById(int id)
        {
            return context.Exams.Find(id);
        }

        public void save()
        {
            context.SaveChanges();
        }

        public void Update(Exam entity)
        {
            context.Entry(entity).State=Microsoft.EntityFrameworkCore.EntityState.Modified;
        }
    }
}
