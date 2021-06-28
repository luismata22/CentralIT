using System;
using System.Collections.Generic;
using System.Text;

using Newtonsoft.Json;

namespace CentralIT.Repository.Dao.security {
    public class PermissionDao {
        [JsonProperty("IdAcceso")]
        public long id { get; set; }
        [JsonProperty("Acceso")]
        public string name { get; set; }
    }
}
