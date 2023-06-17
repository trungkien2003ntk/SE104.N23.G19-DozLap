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
    public class ProductCategoriesController : ControllerBase
    {
        private readonly DozLapDbContext _context;

        public ProductCategoriesController(DozLapDbContext context)
        {
            _context = context;
        }

        // GET: api/ProductCategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductCategory>>> GetProductCategories()
        {
            if (_context.ProductCategories == null)
            {
                return NotFound();
            }

            List<ProductCategory> categories = await _context.ProductCategories.ToListAsync();

            return Ok(categories);
        }

        // GET: api/ProductCategories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductCategory>> GetProductCategory(long id)
        {
            if (_context.ProductCategories == null)
            {
                return NotFound();
            }
            var productCategory = await _context.ProductCategories.FindAsync(id);

            if (productCategory == null)
            {
                return NotFound();
            }

            return productCategory;
        }

        //// PUT: api/ProductCategories/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutProductCategory(long id, ProductCategory productCategory)
        //{
        //    if (id != productCategory.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(productCategory).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ProductCategoryExists(id))
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

        //// POST: api/ProductCategories
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<ProductCategory>> PostProductCategory(ProductCategory productCategory)
        //{
        //  if (_context.ProductCategories == null)
        //  {
        //      return Problem("Entity set 'DozLapDbContext.ProductCategories'  is null.");
        //  }
        //    _context.ProductCategories.Add(productCategory);
        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (ProductCategoryExists(productCategory.Id))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return CreatedAtAction("GetProductCategory", new { id = productCategory.Id }, productCategory);
        //}

        //// DELETE: api/ProductCategories/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteProductCategory(long id)
        //{
        //    if (_context.ProductCategories == null)
        //    {
        //        return NotFound();
        //    }
        //    var productCategory = await _context.ProductCategories.FindAsync(id);
        //    if (productCategory == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.ProductCategories.Remove(productCategory);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool ProductCategoryExists(long id)
        //{
        //    return (_context.ProductCategories?.Any(e => e.Id == id)).GetValueOrDefault();
        //}
    }
}
