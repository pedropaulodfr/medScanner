using authentication_jwt.DTO;
using authentication_jwt.Services;
using Microsoft.AspNetCore.Mvc;

namespace authentication_jwt.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReceituarioController : ControllerBase
    {
        private readonly ReceituarioService _receituarioService;

        public ReceituarioController(ReceituarioService receituarioService)
        {
            _receituarioService = receituarioService;
        }

        [HttpGet]
        [Route("getAll")]
        public async Task<ActionResult> GetAll()
        {
            var result = await _receituarioService.GetAll();  // Chama o método no serviço

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
        public async Task<ActionResult> Insert([FromBody] ReceituarioDTO model)
        {
            var result = await _receituarioService.Insert(model);  // Chama o método no serviço

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
        public async Task<ActionResult> Update([FromBody] ReceituarioDTO model)
        {
            var result = await _receituarioService.Update(model);  // Chama o método no serviço

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
            await _receituarioService.Delete(id);  // Chama o método no serviço
            try
            {
                return Ok(new { mensagem = "Receituário deletado com sucesso!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Erro ao deletar: " + ex });
            }
        }
    }
}
