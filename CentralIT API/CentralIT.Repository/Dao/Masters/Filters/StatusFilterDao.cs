using System;
using System.Collections.Generic;
using System.Text;

using Newtonsoft.Json;

namespace CentralIT.Repository.Dao.Masters.Filters {
    public class StatusFilterDao {
        [JsonProperty("IdEstatus")]
        public int IdStatus { get; set; }
        [JsonProperty("IdTipoEstatus")]
        public int IdStatusType { get; set; }
        [JsonProperty("IndActivo")]
        public int IndActivo { get; set; }
    }
}
