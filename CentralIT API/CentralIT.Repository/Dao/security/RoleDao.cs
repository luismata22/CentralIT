using System;
using System.Collections.Generic;
using System.Text;

using Newtonsoft.Json;

namespace CentralIT.Repository.Dao.security {
    public class RoleDao {
        [JsonProperty("IdRol")]
        public int IdRole { get; set; }
        [JsonProperty("Rol")]
        public string Name { get; set; }
        [JsonProperty("IndActivo")]
        public bool IndActivo { get; set; }
    }
}
