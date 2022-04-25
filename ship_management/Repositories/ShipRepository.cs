using ship_management.DB;
using ship_management.Interfaces;
using ship_management.Models;

namespace ship_management.Repositories
{
    public class ShipRepository : RepositoryBase<Ship>, IShipRepository
    {
        public ShipRepository(AppDbContext ctx) : base(ctx)
        {

        }

        /*
            Create Ship using ship object and base implementation
        */
        public void CreateShip(Ship ship)
        {
            Create(ship);
        }

        /*
            Delete Ship using ship object and base implementation
        */
        public void DeleteShip(Ship ship)
        {
            Delete(ship);
        }

        /*
            Get Ship by Its id using ship object and base implementation
        */
        public Ship GetShip(int id)
        {
            return FindByCondition(ship => ship.id == id).FirstOrDefault();
        }

        /*
            Get Ship with pagination using ship object and base implementation
        */
        public Task<PagedList<Ship>> GetShips(PagingParameters pagingParameters)
        {
            return Task.FromResult(PagedList<Ship>.getPagedList(FindAll().OrderBy(s => s.id), pagingParameters.pageNumber, pagingParameters.PageSize));
        }

        /*
            Update ship using base implementation
        */
        public void UpdateShip(Ship ship)
        {
            Update(ship);
        }

        /*
            Delete an set of ships using base implementation
        */
        public void DeleteShips(Ship[] ships)
        {
            DeleteMultiple(ships);
        }
    }
}
