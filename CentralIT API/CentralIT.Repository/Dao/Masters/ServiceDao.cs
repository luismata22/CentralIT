using System;
using System.Collections.Generic;
using System.Text;

using Newtonsoft.Json;

namespace CentralIT.Repository.Dao.Masters {
    public class ServiceDao {
        [JsonProperty("IdServicio")]
        public int IdService { get; set; }
        [JsonProperty("Servicio")]
        public string Name { get; set; }
        [JsonProperty("Descripcion")]
        public string Description { get; set; }
        [JsonProperty("Departamento")]
        public List<DepartmentDao> Department { get; set; }
        [JsonProperty("IndActivo")]
        public bool Status { get; set; }
    }
}
