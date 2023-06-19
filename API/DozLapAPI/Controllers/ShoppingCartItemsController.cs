using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DozLapAPI.Entities;
using DozLapAPI.Models;
using AutoMapper;

namespace DozLapAPI.Controllers
{
    [Route("api/shopping_cart_item")]
    [ApiController]
    public class ShoppingCartItemsController : ControllerBase
    {
        private readonly DozLapDbContext _context;
        private readonly IMapper _mapper;

        public ShoppingCartItemsController(DozLapDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/ShoppingCartItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShoppingCartItemDTO>>> GetShoppingCartItems()
        {
            if (_context.ShoppingCartItems == null)
            {
                return NotFound();
            }

            var shoppingCartItems = await _context.ShoppingCartItems.ToListAsync();
            var shoppingCartItemDTOs = _mapper.Map<List<ShoppingCartItemDTO>>(shoppingCartItems);
            return Ok(shoppingCartItemDTOs);
            
        }


        // GET: api/ShoppingCartItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ShoppingCartItemDTO>> GetShoppingCartItem(long id)
        {
            var shoppingCartItem = await _context.ShoppingCartItems.FindAsync(id);

            if (shoppingCartItem == null)
            {
                return NotFound();
            }

            var shoppingCartItemDTO = _mapper.Map<ShoppingCartItemDTO>(shoppingCartItem);
            return Ok(shoppingCartItemDTO);
        }

        // PUT: api/ShoppingCartItems/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateShoppingCartItem(long id, ShoppingCartItemDTO shoppingCartItemDTO)
        {
            var shoppingCartItem = _mapper.Map<ShoppingCartItem>(shoppingCartItemDTO);
            _context.Entry(shoppingCartItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShoppingCartItemExists(id))
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

        // POST: api/ShoppingCartItems
        [HttpPost]
        public async Task<ActionResult<ShoppingCartItemDTO>> AddShoppingCartItem(ShoppingCartItemDTO shoppingCartItemDTO)
        {
            var shoppingCartItem = _mapper.Map<ShoppingCartItem>(shoppingCartItemDTO);

            if (_context.ShoppingCartItems.Count() > 0)
            {
                long maxId = _context.ShoppingCartItems.Max(item => item.Id);
                shoppingCartItem.Id = maxId + 1;
            }
            else
            {
                shoppingCartItem.Id = 1;
            }
            

            _context.ShoppingCartItems.Add(shoppingCartItem);
            await _context.SaveChangesAsync();

            var resultDTO = _mapper.Map<ShoppingCartItemDTO>(shoppingCartItem);



            return CreatedAtAction(nameof(GetShoppingCartItem), new { id = resultDTO.Id }, resultDTO);
        }

        //    return CreatedAtAction("GetShoppingCartItem", new { id = shoppingCartItem.Id }, shoppingCartItem);
        //}

        // DELETE: api/ShoppingCartItems/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShoppingCartItem(long id)
        {
            var shoppingCartItem = await _context.ShoppingCartItems.FindAsync(id);

            if (shoppingCartItem == null)
            {
                return NotFound();
            }

            _context.ShoppingCartItems.Remove(shoppingCartItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ShoppingCartItemExists(long id)
        {
            return (_context.ShoppingCartItems?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
