using ship_management.Models;
using ship_management.Paging;

namespace ship_management.Interfaces
{
    public interface IUserRepository : IRepositoryBase<User>
    {
        Task<PagedList<User>> GetUsers(PagingParameters pagingParameters);

        User GetUserById(int id);

        void CreateUser(User user);

        public User GetUserByUsername(string username);
    }
}
