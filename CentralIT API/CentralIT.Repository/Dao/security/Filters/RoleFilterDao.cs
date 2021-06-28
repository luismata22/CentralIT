using System;
using System.Collections.Generic;
using System.Text;

using Newtonsoft.Json;

namespace CentralIT.Repository.Dao.security.Filters {
    public class RoleFilterDao {
        [JsonProperty("IdRol")]
        public int IdRole { get; set; }
        [JsonProperty("Rol")]
        public string Role { get; set; }
        [JsonProperty("IndActivo")]
        public int IndActivo { get; set; }
    }
}
