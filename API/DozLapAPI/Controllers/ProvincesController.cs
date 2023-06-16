﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DozLapAPI.Models;

namespace DozLapAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProvincesController : ControllerBase
    {
        private readonly DozLapDbContext _context;

        public ProvincesController(DozLapDbContext context)
        {
            _context = context;
        }

        // GET: api/Provinces
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Province>>> GetProvinces()
        {
            if (_context.Provinces == null)
            {
                return NotFound();
            }

            List<Province> provinces = await _context.Provinces.ToListAsync();

            return Ok(provinces);
        }

        // GET: api/Provinces/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Province>> GetProvince(long id)
        {
            if (_context.Provinces == null)
            {
                return NotFound();
            }
            var province = await _context.Provinces.FindAsync(id);

            if (province == null)
            {
                return NotFound();
            }

            return Ok(province);
        }

        //// PUT: api/Provinces/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutProvince(long id, Province province)
        //{
        //    if (id != province.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(province).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ProvinceExists(id))
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

        //// POST: api/Provinces
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<Province>> PostProvince(Province province)
        //{
        //  if (_context.Provinces == null)
        //  {
        //      return Problem("Entity set 'DozLapDbContext.Provinces'  is null.");
        //  }
        //    _context.Provinces.Add(province);
        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (ProvinceExists(province.Id))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return CreatedAtAction("GetProvince", new { id = province.Id }, province);
        //}

        //// DELETE: api/Provinces/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteProvince(long id)
        //{
        //    if (_context.Provinces == null)
        //    {
        //        return NotFound();
        //    }
        //    var province = await _context.Provinces.FindAsync(id);
        //    if (province == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Provinces.Remove(province);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool ProvinceExists(long id)
        //{
        //    return (_context.Provinces?.Any(e => e.Id == id)).GetValueOrDefault();
        //}
    }
}
