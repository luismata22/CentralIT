using System;
using System.Collections.Generic;
using System.Text;

using Newtonsoft.Json;

namespace CentralIT.Repository.Dao.Request.Filters {
    public class ReportRequestFilterDao {
        [JsonProperty("IdSolicitud")]
        public int RequestId { get; set; }
        [JsonProperty("IdUsuarioSolicita")]
        public int UserRequestedId { get; set; }
        [JsonProperty("IdUsuarioAtiende")]
        public int UserAttendedId { get; set; }
        [JsonProperty("IdServicio")]
        public int ServiceId { get; set; }
        [JsonProperty("IdDepartamento")]
        public int DepartmentId { get; set; }
        [JsonProperty("IdEstatus")]
        public int StatusId { get; set; }
        [JsonProperty("Desde")]
        public DateTime FromDate { get; set; }
        [JsonProperty("Hasta")]
        public DateTime ToDate { get; set; }
    }
}
