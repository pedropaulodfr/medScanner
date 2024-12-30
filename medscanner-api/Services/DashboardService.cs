using authentication_jwt.DTO.Dashboard;
using authentication_jwt.Models;
using Microsoft.EntityFrameworkCore;

namespace authentication_jwt.Services
{
    public class DashboardService
    {
        private readonly AppDbContext _dbContext;

        // Construtor para injetar o AppDbContext
        public DashboardService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<CartaoControleDashboardDTO>> CartaoControle()
        {
            var dados = await _dbContext.CartaoControles.AsNoTracking().ToListAsync();

            var retorno = dados.GroupBy(x => x.DataRetorno ).Select(y => new CartaoControleDashboardDTO
            {
                DataRetorno = y.Key,
                Quantidade = y.Count()
            }).ToList();

            return retorno;
        }

        public async Task<List<CardsDashboardDTO>> CardProximoRetorno()
        {
            var dados = await _dbContext.CartaoControles
                                            .Include(x => x.Medicamento)
                                                .ThenInclude(y => y.Unidade)
                                            .AsNoTracking().ToListAsync();

            var proximosAoRetorno = dados.Where(x => x.DataRetorno >= DateTime.Now.AddDays(-30))
                            .Select(y => new CardsDashboardDTO
                            {
                                CartaoControleId = y.Id,
                                DataRetorno = y.DataRetorno,
                                Medicamento = string.Format("{0} {1} {2}", y.Medicamento.Identificacao, y.Medicamento.Concentracao,  y.Medicamento.Unidade.Identificacao),
                                Quantidade = dados.Count()
                            }).ToList();

            return proximosAoRetorno;
        }

        public async Task<List<QuantidadeMedicamentosDashboardDTO>> CardQuantidadeMedicamentos()
        {
            var dados = await _dbContext.CartaoControles
                                        .Include(x => x.Medicamento)
                                            .ThenInclude(y => y.Unidade)
                                        .AsNoTracking().ToListAsync();

            /* CC = Cartão de Controle | R = Receituário
            Fórmula para calcular a quantidade:
            Quantidade = CC.quantidade - ((dataHoje - CC.data) x R.dose x R.frequencia) */
            var retorno = dados.GroupBy(x => x.MedicamentoId ).Select(y => new QuantidadeMedicamentosDashboardDTO
            {
                Medicamento = string.Format("{0} {1} {2}", y.First().Medicamento.Identificacao, y.First().Medicamento.Concentracao,  y.First().Medicamento.Unidade.Identificacao),
                QuantidadeTotal = dados.Count(),
                Quantidade = (
                    _dbContext.CartaoControles
                        .Where(x => x.MedicamentoId == y.Key)
                        .OrderByDescending(x => x.Data)
                        .Select(x => x.Quantidade - ((DateTime.Now - x.Data).Value.Days * _dbContext.Receituarios
                                                                                                    .Where(z => z.MedicamentoId == y.Key)
                                                                                                    .Select(z => z.Dose * z.Frequencia)
                                                                                                    .FirstOrDefault()
                        ))
                        .FirstOrDefault()
                )
            }).ToList();

            return retorno;
        }

    }
}