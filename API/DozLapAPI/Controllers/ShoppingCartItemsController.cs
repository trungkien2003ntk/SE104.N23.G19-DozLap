using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DozLapAPI.Entities;

namespace DozLapAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingCartItemsController : ControllerBase
    {
        private readonly DozLapDbContext _context;

        public ShoppingCartItemsController(DozLapDbContext context)
        {
            _context = context;
        }

        // GET: api/ShoppingCartItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShoppingCartItem>>> GetShoppingCartItems()
        {
            if (_context.ShoppingCartItems == null)
            {
                return NotFound();
            }

            List<ShoppingCartItem> shoppingCartItems = await _context.ShoppingCartItems.ToListAsync();

            return Ok(shoppingCartItems);
        }


        // GET: api/ShoppingCartItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ShoppingCartItem>> GetShoppingCartItem(long id)
        {
            if (_context.ShoppingCartItems == null)
            {
                return NotFound();
            }
            var shoppingCartItem = await _context.ShoppingCartItems.FindAsync(id);

            if (shoppingCartItem == null)
            {
                return NotFound();
            }

            return Ok(shoppingCartItem);
        }

        //// PUT: api/ShoppingCartItems/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutShoppingCartItem(long id, ShoppingCartItem shoppingCartItem)
        //{
        //    if (id != shoppingCartItem.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(shoppingCartItem).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ShoppingCartItemExists(id))
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

        //// POST: api/ShoppingCartItems
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<ShoppingCartItem>> PostShoppingCartItem(ShoppingCartItem shoppingCartItem)
        //{
        //  if (_context.ShoppingCartItems == null)
        //  {
        //      return Problem("Entity set 'DozLapDbContext.ShoppingCartItems'  is null.");
        //  }
        //    _context.ShoppingCartItems.Add(shoppingCartItem);
        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (ShoppingCartItemExists(shoppingCartItem.Id))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return CreatedAtAction("GetShoppingCartItem", new { id = shoppingCartItem.Id }, shoppingCartItem);
        //}

        //// DELETE: api/ShoppingCartItems/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteShoppingCartItem(long id)
        //{
        //    if (_context.ShoppingCartItems == null)
        //    {
        //        return NotFound();
        //    }
        //    var shoppingCartItem = await _context.ShoppingCartItems.FindAsync(id);
        //    if (shoppingCartItem == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.ShoppingCartItems.Remove(shoppingCartItem);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool ShoppingCartItemExists(long id)
        //{
        //    return (_context.ShoppingCartItems?.Any(e => e.Id == id)).GetValueOrDefault();
        //}
    }
}
