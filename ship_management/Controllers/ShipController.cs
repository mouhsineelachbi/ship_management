using Microsoft.AspNetCore.Mvc;
using ship_management.Interfaces;
using ship_management.Models;

namespace ship_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShipController : ControllerBase
    {
        private IShipRepository _shipRepository;
        public ShipController(IShipRepository repo)
        {
            this._shipRepository = repo;
        }

        // Get All Ships
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ship>>> GetShips([FromQuery] PagingParameters pagingParameters)
        {
            return await _shipRepository.GetShips(pagingParameters);
        }


        // Get one ship by id
        [HttpGet("{id}")]
        public ActionResult<Ship> GetShipById(int id)
        {
            var ship = _shipRepository.GetShip(id);
            if (ship == null)
            {
                return NotFound();
            }
            return Ok(ship);
        }

        // Add one Ship
        [HttpPost]
        public ActionResult<Ship> CreateShip([FromBody] Ship ship)
        {
            if (ship == null)
            {
                return BadRequest("Ship object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid Ship object");
            }
            try {
                _shipRepository.CreateShip(ship);
            }
            catch(Exception e){
                return BadRequest("Duplicate ship name or code");
            }

            return Ok(CreatedAtAction("id", new { id = ship.id }, ship));
        }

        // Update one Ship by id
        [HttpPut("{id}")]
        public ActionResult<Ship> UpdateShip(int id, [FromBody] Ship ship)
        {
            if (ship == null)
            {
                return BadRequest("Ship object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid Ship object");
            }
            var dbShip = _shipRepository.GetShip(id);
            if (dbShip == null)
            {
                return NotFound();
            }
            try
            {
                _shipRepository.UpdateShip(ship);
            }
            catch(Exception e){
                return BadRequest("Name or Code already existed");
            }
            return NoContent();
        }
        

        // Delete Ship by id
        [HttpDelete("{id}")]
        public ActionResult<Ship> DeleteShip(int id)
        {
            var dbShip = _shipRepository.GetShip(id);
            if (dbShip == null)
            {
                return NotFound();
            }
            try{
            _shipRepository.DeleteShip(dbShip);
            }
            catch(Exception e)
            {
                return BadRequest("Cannot delete this ship");
            }
            return NoContent();
        }

        [HttpDelete("deleteShips")]
        public ActionResult<Ship> DeleteShips([FromBody] Ship[] ships)
        {
            if(ships == null)
            {
                return BadRequest("Ships object is null");
            }
            _shipRepository.DeleteShips(ships);
            return NoContent();
        }
    }
}
