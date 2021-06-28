using System;
using System.Collections.Generic;
using System.Text;

using Newtonsoft.Json;

namespace CentralIT.Repository.Dao.Masters {
    public class StatusDao {
        [JsonProperty("IdEstatus")]
        public int IdStatus { get; set; }
        [JsonProperty("IdTipoEstatus")]
        public int IdStatusType { get; set; }
        [JsonProperty("Estatus")]
        public string Name { get; set; }
        [JsonProperty("IndActivo")]
        public bool IndActivo { get; set; }
    }
}
