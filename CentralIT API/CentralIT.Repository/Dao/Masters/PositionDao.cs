using System;
using System.Collections.Generic;
using System.Text;

using Newtonsoft.Json;

namespace CentralIT.Repository.Dao.Masters {
    public class PositionDao {
        [JsonProperty("IdCargoxDepartamento")]
        public int IdPositionDepartment { get; set; }
        [JsonProperty("IdCargo")]
        public int IdPosition { get; set; }
        [JsonProperty("Cargo")]
        public string Name { get; set; }
        [JsonProperty("Descripcion")]
        public string Description { get; set; }
        [JsonProperty("IndActivo")]
        public bool Status { get; set; }
    }
}
