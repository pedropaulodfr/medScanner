using authentication_jwt.DTO;
using authentication_jwt.Models;
using Microsoft.EntityFrameworkCore;

namespace authentication_jwt.Services
{
    public class ReceituarioService
    {
        private readonly AppDbContext _dbContext;

        // Construtor para injetar o AppDbContext
        public ReceituarioService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<ReceituarioDTO>> GetAll()
        {
            var receituarios = await _dbContext.Receituarios.ToListAsync();

            List<ReceituarioDTO> retorno = receituarios.Select(m => new ReceituarioDTO
            {
                Id = m.Id,
                Frequencia = m.Frequencia,
                Tempo = m.Tempo,
                Periodo = m.Periodo,
                Dose = m.Dose,
                MedicamentoId = m.MedicamentoId,
                Medicamento = (_dbContext.Medicamentos.Where(x => x.Id == m.MedicamentoId).FirstOrDefault()).Identificacao,
                TipoMedicamento = (_dbContext.TipoMedicamentos.Where(x => x.Id == m.TipoMedicamentoId).FirstOrDefault()).Identificacao,
                TipoMedicamentoId = m.TipoMedicamentoId
            }).ToList();

            return retorno;
        }

        public async Task<ReceituarioDTO> Insert(ReceituarioDTO model)
        {
            try
            {
                Receituario receituario = new Receituario()
                {
                    Frequencia = model.Frequencia,
                    Tempo = model.Tempo,
                    Periodo = model.Periodo,
                    Dose = model.Dose,
                    MedicamentoId = model.MedicamentoId,
                    TipoMedicamentoId = model.TipoMedicamentoId
                };

                await _dbContext.AddAsync(receituario);
                await _dbContext.SaveChangesAsync();

                return model;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message ?? ex.InnerException.ToString());
            }
        }

        public async Task<ReceituarioDTO> Update(ReceituarioDTO model)
        {
            try
            {
                var existReceituario = await _dbContext.Receituarios.Where(x => x.Id == model.Id).FirstOrDefaultAsync();
                if (existReceituario == null)
                    throw new Exception("Erro ao atualizar, o receituário não existe!");
                
                existReceituario.Frequencia = model.Frequencia;
                existReceituario.Tempo = model.Tempo;
                existReceituario.Periodo = model.Periodo;
                existReceituario.Dose = model.Dose;
                existReceituario.MedicamentoId = model.MedicamentoId;
                existReceituario.TipoMedicamentoId = model.TipoMedicamentoId;
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
                var receituario = await _dbContext.Receituarios.Where(x => x.Id == id).FirstOrDefaultAsync();
                if (receituario == null)
                    throw new Exception("Erro ao deletar, o receituário não existe!");

                _dbContext.Remove(receituario);
                await _dbContext.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message ?? ex.InnerException.ToString());
            }
        }
    }
}