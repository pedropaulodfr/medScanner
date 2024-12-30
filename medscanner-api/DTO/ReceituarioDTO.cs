namespace authentication_jwt.DTO
{
    public class ReceituarioDTO
    {
        public long Id { get; set; }
        public string? Medicamento { get; set; }
        public long MedicamentoId { get; set; }
        public int? Frequencia { get; set; }
        public string Tempo { get; set; }
        public string Periodo { get; set; }
        public int? Dose { get; set; }
        public string? TipoMedicamento { get; set; }
        public long TipoMedicamentoId { get; set; }
    }
}