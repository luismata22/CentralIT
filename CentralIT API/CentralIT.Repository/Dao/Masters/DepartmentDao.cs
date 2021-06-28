using System;
using System.Collections.Generic;
using System.Text;

using Newtonsoft.Json;

namespace CentralIT.Repository.Dao.Masters {
    public class DepartmentDao {
        [JsonProperty("IdDepartamento")]
        public int IdDepartment { get; set; }
        [JsonProperty("IdServicioxDepartamento")]
        public int IdServiceDepartment { get; set; }
        [JsonProperty("Departamento")]
        public string Name { get; set; }
        [JsonProperty("Descripcion")]
        public string Description { get; set; }
        [JsonProperty("Cargos")]
        public List<PositionDao> Positions { get; set; }
        [JsonProperty("IndActivo")]
        public bool Status { get; set; }
    }
}
