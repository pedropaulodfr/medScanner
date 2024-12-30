using authentication_jwt.DTO;
using authentication_jwt.Services;
using Microsoft.AspNetCore.Mvc;

namespace authentication_jwt.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UnidadesController : ControllerBase
    {
        private readonly UnidadesService _unidadesService;

        public UnidadesController(UnidadesService unidadesService)
        {
            _unidadesService = unidadesService;
        }

        [HttpGet]
        [Route("getAll")]
        public async Task<ActionResult> GetAll()
        {
            var result = await _unidadesService.GetAll();  // Chama o método no serviço

            try
            {
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Erro ao obter dados: " + ex });
            }
        }

        [HttpPost]
        [Route("insert")]
        public async Task<ActionResult> Insert([FromBody] UnidadeDTO model)
        {
            var result = await _unidadesService.Insert(model);  // Chama o método no serviço

            try
            {
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Erro ao salvar: " + ex });
            }
        }
        
        [HttpPut]
        [Route("update")]
        public async Task<ActionResult> Update([FromBody] UnidadeDTO model)
        {
            var result = await _unidadesService.Update(model);  // Chama o método no serviço

            try
            {
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Erro ao atualizar: " + ex });
            }
        }
        
        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<ActionResult> Delete(long id)
        {
            await _unidadesService.Delete(id);  // Chama o método no serviço
            try
            {
                return Ok(new { mensagem = "Unidade deletada com sucesso!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Erro ao deletar: " + ex });
            }
        }
    }
}
