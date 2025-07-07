using ProjectAngularApi.Models;
using ProjectAngularApi.Repositories.IRepositories;
using ProjectAngularApi.Service.DB;

namespace ProjectAngularApi.Repositories
{
    public class QuestionRepo : IQuestionRepo
    {
        private readonly AngularContext context;

        public QuestionRepo(AngularContext _context)
        {
            this.context = _context;
        }

        public void Add(Question entity)
        {
            context.Questions.Add(entity);
        }

        public void Delete(int id)
        {
            Question obj = GetById(id);
            context.Questions.Remove(obj);
        }

        public List<Question> GetAll()
        {
            return context.Questions.ToList();
        }

        public Question GetById(int id)
        {
            return context.Questions.Find(id);
        }

        public void save()
        {
            context.SaveChanges();
        }

        public void Update(Question entity)
        {
            context.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        }
    }
}
 

