using Microsoft.AspNetCore.Mvc;
using ship_management.DTO;
using ship_management.Interfaces;
using ship_management.Models;
using ship_management.Services;

namespace ship_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IConfiguration Configuration;

        private readonly IUserRepository UserRepository;

        private readonly IJwtService JwtService;

        public AuthController(IConfiguration configuration, IUserRepository userRepository, IJwtService jwtService)
        {
            Configuration = configuration;
            UserRepository = userRepository;
            JwtService = jwtService;
        }

        [HttpPost("Register")]
        public IActionResult Register(RegisterDto dto)
        {
            User user = new User
            {
                Username = dto.Username,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };
            UserRepository.Create(user);
            return Ok(CreatedAtAction("id", new { id = user.id }, user));
        }


        [HttpPost("Login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = UserRepository.GetUserByUsername(dto.Username);
            if(user == null)
            {
                return BadRequest("Invalide credentials");
            }
            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest("Invalide credentials");
            }

            var jwt = JwtService.Generate(user.id);
            Response.Cookies.Append("jwt", jwt, new CookieOptions{
                HttpOnly = true
            });
            return Ok(new { message= "Success"});
        }

        [HttpGet("User")]
        public IActionResult User()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = JwtService.Verify(jwt);
                int userId = int.Parse(token.Issuer);
                var user = UserRepository.GetUserById(userId);

                return Ok(user);
            }
            catch(Exception e)
            {
                return Unauthorized();
            }
        }

        [HttpPost("Logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new
            {
                message = "Success"
            });
        }
    }
}
