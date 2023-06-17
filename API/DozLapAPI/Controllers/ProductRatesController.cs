using DozLapAPI.Models;
using DozLapAPI.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DozLapAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductRatesController : ControllerBase
    {

        private DozLapDbContext _context;

        public ProductRatesController(DozLapDbContext dozLapDbContext)
        {
            _context = dozLapDbContext;
        }

        // GET: api/ProductRates
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductRateDTO>>> GetProductRates()
        {
            if (_context.OrderItems == null)
            {
                return NotFound();
            }

            var productRates = await _context.OrderItems
                .GroupBy(oi => oi.ProductId)
                .Select(g => new ProductRateDTO
                {
                    ProductId = (long)g.Key,
                    Rate = (short)g.Average(oi => oi.Rate)
                }).ToListAsync();

            return Ok(productRates);
        }

        // GET: api/ProductRates/5
        [HttpGet("{id}")]
        public ActionResult<ProductRateDTO> GetProductRate(long id)
        {
            if (_context.OrderItems == null)
            {
                return NotFound();
            }

            var productRate = _context.OrderItems
                .Where(oi => oi.ProductId == id)
                .GroupBy(oi => oi.ProductId)
                .Select(g => new ProductRateDTO
                {
                    ProductId = (long)g.Key,
                    Rate = (short)g.Average(oi => oi.Rate)
                });

            return Ok(productRate);
        }
    }
}
