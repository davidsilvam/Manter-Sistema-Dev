using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Manter_Sistema_Dev.Models;

namespace Manter_Sistema_Dev.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SistemasController : ControllerBase
    {
        private readonly ManterSistemaDbContext _context;

        public SistemasController(ManterSistemaDbContext context)
        {
            _context = context;
        }

        // GET: api/Sistemas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sistemas>>> GetSistemas()
        {
            return await _context.Sistemas.ToListAsync();
        }

        // GET: api/Sistemas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sistemas>> GetSistemas(int id)
        {
            var sistemas = await _context.Sistemas.FindAsync(id);

            if (sistemas == null)
            {
                return NotFound();
            }

            return sistemas;
        }

        // GET: api/Sistemas/5
        //[HttpGet("{descricao}/{sigla}")]
        [HttpGet("search")]
        public async Task<IEnumerable<Sistemas>> GetSistemas([FromQuery] string descricao = null, [FromQuery] string sigla = null, [FromQuery] string email = null)
        {
            //[FromQuery] string descricao = ""            
            var sistemas = await _context.Sistemas.Where(s => s.Descricao.Contains(descricao) || s.Sigla.Contains(sigla) || s.Email.Contains(email)).ToListAsync();
            return sistemas;
        }

        [HttpGet("page")]
        public SistemasViewModel GetSistemasPaged(int? page, [FromQuery] string descricao = null, [FromQuery] string sigla = null, [FromQuery] string email = null)
        {

            var result = _context.Sistemas.Where(s => s.Descricao.Contains(descricao) || s.Sigla.Contains(sigla) || s.Email.Contains(email));
            var a = result.Count();
            //var dummyItems = Enumerable.Range(1, 150).Select(x => "Item " + x);
            //var pager = new Pager(result.Count(), page.Value, 4, 2);
            var pager = new Pager(_context.Sistemas.Count(), page.Value, 4, 2);
            //var pager = new Pager(dummyItems.Count(), page);

            var viewModel = new SistemasViewModel
            {
                //Items = dummyItems.Skip((pager.CurrentPage - 1) * pager.PageSize).Take(pager.PageSize),
                Sistemas = _context.Sistemas.Skip((pager.CurrentPage - 1) * pager.PageSize).Take(pager.PageSize),
                Pager = pager
            };

            return viewModel;
        }

        //[HttpGet("page")]
        //public SistemasViewModel GetSistemasPaged(int pageNo)
        //{
        //    int qtd = 5;
        //    int skipPage = (pageNo - 1) * qtd;
        //    SistemasViewModel objEmp = new SistemasViewModel();
        //    try
        //    {
        //        //TestDBEntities objEntity = new TestDBEntities();
        //        int totalCount = _context.Sistemas.Count();
        //        var result = _context.Sistemas.OrderBy(a => a.SistemaId).Skip(skipPage).Take(qtd).ToList();
        //        objEmp.TotalCount = totalCount;
        //        objEmp.sistemas = result;
        //        return objEmp;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        // PUT: api/Sistemas/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSistemas(int id, Sistemas sistemas)
        {
            if (id != sistemas.SistemaId)
            {
                return BadRequest();
            }

            _context.Entry(sistemas).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SistemasExists(id))
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

        // POST: api/Sistemas
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Sistemas>> PostSistemas(Sistemas sistemas)
        {
            _context.Sistemas.Add(sistemas);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSistemas", new { id = sistemas.SistemaId }, sistemas);
        }

        // DELETE: api/Sistemas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Sistemas>> DeleteSistemas(int id)
        {
            var sistemas = await _context.Sistemas.FindAsync(id);
            if (sistemas == null)
            {
                return NotFound();
            }

            _context.Sistemas.Remove(sistemas);
            await _context.SaveChangesAsync();

            return sistemas;
        }

        private bool SistemasExists(int id)
        {
            return _context.Sistemas.Any(e => e.SistemaId == id);
        }
    }
}
