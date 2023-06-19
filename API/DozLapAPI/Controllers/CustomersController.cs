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
    //[Route("api/[controller]")]
    //[ApiController]
    //public class CustomersController : ControllerBase
    //{
    //    private readonly DozLapDbContext _context;

    //    public CustomersController(DozLapDbContext context)
    //    {
    //        _context = context;
    //    }

    //    // GET: api/Customers
    //    [HttpGet]
    //    public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
    //    {
    //        if (_context.Customers == null)
    //        {
    //            return NotFound();
    //        }

    //        List<Customer> customers = await _context.Customers.ToListAsync();

    //        return Ok(customers);
    //    }

    //    // GET: api/Customers/5
    //    [HttpGet("{id}")]
    //    public async Task<ActionResult<Customer>> GetCustomer(long id)
    //    {
    //        if (_context.Customers == null)
    //        {
    //            return NotFound();
    //        }
    //        var customer = await _context.Customers.FindAsync(id);

    //        if (customer == null)
    //        {
    //            return NotFound();
    //        }

    //        return Ok(customer);
    //    }

    //    // PUT: api/Customers/5
    //    [HttpPut("{id}")]
    //    public async Task<IActionResult> UpdateCustomer(long id, CustomerDTO customerDto)
    //    {
    //        var customer = await _context.Customers.FindAsync(id);

    //        if (customer == null)
    //        {
    //            return NotFound();
    //        }

    //        // Update the properties of the existing customer
    //        customer.Username = customerDto.Username;
    //        customer.Password = customerDto.Password;
    //        customer.Email = customerDto.Email;
    //        customer.FirstName = customerDto.FirstName;
    //        customer.LastName = customerDto.LastName;
    //        customer.Gender = customerDto.Gender;
    //        customer.PhoneNumber = customerDto.PhoneNumber;
    //        customer.DateOfBirth = customerDto.DateOfBirth;
    //        customer.AddressId = customerDto.AddressId;

    //        await _context.SaveChangesAsync();

    //        return NoContent();
    //    }


    //    // POST: api/Customers
    //    [HttpPost]
    //    public async Task<ActionResult<Customer>> PostCustomer(CustomerDTO customerDto)
    //    {
    //        var customer = new Customer
    //        {
    //            Username = customerDto.Username,
    //            Password = customerDto.Password,
    //            Email = customerDto.Email,
    //            FirstName = customerDto.FirstName,
    //            LastName = customerDto.LastName,
    //            Gender = customerDto.Gender,
    //            PhoneNumber = customerDto.PhoneNumber,
    //            DateOfBirth = customerDto.DateOfBirth,
    //            AddressId = customerDto.AddressId,
    //        };

    //        _context.Customers.Add(customer);
    //        await _context.SaveChangesAsync();

    //        // You can map the saved entity back to DTO if needed
    //        var savedCustomerDto = new CustomerDTO
    //        {
    //            Id = customer.Id,
    //            Username = customer.Username,
    //            Password = customer.Password,
    //            Email = customer.Email,
    //            FirstName = customer.FirstName,
    //            LastName = customer.LastName,
    //            Gender = customer.Gender,
    //            PhoneNumber = customer.PhoneNumber,
    //            DateOfBirth = customer.DateOfBirth,
    //            AddressId = customer.AddressId,
    //        };

    //        return Ok(savedCustomerDto);

    //    }

    //    // DELETE: api/Customers/5
    //    [HttpDelete("{id}")]
    //    public async Task<IActionResult> DeleteCustomer(long id)
    //    {
    //        if (_context.Customers == null)
    //        {
    //            return NotFound();
    //        }
    //        var customer = _context.Customers.Where(c => c.Id == id).FirstOrDefault();
    //        if (customer == null)
    //        {
    //            return NotFound();
    //        }

    //        _context.Customers.Remove(customer);
    //        await _context.SaveChangesAsync();

    //        return NoContent();
    //    }

    //    //private bool CustomerExists(long id)
    //    //{
    //    //    return (_context.Customers?.Any(e => e.Id == id)).GetValueOrDefault();
    //    //}
    //}

    [ApiController]
    [Route("api/customer")]
    public class CustomersController : ControllerBase
    {
        private readonly DozLapDbContext _context;
        private readonly IMapper _mapper;

        public CustomersController(DozLapDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Customer
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerDTO>>> GetCustomers()
        {
            var customers = await _context.Customers.ToListAsync();
            var customerDTOs = _mapper.Map<List<CustomerDTO>>(customers);
            return Ok(customerDTOs);
        }

        // GET: api/Customer/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerDTO>> GetCustomer(long id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            var customerDTO = _mapper.Map<CustomerDTO>(customer);
            return Ok(customerDTO);
        }

        // POST: api/Customer
        [HttpPost]
        public async Task<ActionResult<CustomerDTO>> AddCustomer(CustomerDTO customerDTO)
        {
            var customer = _mapper.Map<Customer>(customerDTO);

            if (_context.Customers.Count() > 0)
            {
                long maxId = _context.Customers.Max(item => item.Id);
                customer.Id = maxId + 1;
            }
            else
            {
                customer.Id = 1;
            }

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            var resultDTO = _mapper.Map<CustomerDTO>(customer);
            return CreatedAtAction(nameof(GetCustomer), new { id = resultDTO.Id }, resultDTO);
        }

        // PUT: api/Customer/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCustomer(long id, CustomerDTO customerDTO)
        {

            var customer = _mapper.Map<Customer>(customerDTO);
            customer.AddressId = 1;
            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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

        // DELETE: api/Customer/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(long id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerExists(long id)
        {
            return _context.Customers.Any(e => e.Id == id);
        }
    }
}
