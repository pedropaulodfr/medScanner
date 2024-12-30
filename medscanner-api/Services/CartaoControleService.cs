using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using authentication_jwt.DTO;
using authentication_jwt.Models;
using Microsoft.EntityFrameworkCore;

namespace authentication_jwt.Services
{
    public class CartaoControleService
    {
        private readonly AppDbContext _dbContext;

        // Construtor para injetar o AppDbContext
        public CartaoControleService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<CartaoControleDTO>> GetAll()
        {
            var cartaoControle = await _dbContext.CartaoControles
                                        .Include(x => x.Medicamento)
                                        .ThenInclude(y => y.Unidade)
                                        .Include(x => x.Medicamento)
                                        .ThenInclude(z => z.TipoMedicamento)
                                        .AsNoTracking().ToListAsync();

            List<CartaoControleDTO> retorno = cartaoControle.Select(m => new CartaoControleDTO
            {
                Id = m.Id,
                MedicamentoId = m.MedicamentoId,
                Medicamento = m.Medicamento.Identificacao,
                Concentracao = m.Medicamento.Concentracao,
                Unidade = m.Medicamento.Unidade.Identificacao,
                Quantidade = m.Quantidade,
                Tipo = m.Medicamento.TipoMedicamento.Identificacao,
                Data = m.Data,
                DataRetorno = m.DataRetorno,
                Profissional = m.Profissional
            }).ToList();

            return retorno;
        }

        public async Task<CartaoControleDTO> Insert(CartaoControleDTO model)
        {
            try
            {
                CartaoControle registro = new CartaoControle()
                {
                    MedicamentoId = model.MedicamentoId,
                    Quantidade = model.Quantidade,
                    Data = model.Data,
                    DataRetorno = model.DataRetorno,
                    Profissional = model.Profissional
                };

                await _dbContext.AddAsync(registro);
                await _dbContext.SaveChangesAsync();

                return model;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message ?? ex.InnerException.ToString());
            }
        }

        public async Task<CartaoControleDTO> Update(CartaoControleDTO model)
        {
            try
            {
                var existRegistro = await _dbContext.CartaoControles.Where(x => x.Id == model.Id).FirstOrDefaultAsync();
                if (existRegistro == null)
                    throw new Exception("Erro ao atualizar, o registro não existe!");
                
                existRegistro.MedicamentoId = model.MedicamentoId;
                existRegistro.Quantidade = model.Quantidade;
                existRegistro.Data = model.Data;
                existRegistro.DataRetorno = model.DataRetorno;
                existRegistro.Profissional = model.Profissional;
                await _dbContext.SaveChangesAsync();

                return model;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message ?? ex.InnerException.ToString());
            }
        }

        public async Task Delete(long id)
        {
            try
            {
                var registro = await _dbContext.CartaoControles.Where(x => x.Id == id).FirstOrDefaultAsync();
                if (registro == null)
                    throw new Exception("Erro ao deletar, o registro não existe!");

                _dbContext.Remove(registro);
                await _dbContext.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message ?? ex.InnerException.ToString());
            }
        }
    }
}