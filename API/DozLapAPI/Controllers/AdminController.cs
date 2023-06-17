using DozLapAPI.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DozLapAPI.Controllers
{
    [ApiController]
    [Route("api/admin")]
    public class AdminsController : ControllerBase
    {
        private readonly DozLapDbContext _dbContext;

        public AdminsController(DozLapDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET api/admins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Admin>>> Get()
        {
            // Assuming you have an "Admins" DbSet in your DbContext
            var adminList = await _dbContext.Admins.ToListAsync();

            if (adminList == null || adminList.Count == 0)
            {
                return NotFound();
            }

            return Ok(adminList);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Admin>> GetAdminById(long id)
        {
            var admin = await _dbContext.Admins.FirstOrDefaultAsync(a => a.Id == id);

            if (admin == null)
            {
                return NotFound();
            }

            return Ok(admin);
        }
     }

}
