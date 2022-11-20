using Microsoft.AspNetCore.Mvc;
using ProAtividade.API.Models;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        public IEnumerable<Atividade> Atividades { get; set; } = new List<Atividade>
            {
                new Atividade(1),
                new Atividade(2),
                new Atividade(3)
            };

        [HttpGet]
        public IEnumerable<Atividade> Get()
        {
            return Atividades;
        }

        [HttpGet("{id}")]
        public Atividade Get(int id)
        {
            return Atividades.FirstOrDefault(a => a.Id == id);
        }

        [HttpPost]
        public IEnumerable<Atividade> Post(Atividade atividade)
        {
            return Atividades.Append<Atividade>(atividade); ;
        }

        [HttpPut("{id}")]
        public Atividade Put(int id, Atividade atividade)
        {
            atividade.Id++;
            return atividade;
        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            return $"Meu primeiro método delete com parametro = {id}";
        }
    }
}