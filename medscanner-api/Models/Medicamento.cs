﻿using System;
using System.Collections.Generic;

namespace authentication_jwt.Models;

public partial class Medicamento
{
    public long Id { get; set; }

    public string Identificacao { get; set; } = null!;

    public string? Descricao { get; set; }

    public long TipoMedicamentoId { get; set; }

    public int? Concentracao { get; set; }

    public long? UnidadeId { get; set; }

    public virtual ICollection<CartaoControle> CartaoControles { get; } = new List<CartaoControle>();

    public virtual TipoMedicamento TipoMedicamento { get; set; } = null!;

    public virtual Unidade? Unidade { get; set; }
}