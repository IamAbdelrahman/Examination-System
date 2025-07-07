using ProjectAngularApi.Models;
using ProjectAngularApi.Repositories.IRepositories;
using ProjectAngularApi.Service.DB;

namespace ProjectAngularApi.Repositories
{
    public class OptionRepo : IOptionRepo
    {
        private readonly AngularContext context;

        public OptionRepo(AngularContext _context)
        {
            this.context = _context;
        }

        public void Add(Option entity)
        {
            context.Options.Add(entity);
        }

        public void Delete(int id)
        {
            Option obj = GetById(id);
            context.Options.Remove(obj);
        }

        public List<Option> GetAll()
        {
            return context.Options.ToList();
        }

        public Option GetById(int id)
        {
            return context.Options.Find(id);
        }

        public void save()
        {
            context.SaveChanges();
        }

        public void Update(Option entity)
        {
            context.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        }
    }
}
