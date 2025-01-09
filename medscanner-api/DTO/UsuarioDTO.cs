namespace authentication_jwt.DTO
{
    public class UsuarioDTO
    {
        public long Id { get; set; }

        public string Perfil { get; set; } = null!;

        public string Nome { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string? ImagemPerfil { get; set; }

        public string? CodigoCadastro { get; set; }

        public string Ativo { get; set; }
    }
}