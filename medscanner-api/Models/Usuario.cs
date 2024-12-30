using System;
using System.Collections.Generic;

namespace authentication_jwt.Models;

public partial class Usuario
{
    public long Id { get; set; }

    public string Perfil { get; set; } = null!;

    public string? Nome { get; set; }

    public string? NomeCompleto { get; set; }

    public string? Email { get; set; }

    public string? Senha { get; set; }

    public string Cpfcnpj { get; set; } = null!;

    public DateTime? DataNascimento { get; set; }

    public string? Logradouro { get; set; }

    public string? Bairro { get; set; }

    public string? Complemento { get; set; }

    public string? Numero { get; set; }

    public string? Uf { get; set; }

    public string? Cep { get; set; }

    public string? Cns { get; set; }

    public string? PlanoSaude { get; set; }

    public string? ImagemPerfil { get; set; }
}
