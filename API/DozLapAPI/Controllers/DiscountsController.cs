using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DozLapAPI.Entities;

namespace DozLapAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountsController : ControllerBase
    {
        private readonly DozLapDbContext _context;

        public DiscountsController(DozLapDbContext context)
        {
            _context = context;
        }

        // GET: api/Discounts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Discount>>> GetDiscounts()
        {
            if (_context.Discounts == null)
            {
                return NotFound();
            }

            List<Discount> discounts = await _context.Discounts.ToListAsync();

            return Ok(discounts);
        }

        // GET: api/Discounts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Discount>> GetDiscount(long id)
        {
            if (_context.Discounts == null)
            {
                return NotFound();
            }
            var discount = await _context.Discounts.FindAsync(id);

            if (discount == null)
            {
                return NotFound();
            }

            return Ok(discount);
        }

        //// PUT: api/Discounts/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutDiscount(long id, Discount discount)
        //{
        //    if (id != discount.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(discount).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!DiscountExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: api/Discounts
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<Discount>> PostDiscount(Discount discount)
        //{
        //  if (_context.Discounts == null)
        //  {
        //      return Problem("Entity set 'DozLapDbContext.Discounts'  is null.");
        //  }
        //    _context.Discounts.Add(discount);
        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (DiscountExists(discount.Id))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return CreatedAtAction("GetDiscount", new { id = discount.Id }, discount);
        //}

        //// DELETE: api/Discounts/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteDiscount(long id)
        //{
        //    if (_context.Discounts == null)
        //    {
        //        return NotFound();
        //    }
        //    var discount = await _context.Discounts.FindAsync(id);
        //    if (discount == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Discounts.Remove(discount);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool DiscountExists(long id)
        //{
        //    return (_context.Discounts?.Any(e => e.Id == id)).GetValueOrDefault();
        //}
    }
}
