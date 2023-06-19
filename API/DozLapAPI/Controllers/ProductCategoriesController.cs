using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DozLapAPI.Entities;
using AutoMapper;
using DozLapAPI.Models;

namespace DozLapAPI.Controllers
{
    [ApiController]
    [Route("api/product_category")]
    public class ProductCategoriesController : ControllerBase
    {
        private readonly DozLapDbContext _context;
        private readonly IMapper _mapper;

        public ProductCategoriesController(DozLapDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/product_category
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductCategoryDTO>>> GetProductCategories()
        {
            var productCategories = await _context.ProductCategories.ToListAsync();
            var productCategoryDTOs = _mapper.Map<List<ProductCategoryDTO>>(productCategories);
            return Ok(productCategoryDTOs);
        }

        // GET: api/product_category/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductCategoryDTO>> GetProductCategory(long id)
        {
            var productCategory = await _context.ProductCategories.FindAsync(id);

            if (productCategory == null)
            {
                return NotFound();
            }

            var productCategoryDTO = _mapper.Map<ProductCategoryDTO>(productCategory);
            return Ok(productCategoryDTO);
        }

        // POST: api/product_category
        [HttpPost]
        public async Task<ActionResult<ProductCategoryDTO>> AddProductCategory(ProductCategoryDTO productCategoryDTO)
        {
            var productCategory = _mapper.Map<ProductCategory>(productCategoryDTO);

            long maxId = _context.ProductCategories.Max(item => item.Id);
            productCategory.Id = maxId + 1;

            _context.ProductCategories.Add(productCategory);
            await _context.SaveChangesAsync();

            var resultDTO = _mapper.Map<ProductCategoryDTO>(productCategory);
            return CreatedAtAction(nameof(GetProductCategory), new { id = resultDTO.Id }, resultDTO);
        }

        // PUT: api/product_category/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProductCategory(long id, ProductCategoryDTO productCategoryDTO)
        {
           

            var productCategory = _mapper.Map<ProductCategory>(productCategoryDTO);
            _context.Entry(productCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductCategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/ProductCategories/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductCategory(long id)
        {
            var productCategory = await _context.ProductCategories.FindAsync(id);

            if (productCategory == null)
            {
                return NotFound();
            }

            _context.ProductCategories.Remove(productCategory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductCategoryExists(long id)
        {
            return _context.ProductCategories.Any(e => e.Id == id);
        }
    }
}
