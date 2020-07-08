using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Manter_Sistema_Dev.Models
{
    public partial class ManterSistemaDbContext : DbContext
    {
        public ManterSistemaDbContext()
        {
        }

        public ManterSistemaDbContext(DbContextOptions<ManterSistemaDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Sistemas> Sistemas { get; set; }
        public virtual DbSet<Usuarios> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //if (!optionsBuilder.IsConfigured)
            //{
            //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
            //    optionsBuilder.UseSqlServer("Data Source=DESKTOP-L2OS52O;Initial Catalog=manterSistema;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            //}
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Sistemas>(entity =>
            {
                entity.HasKey(e => e.SistemaId)
                    .HasName("PK__sistemas__651576B5F5046BC4");

                entity.Property(e => e.SistemaId).HasColumnName("sistema_id");

                entity.Property(e => e.Descricao)
                    .IsRequired()
                    .HasColumnName("descricao")
                    .HasMaxLength(101)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(101)
                    .IsUnicode(false);

                entity.Property(e => e.NovaJustificativa)
                    .HasColumnName("nova_justificativa")
                    .HasMaxLength(501)
                    .IsUnicode(false);

                entity.Property(e => e.Sigla)
                    .IsRequired()
                    .HasColumnName("sigla")
                    .HasMaxLength(11)
                    .IsUnicode(false);

                entity.Property(e => e.Status).HasColumnName("status_");

                entity.Property(e => e.UltimaJustificativa)
                    .HasColumnName("ultima_justificativa")
                    .HasMaxLength(501)
                    .IsUnicode(false);

                entity.Property(e => e.UltimaModificacao)
                    .HasColumnName("ultima_modificacao")
                    .HasColumnType("datetime");

                entity.Property(e => e.Url)
                    .HasColumnName("url_")
                    .HasMaxLength(51)
                    .IsUnicode(false);

                entity.Property(e => e.UsuarioResponsavel)
                    .HasColumnName("usuario_responsavel")
                    .HasMaxLength(101)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Usuarios>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK__usuarios__B9BE370F6F0191E0");

                entity.Property(e => e.UserId)
                    .HasColumnName("user_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasColumnName("nome")
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
