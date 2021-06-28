using System;
using System.Collections.Generic;
using System.Text;

using Newtonsoft.Json;

namespace CentralIT.Repository.Dao.Masters.Filters {
    public class DocumentTypeFilterDao {
        [JsonProperty("IdTipoDocumento")]
        public int IdDocumentType { get; set; }
        [JsonProperty("IdTipoEntidad")]
        public int IdEntityType { get; set; }
        [JsonProperty("IndActivo")]
        public int Status { get; set; }
    }
}
