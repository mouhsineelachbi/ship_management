using ship_management.DB;
using ship_management.Interfaces;
using ship_management.Models;

namespace ship_management.Repositories
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(AppDbContext ctx) : base(ctx)
        {

        }

        /*
            Create user using base implementation
        */
        public void CreateUser(User user)
        {
            Create(user);
        }

         /*
            Find user by Its id
        */
        public User GetUserById(int id)
        {
            return FindByCondition(user => user.id == id).FirstOrDefault();
        }

        /*
            Find user by Its username
        */
        public User GetUserByUsername(string username)
        {
            return FindByCondition(user => user.Username == username).FirstOrDefault();
        }

        /*
            Get list of users with pagination
        */
        public Task<PagedList<User>> GetUsers(PagingParameters pagingParameters)
        {
            return Task.FromResult(PagedList<User>.getPagedList(FindAll().OrderBy(s => s.id), pagingParameters.pageNumber, pagingParameters.PageSize));
        }
    }
}
