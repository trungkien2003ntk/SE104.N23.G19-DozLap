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
    public class ShipmentMethodsController : ControllerBase
    {
        private readonly DozLapDbContext _context;

        public ShipmentMethodsController(DozLapDbContext context)
        {
            _context = context;
        }

        // GET: api/ShipmentMethods
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShipmentMethod>>> GetShipmentMethods()
        {
            if (_context.ShipmentMethods == null)
            {
                return NotFound();
            }

            List<ShipmentMethod> shipmentMethods = await _context.ShipmentMethods.ToListAsync();

            return Ok(shipmentMethods);
        }

        // GET: api/ShipmentMethods/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ShipmentMethod>> GetShipmentMethod(long id)
        {
            if (_context.ShipmentMethods == null)
            {
                return NotFound();
            }
            var shipmentMethod = await _context.ShipmentMethods.FindAsync(id);

            if (shipmentMethod == null)
            {
                return NotFound();
            }

            return Ok(shipmentMethod);
        }

        //// PUT: api/ShipmentMethods/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutShipmentMethod(long id, ShipmentMethod shipmentMethod)
        //{
        //    if (id != shipmentMethod.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(shipmentMethod).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ShipmentMethodExists(id))
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

        //// POST: api/ShipmentMethods
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<ShipmentMethod>> PostShipmentMethod(ShipmentMethod shipmentMethod)
        //{
        //  if (_context.ShipmentMethods == null)
        //  {
        //      return Problem("Entity set 'DozLapDbContext.ShipmentMethods'  is null.");
        //  }
        //    _context.ShipmentMethods.Add(shipmentMethod);
        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (ShipmentMethodExists(shipmentMethod.Id))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return CreatedAtAction("GetShipmentMethod", new { id = shipmentMethod.Id }, shipmentMethod);
        //}

        //// DELETE: api/ShipmentMethods/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteShipmentMethod(long id)
        //{
        //    if (_context.ShipmentMethods == null)
        //    {
        //        return NotFound();
        //    }
        //    var shipmentMethod = await _context.ShipmentMethods.FindAsync(id);
        //    if (shipmentMethod == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.ShipmentMethods.Remove(shipmentMethod);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool ShipmentMethodExists(long id)
        //{
        //    return (_context.ShipmentMethods?.Any(e => e.Id == id)).GetValueOrDefault();
        //}
    }
}
