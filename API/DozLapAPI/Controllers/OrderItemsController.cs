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
    [Route("api/order_item")]
    public class OrderItemsController : ControllerBase
    {
        private readonly DozLapDbContext _context;
        private readonly IMapper _mapper;

        public OrderItemsController(DozLapDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/OrderItem
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderItemDTO>>> GetOrderItems()
        {
            var orderItems = await _context.OrderItems.ToListAsync();
            var orderItemDTOs = _mapper.Map<List<OrderItemDTO>>(orderItems);
            return Ok(orderItemDTOs);
        }

        // GET: api/OrderItem/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderItemDTO>> GetOrderItem(long id)
        {
            var orderItem = await _context.OrderItems.FindAsync(id);

            if (orderItem == null)
            {
                return NotFound();
            }

            var orderItemDTO = _mapper.Map<OrderItemDTO>(orderItem);
            return Ok(orderItemDTO);
        }

        // POST: api/OrderItem
        [HttpPost]
        public async Task<ActionResult<OrderItemDTO>> AddOrderItem(OrderItemDTO orderItemDTO)
        {
            var orderItem = _mapper.Map<OrderItem>(orderItemDTO);

            if (_context.OrderItems.Count() > 0)
            {
                long maxId = _context.OrderItems.Max(item => item.Id);
                orderItem.Id = maxId + 1;
            }
            else
            {
                orderItem.Id = 1;
            }

            _context.OrderItems.Add(orderItem);
            await _context.SaveChangesAsync();

            var resultDTO = _mapper.Map<OrderItemDTO>(orderItem);
            return CreatedAtAction(nameof(GetOrderItem), new { id = resultDTO.Id }, resultDTO);
        }

        // PUT: api/OrderItem/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrderItem(long id, OrderItemDTO orderItemDTO)
        {
            if (id != orderItemDTO.Id)
            {
                return BadRequest();
            }

            var orderItem = _mapper.Map<OrderItem>(orderItemDTO);
            _context.Entry(orderItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderItemExists(id))
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

        // DELETE: api/OrderItem/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderItem(long id)
        {
            var orderItem = await _context.OrderItems.FindAsync(id);

            if (orderItem == null)
            {
                return NotFound();
            }

            _context.OrderItems.Remove(orderItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderItemExists(long id)
        {
            return _context.OrderItems.Any(e => e.Id == id);
        }
    }
}
