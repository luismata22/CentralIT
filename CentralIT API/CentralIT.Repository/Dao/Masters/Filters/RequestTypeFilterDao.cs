using System;
using System.Collections.Generic;
using System.Text;

using Newtonsoft.Json;

namespace CentralIT.Repository.Dao.Masters.Filters {
    public class RequestTypeFilterDao {
        [JsonProperty("IdTipoSolicitud")]
        public int IdRequestType { get; set; }
        [JsonProperty("IndActivo")]
        public int IndActivo { get; set; }
    }
}
