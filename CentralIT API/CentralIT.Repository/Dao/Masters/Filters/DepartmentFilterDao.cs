using System;
using System.Collections.Generic;
using System.Text;

using Newtonsoft.Json;

namespace CentralIT.Repository.Dao.Masters.Filters {
    public class DepartmentFilterDao {
        [JsonProperty("IdDepartamento")]
        public int IdDepartment { get; set; }
        [JsonProperty("Departamento")]
        public string Department { get; set; }
        [JsonProperty("IdCargo")]
        public int IdPosition { get; set; }
        [JsonProperty("IndActivo")]
        public int Status { get; set; }
    }
}
