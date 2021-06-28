using System;
using System.Collections.Generic;
using System.Text;

using Newtonsoft.Json;

namespace CentralIT.Repository.Dao.Masters {
    public class PriorityDao {
        [JsonProperty("IdPrioridad")]
        public int IdPriority { get; set; }
        [JsonProperty("Prioridad")]
        public string Name { get; set; }
        [JsonProperty("IndActivo")]
        public bool Status { get; set; }
    }
}
