using System;
using System.Collections.Generic;
using System.Text;

using Newtonsoft.Json;

namespace CentralIT.Repository.Dao.security.Filters {
    public class UserFilterDao {
        [JsonProperty("IdUsuario")]
        public long UserId { get; set; }
        //[JsonProperty("IdTipoEntidad")]
        //public int EntityTypeId { get; set; }
        [JsonProperty("IdDepartamento")]
        public int DepartmentId { get; set; }
        [JsonProperty("IdCargo")]
        public int PositionId { get; set; }
        [JsonProperty("Cedula")]
        public string IdentityCard { get; set; }
        [JsonProperty("Correo")]
        public string Email { get; set; }
        [JsonProperty("Nombre")]
        public string Name { get; set; }
        [JsonProperty("IndActivo")]
        public int Status { get; set; }
    }
}
