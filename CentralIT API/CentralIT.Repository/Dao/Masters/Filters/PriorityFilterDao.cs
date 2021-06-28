using System;
using System.Collections.Generic;
using System.Text;

using Newtonsoft.Json;

namespace CentralIT.Repository.Dao.Masters.Filters {
    public class PriorityFilterDao {
        [JsonProperty("IdPrioridad")]
        public int IdPriority { get; set; }
        [JsonProperty("IndActivo")]
        public int Status { get; set; }
    }
}
