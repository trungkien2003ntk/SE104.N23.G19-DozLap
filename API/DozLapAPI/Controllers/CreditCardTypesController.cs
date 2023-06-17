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
    public class CreditCardTypesController : ControllerBase
    {
        private readonly DozLapDbContext _context;

        public CreditCardTypesController(DozLapDbContext context)
        {
            _context = context;
        }

        // GET: api/CreditCardTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CreditCardType>>> GetCreditCardTypes()
        {
            if (_context.CreditCardTypes == null)
            {
                return NotFound();
            }

            List<CreditCardType> creditCardTypes = await _context.CreditCardTypes.ToListAsync();

            return Ok(creditCardTypes);
        }

        // GET: api/CreditCardTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CreditCardType>> GetCreditCardType(long id)
        {
            if (_context.CreditCardTypes == null)
            {
                return NotFound();
            }
            var creditCardType = await _context.CreditCardTypes.FindAsync(id);

            if (creditCardType == null)
            {
                return NotFound();
            }

            return Ok(creditCardType);
        }

        //// PUT: api/CreditCardTypes/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutCreditCardType(long id, CreditCardType creditCardType)
        //{
        //    if (id != creditCardType.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(creditCardType).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!CreditCardTypeExists(id))
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

        //// POST: api/CreditCardTypes
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<CreditCardType>> PostCreditCardType(CreditCardType creditCardType)
        //{
        //  if (_context.CreditCardTypes == null)
        //  {
        //      return Problem("Entity set 'DozLapDbContext.CreditCardTypes'  is null.");
        //  }
        //    _context.CreditCardTypes.Add(creditCardType);
        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (CreditCardTypeExists(creditCardType.Id))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return CreatedAtAction("GetCreditCardType", new { id = creditCardType.Id }, creditCardType);
    }

    //// DELETE: api/CreditCardTypes/5
    //[HttpDelete("{id}")]
    //public async Task<IActionResult> DeleteCreditCardType(long id)
    //{
    //    if (_context.CreditCardTypes == null)
    //    {
    //        return NotFound();
    //    }
    //    var creditCardType = await _context.CreditCardTypes.FindAsync(id);
    //    if (creditCardType == null)
    //    {
    //        return NotFound();
    //    }

    //    _context.CreditCardTypes.Remove(creditCardType);
    //    await _context.SaveChangesAsync();

    //    return NoContent();
    //}

    //private bool CreditCardTypeExists(long id)
    //{
    //    return (_context.CreditCardTypes?.Any(e => e.Id == id)).GetValueOrDefault();
    //}
}

