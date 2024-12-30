using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace authentication_jwt.DTO.Dashboard
{
    public class QuantidadeMedicamentosDashboardDTO
    {
        public string? Medicamento { get; set; }
        public long? Quantidade { get; set; }
        public long? QuantidadeTotal { get; set; }
    }
}