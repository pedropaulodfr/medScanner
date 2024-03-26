using authentication_jwt.Context;
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
        public async Task<ActionResult<dynamic>> Authenticate([FromBody] User model)
        {
            // Recupera o usuário
            var user = await _dbContext.Users.Where(x => x.Email == model.Email && x.Password == model.Password).FirstOrDefaultAsync();
            // Verifica se o usuário existe
            if (user == null)
                return BadRequest(new { message = "Usuário ou senha inválidos" });

            // Gera o Token
            var token = TokenService.GenerateToken(user);

            // Oculta a senha
            user.Password = "";
            user.Email = model.Email;

            // Retorna os dados encapsulados em um ActionResult
            return Ok(new { user, token });
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