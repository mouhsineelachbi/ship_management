using ship_management.DB;
using ship_management.Interfaces;
using ship_management.Models;
using ship_management.Paging;

namespace ship_management.Repositories
{
    public class ShipRepository : RepositoryBase<Ship>, IShipRepository
    {
        public ShipRepository(AppDbContext ctx) : base(ctx)
        {

        }

        public void CreateShip(Ship ship)
        {
            Create(ship);
        }

        public void DeleteShip(Ship ship)
        {
            Delete(ship);
        }

        public Ship GetShip(int id)
        {
            return FindByCondition(ship => ship.id == id).FirstOrDefault();
        }

        public Task<PagedList<Ship>> GetShips(PagingParameters pagingParameters)
        {
            return Task.FromResult(PagedList<Ship>.getPagedList(FindAll().OrderBy(s => s.id), pagingParameters.pageNumber, pagingParameters.PageSize));
        }

        public void UpdateShip(Ship ship)
        {
            Update(ship);
        }

        public void DeleteShips(Ship[] ships)
        {
            DeleteMultiple(ships);
        }
    }
}
