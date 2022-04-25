using ship_management.Models;

namespace ship_management.Interfaces
{
    public interface IShipRepository : IRepositoryBase<Ship>
    {
        Task<PagedList<Ship>> GetShips(PagingParameters pagingParameters);
        Ship GetShip(int id);
        void CreateShip(Ship ship);
        void UpdateShip(Ship ship);
        void DeleteShip(Ship ship);
        void DeleteShips(Ship[] ships);
    }
}
