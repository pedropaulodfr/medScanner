using authentication_jwt.DTO;
using authentication_jwt.Models;
using authentication_jwt.Services;
using Microsoft.AspNetCore.Mvc;

namespace authentication_jwt.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly DashboardService _dashboardService;

        public DashboardController(DashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet]
        [Route("cartaoControle")]
        public async Task<ActionResult> CartaoControle()
        {
            var result = await _dashboardService.CartaoControle();  // Chama o método no serviço

            try
            {
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Erro ao obter dados: " + ex });
            }
        }
        
        [HttpGet]
        [Route("proximoRetorno")]
        public async Task<ActionResult> CardProximoAoRetorno()
        {
            var result = await _dashboardService.CardProximoRetorno();  // Chama o método no serviço

            try
            {
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Erro ao obter dados: " + ex });
            }
        }
        
        [HttpGet]
        [Route("quantidadeMedicamentos")]
        public async Task<ActionResult> CardQuantidadeMedicamentos()
        {
            var result = await _dashboardService.CardQuantidadeMedicamentos();  // Chama o método no serviço

            try
            {
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Erro ao obter dados: " + ex });
            }
        }
    }
}
