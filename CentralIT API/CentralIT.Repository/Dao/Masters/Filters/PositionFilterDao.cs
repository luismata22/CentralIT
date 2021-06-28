using System;
using System.Collections.Generic;
using System.Text;

using Newtonsoft.Json;

namespace CentralIT.Repository.Dao.Masters.Filters {
    public class PositionFilterDao {
        [JsonProperty("IdCargo")]
        public int IdPosition { get; set; }
        [JsonProperty("Cargo")]
        public string Position { get; set; }
        [JsonProperty("IndActivo")]
        public int Status { get; set; }
    }
}
