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
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public List<Option> GetAll()
        {
            throw new NotImplementedException();
        }

        public Option GetById(int id)
        {
            throw new NotImplementedException();
        }

        public void save()
        {
            throw new NotImplementedException();
        }

        public void Update(Option entity)
        {
            throw new NotImplementedException();
        }
    }
}
