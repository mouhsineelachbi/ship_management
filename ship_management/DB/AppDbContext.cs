using Microsoft.EntityFrameworkCore;
using ship_management.Models;

namespace ship_management.DB
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Ship> ships { get; set; }
    }
}
