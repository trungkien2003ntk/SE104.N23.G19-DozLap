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
    [Route("api/orders")]
    public class OrdersController : ControllerBase
    {
        private readonly DozLapDbContext _context;
        private readonly IMapper _mapper;

        public OrdersController(DozLapDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> GetOrders()
        {
            var orders = await _context.Orders.ToListAsync();
            var orderDTOs = _mapper.Map<List<OrderDTO>>(orders);
            return Ok(orderDTOs);
        }

        // GET: api/Orders/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDTO>> GetOrder(long id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            var orderDTO = _mapper.Map<OrderDTO>(order);
            return Ok(orderDTO);
        }

        // POST: api/Orders
        [HttpPost]
        public async Task<ActionResult<OrderDTO>> AddOrder(OrderDTO orderDTO)
        {
            var order = _mapper.Map<Order>(orderDTO);

            if (_context.Orders.Count() > 0)
            {
                long maxId = _context.Orders.Max(item => item.Id);
                order.Id = maxId + 1;
            }
            else
            {
                order.Id = 1;
            }

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            var resultDTO = _mapper.Map<OrderDTO>(order);
            return CreatedAtAction(nameof(GetOrder), new { id = resultDTO.Id }, resultDTO);
        }

        // PUT: api/Orders/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(long id, OrderDTO orderDTO)
        {
            var order = _mapper.Map<Order>(orderDTO);
            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // DELETE: api/Orders/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(long id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(long id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}
