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
    [Route("api/product")]
    public class ProductsController : ControllerBase
    {
        private readonly DozLapDbContext _context;
        private readonly IMapper _mapper;

        public ProductsController(DozLapDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            var productDTOs = _mapper.Map<List<ProductDTO>>(products);
            return Ok(productDTOs);
        }

        // GET: api/Products/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDTO>> GetProduct(long id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            var productDTO = _mapper.Map<ProductDTO>(product);
            return Ok(productDTO);
        }

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<ProductDTO>> AddProduct(ProductDTO productDTO)
        {
            var product = _mapper.Map<Product>(productDTO);

            if (_context.Products.Count() > 0)
            {
                long maxId = _context.Products.Max(item => item.Id);
                product.Id = maxId + 1;
            }
            else
            {
                product.Id = 1;
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            var resultDTO = _mapper.Map<ProductDTO>(product);
            return CreatedAtAction(nameof(GetProduct), new { id = resultDTO.Id }, resultDTO);
        }

        // PUT: api/Products/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(long id, ProductDTO productDTO)
        {
            var product = _mapper.Map<Product>(productDTO);
            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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

        // DELETE: api/Products/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(long id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(long id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}
