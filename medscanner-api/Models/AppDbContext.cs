﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace authentication_jwt.Models;

public partial class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<CartaoControle> CartaoControles { get; set; }

    public virtual DbSet<Medicamento> Medicamentos { get; set; }

    public virtual DbSet<Receituario> Receituarios { get; set; }

    public virtual DbSet<TipoMedicamento> TipoMedicamentos { get; set; }

    public virtual DbSet<Unidade> Unidades { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CartaoControle>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Receituario");

            entity.ToTable("CartaoControle");

            entity.Property(e => e.Data).HasColumnType("date");
            entity.Property(e => e.DataRetorno).HasColumnType("date");
            entity.Property(e => e.MedicamentoId).HasColumnName("Medicamento_Id");
            entity.Property(e => e.Profissional)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Medicamento).WithMany(p => p.CartaoControles)
                .HasForeignKey(d => d.MedicamentoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CartaoControle_Medicamentos");
        });

        modelBuilder.Entity<Medicamento>(entity =>
        {
            entity.Property(e => e.Descricao)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Identificacao)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.TipoMedicamentoId).HasColumnName("TipoMedicamento_Id");
            entity.Property(e => e.UnidadeId).HasColumnName("Unidade_Id");

            entity.HasOne(d => d.TipoMedicamento).WithMany(p => p.Medicamentos)
                .HasForeignKey(d => d.TipoMedicamentoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Medicamentos_TipoMedicamento");

            entity.HasOne(d => d.Unidade).WithMany(p => p.Medicamentos)
                .HasForeignKey(d => d.UnidadeId)
                .HasConstraintName("FK_Medicamentos_Unidades");
        });

        modelBuilder.Entity<Receituario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Receituario_1");

            entity.ToTable("Receituario");

            entity.Property(e => e.MedicamentoId).HasColumnName("Medicamento_Id");
            entity.Property(e => e.Periodo)
                .HasMaxLength(5)
                .IsUnicode(false)
                .HasComment("1 - Manhã; 2 - Tarde; 3 - Noite");
            entity.Property(e => e.Tempo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.TipoMedicamentoId).HasColumnName("TipoMedicamento_Id");

            entity.HasOne(d => d.TipoMedicamento).WithMany(p => p.Receituarios)
                .HasForeignKey(d => d.TipoMedicamentoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Receituario_Medicamentos");
        });

        modelBuilder.Entity<TipoMedicamento>(entity =>
        {
            entity.ToTable("TipoMedicamento");

            entity.Property(e => e.Descricao)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Identificacao)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Unidade>(entity =>
        {
            entity.Property(e => e.Descricao)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Identificacao)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Usuarios__3214EC073A40E893");

            entity.Property(e => e.Bairro)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Cep)
                .HasMaxLength(9)
                .IsUnicode(false)
                .HasColumnName("CEP");
            entity.Property(e => e.Cns)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("CNS");
            entity.Property(e => e.Complemento)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Cpfcnpj)
                .HasMaxLength(17)
                .IsUnicode(false)
                .HasColumnName("CPFCNPJ");
            entity.Property(e => e.DataNascimento).HasColumnType("date");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ImagemPerfil).HasColumnType("text");
            entity.Property(e => e.Logradouro)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Nome)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NomeCompleto)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.Numero)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Perfil)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.PlanoSaude)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Senha)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Uf)
                .HasMaxLength(2)
                .IsUnicode(false)
                .HasColumnName("UF");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}