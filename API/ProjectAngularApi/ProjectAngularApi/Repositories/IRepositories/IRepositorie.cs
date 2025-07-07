namespace ProjectAngularApi.Repositories.IRepositories
{
    public interface IRepositorie<T>
    {
        List<T> GetAll();
        T GetById(int id);
        void Add (T entity);
        void Update(T entity);
        void Delete(int id);
        void save();

    }
}
