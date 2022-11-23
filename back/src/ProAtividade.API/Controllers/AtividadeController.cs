using Microsoft.AspNetCore.Mvc;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Services;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        private readonly IAtividadeService atividadeService;

        public AtividadeController(IAtividadeService atividadeService)
        {
            this.atividadeService = atividadeService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var atividades = await atividadeService.PegarTodasAtividadesAsync();

                if (atividades == null)
                    return NoContent();

                return Ok(atividades);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar atividades. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var atividade = await atividadeService.PegarAtividadePorIdAsync(id);

                if (atividade == null)
                    return NoContent();

                return Ok(atividade);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar atividade id: {id}. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Atividade model)
        {
            try
            {
                var atividade = await atividadeService.AdicionarAtividade(model);

                if (atividade == null)
                    return NoContent();

                return Ok(atividade);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar atividade {model.Titulo}. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Atividade model)
        {
            try
            {
                if (id != model.Id)
                    return this.StatusCode(StatusCodes.Status409Conflict,
                        $"Você está tentando atualizar a atividade errada.");

                var atividade = await atividadeService.AtualizarAtividade(model);

                if (atividade == null)
                    return NoContent();

                return Ok(atividade);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar atividade id: {model.Id}. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var atividade = await atividadeService.PegarAtividadePorIdAsync(id);

                if (atividade == null)
                    return this.StatusCode(StatusCodes.Status409Conflict,
                        $"Você está tentando deletar uma atividade que não existe.");

                if (await atividadeService.DeletarAtividade(id))
                    return Ok(new { message = "Deletado." });

                return BadRequest("Ocorreu um problema não específico ao tentar deletar a atividade.");
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar atividade id: {id}. Erro: {ex.Message}");
            }
        }
    }
}