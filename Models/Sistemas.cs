using System;
using System.Collections.Generic;

namespace Manter_Sistema_Dev.Models
{
    public partial class Sistemas
    {
        public int SistemaId { get; set; }
        public string Descricao { get; set; }
        public string Sigla { get; set; }
        public string Email { get; set; }
        public string Url { get; set; }
        public bool Status { get; set; }
        public string UsuarioResponsavel { get; set; }
        public DateTime? UltimaModificacao { get; set; }
        public string UltimaJustificativa { get; set; }
        public string NovaJustificativa { get; set; }
    }
}
