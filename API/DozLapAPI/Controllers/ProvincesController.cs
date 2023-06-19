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
    [Route("api/province")]
    public class ProvincesController : ControllerBase
    {
        private readonly DozLapDbContext _context;
        private readonly IMapper _mapper;

        public ProvincesController(DozLapDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Provinces
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProvinceDTO>>> GetProvinces()
        {
            var provinces = await _context.Provinces.ToListAsync();
            var provinceDTOs = _mapper.Map<List<ProvinceDTO>>(provinces);
            return Ok(provinceDTOs);
        }

        // GET: api/Provinces/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ProvinceDTO>> GetProvince(long id)
        {
            var province = await _context.Provinces.FindAsync(id);

            if (province == null)
            {
                return NotFound();
            }

            var provinceDTO = _mapper.Map<ProvinceDTO>(province);
            return Ok(provinceDTO);
        }
    }
}
