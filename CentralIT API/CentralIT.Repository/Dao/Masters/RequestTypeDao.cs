using System;
using System.Collections.Generic;
using System.Text;

using Newtonsoft.Json;

namespace CentralIT.Repository.Dao.Masters {
    public class RequestTypeDao {
        [JsonProperty("IdTipoSolicitud")]
         public int IdRequestType { get; set; }
        [JsonProperty("TipoSolicitud")]
        public string Name { get; set; }
        [JsonProperty("IndActivo")]
        public bool IndActivo { get; set; }
    }
}
