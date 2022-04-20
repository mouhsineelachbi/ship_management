using ship_management.DB;
using ship_management.Interfaces;
using ship_management.Models;
using ship_management.Paging;

namespace ship_management.Repositories
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(AppDbContext ctx) : base(ctx)
        {

        }
        public void CreateUser(User user)
        {
            Create(user);
        }

        public User GetUserById(int id)
        {
            return FindByCondition(user => user.id == id).FirstOrDefault();
        }

        public User GetUserByUsername(string username)
        {
            return FindByCondition(user => user.Username == username).FirstOrDefault();
        }


        public Task<PagedList<User>> GetUsers(PagingParameters pagingParameters)
        {
            return Task.FromResult(PagedList<User>.getPagedList(FindAll().OrderBy(s => s.id), pagingParameters.pageNumber, pagingParameters.PageSize));
        }
    }
}
