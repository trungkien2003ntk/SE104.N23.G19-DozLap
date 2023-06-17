using DozLapAPI.Entities;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.Text.Json;
using DozLapAPI.Controllers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DozLapDbConnection");
builder.Services.AddDbContext<DozLapDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddControllers();
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = null;
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    options.JsonSerializerOptions.WriteIndented = true;
    options.JsonSerializerOptions.PropertyNameCaseInsensitive = false;
    options.JsonSerializerOptions.DictionaryKeyPolicy = null;
    options.JsonSerializerOptions.IgnoreReadOnlyProperties = false;
    options.JsonSerializerOptions.MaxDepth = 0;
    options.JsonSerializerOptions.AllowTrailingCommas = false;
    options.JsonSerializerOptions.ReadCommentHandling = JsonCommentHandling.Disallow;
    options.JsonSerializerOptions.Encoder = null;
    options.JsonSerializerOptions.ReferenceHandler = null;
    options.JsonSerializerOptions.IncludeFields = true;
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        b => 
            b.AllowAnyMethod()
             .AllowAnyHeader()
             .AllowAnyOrigin()
        );
});

var app = builder.Build();

//Configure the HTTP request pipeline.
if (true)
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
