using System;
using System.Collections.Generic;
using System.Text;

using Newtonsoft.Json;

namespace CentralIT.Repository.Dao.Masters.Filters {
    public class ServiceFilterDao {
        [JsonProperty("IdServicio")]
        public int IdService { get; set; }
        [JsonProperty("Servicio")]
        public string Service { get; set; }
        [JsonProperty("IndActivo")]
        public int Status { get; set; }
    }
}
