using System;
using System.Collections.Generic;
using System.Text;

using Newtonsoft.Json;

namespace CentralIT.Repository.Dao.Masters {
    public class DocumentTypeDao {
        [JsonProperty("IdTipoDocumento")]
        public int IdDocumentType { get; set; }
        [JsonProperty("TipoDocumento")]
        public string Name { get; set; }
        [JsonProperty("Identificador")]
        public string Identifier { get; set; }
        [JsonProperty("IndActivo")]
        public bool Status { get; set; }
    }
}
