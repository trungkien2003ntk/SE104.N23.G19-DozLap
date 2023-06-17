using AutoMapper;
using DozLapAPI.Entities;
using DozLapAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DozLapAPI.Controllers
{
    [ApiController]
    [Route("api/address")]
    public class AddressesController : ControllerBase
    {
        private readonly DozLapDbContext _dbContext;
        private readonly IMapper _mapper;

        public AddressesController(DozLapDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        // GET api/addresses
        [HttpGet]
        public ActionResult<IEnumerable<AddressDTO>> GetAddresses()
        {
            var addresses = _dbContext.Addresses.ToList();

            var addressDTOs = _mapper.Map<List<AddressDTO>>(addresses);

            return Ok(addressDTOs);
        }

        // GET api/addresses/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<AddressDTO>> GetAddressById(long id)
        {
            var address = await _dbContext.Addresses.FindAsync(id);

            if (address == null)
            {
                return NotFound();
            }

            var addressDTO = _mapper.Map<AddressDTO>(address);

            return Ok(addressDTO);
        }

        // POST api/addresses
        [HttpPost]
        public async Task<ActionResult<AddressDTO>> CreateAddress(AddressDTO addressDTO)
        {
            var address = _mapper.Map<Address>(addressDTO);


            if (_dbContext.Addresses.Count() > 0)
            {
                long maxId = _dbContext.Addresses.Max(item => item.Id);
                address.Id = maxId + 1;
            }
            else
            {
                address.Id = 1;
            }

            _dbContext.Addresses.Add(address);
            await _dbContext.SaveChangesAsync();

            var createdAddressDTO = _mapper.Map<AddressDTO>(address);

            return CreatedAtAction(nameof(GetAddressById), new { id = createdAddressDTO.Id }, createdAddressDTO);
        }

        // PUT api/addresses/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAddress(long id, AddressDTO addressDTO)
        {

            var address = await _dbContext.Addresses.FindAsync(id);

            if (address == null)
            {
                return NotFound();
            }

            _mapper.Map(addressDTO, address);

            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/addresses/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAddress(long id)
        {
            var address = await _dbContext.Addresses.FindAsync(id);

            if (address == null)
            {
                return NotFound();
            }

            _dbContext.Addresses.Remove(address);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}

