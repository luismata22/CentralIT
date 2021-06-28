using System;
using System.Collections.Generic;
using System.Text;

using Newtonsoft.Json;

namespace CentralIT.Repository.Dao.Masters.Filters {
    public class PositionDepartmentFilterDao {

        [JsonProperty("IdDepartamento")]
        public int IdDepartment { get; set; }
    }
}
