using Microsoft.EntityFrameworkCore;
using ship_management.DB;
using ship_management.Interfaces;
using ship_management.Repositories;
using ship_management.Services;

var builder = WebApplication.CreateBuilder(args);

// Cors policy name
var  AllowedSpecificOrigins = "_shipAllowPolicy";

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: AllowedSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
        });
});


// Register Db context
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data source=ship.db")); //.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking));

// Register Ship Repository
builder.Services.AddScoped<IShipRepository, ShipRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IJwtService,JwtService>();

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(AllowedSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
