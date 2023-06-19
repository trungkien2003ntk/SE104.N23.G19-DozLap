using DozLapAPI.Entities;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.Text.Json;
using DozLapAPI.Controllers;
using AutoMapper;
using DozLapAPI.Helper;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DozLapDbConnection");
builder.Services.AddDbContext<DozLapDbContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddControllers();
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = new CustomNamingPolicy();
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    options.JsonSerializerOptions.WriteIndented = true;
    options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
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
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = builder.Build();

//Configure the HTTP request pipeline.
if (true)
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
