using System.IdentityModel.Tokens.Jwt;

namespace ship_management.Interfaces
{
    public interface IJwtService
    {
        public string Generate(int id);
        public JwtSecurityToken Verify(string jwt);
    }
}
