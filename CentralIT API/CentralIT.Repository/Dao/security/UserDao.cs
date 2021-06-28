using System;
using System.Collections.Generic;
using System.Text;

using CentralIT.Repository.Dao.Masters;

using Newtonsoft.Json;

namespace CentralIT.Repository.Dao.security {
    public class UserDao {
        [JsonProperty("IdUsuario")]
        public long UserId { get; set; }
        [JsonProperty("IdTipoDocumento")]
        public int EntityTypeId { get; set; }
        [JsonProperty("IdDepartamento")]
        public int DepartmentId { get; set; } 
        [JsonProperty("IdCargoxDepartamento")]
        public int PositionDepartmentId { get; set; }
        [JsonProperty("NumeroDocumento")]
        public string IdentityCard { get; set; }
        [JsonProperty("Nombre")]
        public string FirstName { get; set; }
        [JsonProperty("SegundoNombre")]
        public string SecondName { get; set; }
        [JsonProperty("Apellido")]
        public string FirstLastName { get; set; }
        [JsonProperty("SegundoApellido")]
        public string SecondLastName { get; set; }
        [JsonProperty("TelefonoPrincipal")]
        public string MainPhone { get; set; }
        [JsonProperty("TelefonoSecundario")]
        public string secondaryPhone { get; set; }
        [JsonProperty("Correo")]
        public string Email { get; set; }
        [JsonProperty("ClaveAcceso")]
        public string Password { get; set; }
        [JsonProperty("Rol")]
        public RoleDao Roles { get; set; }
        [JsonProperty("Departamento")]
        public DepartmentDao Departments { get; set; }
        [JsonProperty("Cargo")]
        public PositionDao Positions { get; set; }

        [JsonProperty("IndActivo")]
        public bool Status { get; set; }
    }
}
