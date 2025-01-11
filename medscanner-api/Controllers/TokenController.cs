using authentication_jwt.DTO;
using authentication_jwt.Models;
using authentication_jwt.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Core;
using Microsoft.EntityFrameworkCore;

namespace authentication_jwt.Controllers
{
    public class AuthController : ControllerBase
    {

        private readonly AppDbContext _dbContext;

        public AuthController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<dynamic>> Authenticate([FromBody] Usuario model)
        {
            try
            {
                // Recupera o usuário
                var user = await _dbContext.Usuarios.Where(x => x.Email == model.Email && x.Senha == model.Senha).FirstOrDefaultAsync();
                // Verifica se o usuário existe
                if (user == null)
                    return NotFound(new { message = "Usuário ou senha inválidos" });

                // Gera o Token
                var token = TokenService.GenerateToken(user);

                // Oculta a senha
                user.Senha = "";
                user.Email = model.Email;

                // Retorna os dados encapsulados em um ActionResult
                UsuarioAutenticadoDTO usuarioAutenticado = new UsuarioAutenticadoDTO
                {
                    Usuario_Id = user.Id,
                    Nome = user.Nome,
                    Email = user.Email,
                    Perfil = user.Perfil,
                    Token = token
                };
                
                return Ok(usuarioAutenticado);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpPost("validate")]
        public async Task<ActionResult<User>> ValidarToken([FromBody] User model)
        {
            // Lógica para validar o token JWT
            User user = TokenService.ValidarTokenJWT(model.Token);

            if (user != null)
            {
                return Ok(user);
            }
            else
            {
                return BadRequest(new { mensagem = "Token inválido" });
            }
        }

    }
}