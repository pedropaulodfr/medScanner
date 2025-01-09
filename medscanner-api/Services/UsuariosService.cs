using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using authentication_jwt.DTO;
using authentication_jwt.Models;
using Microsoft.EntityFrameworkCore;

namespace authentication_jwt.Services
{
    public class UsuariosService
    {
        private readonly AppDbContext _dbContext;

        // Construtor para injetar o AppDbContext
        public UsuariosService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // Método para retornar todos os tipos de medicamentos
        public async Task<List<UsuarioDTO>> GetAll()
        {
            List<Usuario> usuarios = await _dbContext.Usuarios.AsNoTracking().ToListAsync();

            var retorno = usuarios.Select(x => new UsuarioDTO
            {
                Id = x.Id,
                Perfil = x.Perfil,
                Nome = x.Nome,
                Email = x.Email,
                ImagemPerfil = x.ImagemPerfil,
                CodigoCadastro = x.CodigoCadastro,
                Ativo = x.Ativo ? "Ativo" : "Inativo"
            }).ToList();

            return retorno;
        }
        public async Task<UsuarioDTO> Insert(UsuarioDTO model)
        {
            try
            {
                var existUsuario = await _dbContext.Usuarios.Where(x => x.Email == model.Email).FirstOrDefaultAsync();
                if(existUsuario != null)
                    throw new ArgumentException("Já existe um usuário cadastrado com esse e-mail!");

                Usuario usuario = new Usuario()
                {
                    Perfil = model.Perfil,
                    Nome = model.Nome,
                    Email = model.Email.Trim(),
                    ImagemPerfil = model.ImagemPerfil,
                    CodigoCadastro = model.CodigoCadastro,
                    Ativo = model.Ativo == "Ativo" ? true : false,
                    Senha = GerarSenhaAleatoria()
                };

                await _dbContext.AddAsync(usuario);
                await _dbContext.SaveChangesAsync();

                return model;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message ?? ex.InnerException.ToString());
            }
        }
        public async Task<UsuarioDTO> Update(UsuarioDTO model)
        {
            try
            {
                var existUsuario = await _dbContext.Usuarios.Where(u => u.Id == model.Id).FirstOrDefaultAsync();
                if (existUsuario == null)
                    throw new ArgumentException("Erro ao atualizar, o usuário não existe!");

                var existUsuarioEmail = await _dbContext.Usuarios.Where(x => x.Email == model.Email.Trim() && x.Id != model.Id).FirstOrDefaultAsync();
                if (existUsuarioEmail != null)
                    throw new ArgumentException("Já existe um usuário cadastrado com esse e-mail!");

                existUsuario.Perfil = model.Perfil;
                existUsuario.Email = model.Email.Trim();
                existUsuario.ImagemPerfil = model.ImagemPerfil;
                existUsuario.CodigoCadastro = model.CodigoCadastro;
                existUsuario.Ativo = model.Ativo == "Ativo" ? true : false;
                
                await _dbContext.SaveChangesAsync();

                return model;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message ?? ex.InnerException.ToString());
            }
        }
        public async Task Delete(long id)
        {
            try
            {
                var usuario = await _dbContext.Usuarios.Where(u => u.Id == id).FirstOrDefaultAsync();
                if (usuario == null)
                    throw new Exception("O usuário não existe!");

                _dbContext.Remove(usuario);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message ?? ex.InnerException.ToString());
            }
        }
        private string GerarSenhaAleatoria()
        {
            const string caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(caracteres, 8)
                                        .Select(s => s[random.Next(s.Length)]).ToArray());
        }

    }
}