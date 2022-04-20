using System.Collections.Immutable;
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
        public DbSet<User> users { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Ship>()
                .HasIndex(s => s.name)
                .IsUnique();
            builder.Entity<Ship>()
                .HasIndex(s => s.code)
                .IsUnique();
        }
    }
}
