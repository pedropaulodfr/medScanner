using authentication_jwt.DTO;
using authentication_jwt.Models;
using Microsoft.EntityFrameworkCore;

namespace authentication_jwt.Services
{
    public class MedicamentosService
    {
        private readonly AppDbContext _dbContext;

        // Construtor para injetar o AppDbContext
        public MedicamentosService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<MedicamentoDTO>> GetAll()
        {
            List<Medicamento> medicamentos = await _dbContext.Medicamentos.ToListAsync();

            List<MedicamentoDTO> retorno = medicamentos.Select(m => new MedicamentoDTO
            {
                Id = m.Id,
                Identificacao = m.Identificacao,
                Concentracao = m.Concentracao.ToString(),
                Descricao = m.Descricao,
                Unidade = (_dbContext.Unidades.Where(u => u.Id == m.UnidadeId).FirstOrDefault()).Identificacao,
                UnidadeId = m.UnidadeId,
                TipoMedicamento = (_dbContext.TipoMedicamentos.Where(tm => tm.Id == m.TipoMedicamentoId).FirstOrDefault()).Descricao,
                TipoMedicamentoId = m.TipoMedicamentoId
            }).ToList();

            return retorno;
        }

        public async Task<Medicamento> Insert(MedicamentoDTO model)
        {
            try
            {
                if (model.Id != 0)
                    throw new Exception("Erro ao salvar, o medicamento já existe!");

                Medicamento medicamento = new Medicamento()
                {
                    Identificacao = model.Identificacao,
                    Descricao = model.Descricao ?? "",
                    TipoMedicamentoId = model.TipoMedicamentoId,
                    Concentracao = Int32.Parse(model.Concentracao),
                    UnidadeId = model.UnidadeId
                };

                await _dbContext.AddAsync(medicamento);
                await _dbContext.SaveChangesAsync();

                return medicamento;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message ?? ex.InnerException.ToString());
            }
        }

        public async Task<MedicamentoDTO> Update(MedicamentoDTO model)
        {
            try
            {
                var existMedicamento = await _dbContext.Medicamentos.Where(m => m.Id == model.Id).FirstOrDefaultAsync();
                if (existMedicamento == null)
                    throw new Exception("Erro ao atualizar, o medicamento não existe!");
                
                existMedicamento.Identificacao = model.Identificacao;
                existMedicamento.Descricao = model.Descricao;
                existMedicamento.Concentracao = Int32.Parse(model.Concentracao);
                existMedicamento.TipoMedicamentoId = model.TipoMedicamentoId;
                existMedicamento.UnidadeId = model.UnidadeId;

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
            var medicamento = await _dbContext.Medicamentos.Where(m => m.Id == id).FirstOrDefaultAsync();
            if (medicamento == null)
                throw new Exception("Erro ao deletar, o medicamento não existe!");

            _dbContext.Remove(medicamento);
            await _dbContext.SaveChangesAsync();
        }
    }
}