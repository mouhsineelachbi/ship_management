using Microsoft.IdentityModel.Tokens;
using ship_management.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace ship_management.Services
{
    public class JwtService : IJwtService
    {
        IConfiguration Configuration { get;}

        public JwtService(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public string Generate(int id)
        {
            var symetricSecutiryKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                Configuration.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(symetricSecutiryKey, SecurityAlgorithms.HmacSha256);

            var header = new JwtHeader(creds);

            var payload = new JwtPayload(id.ToString(), null, null, null, DateTime.Today.AddDays(2));
            var securityToken = new JwtSecurityToken(header, payload);

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }

        public JwtSecurityToken Verify(string jwt)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var secretKey = Configuration.GetSection("AppSettings:Token").Value;
            var key  = Encoding.ASCII.GetBytes(secretKey);
            tokenHandler.ValidateToken(jwt, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false,
            }, out SecurityToken validateToken);

            return (JwtSecurityToken)validateToken;
        }
    }
}
