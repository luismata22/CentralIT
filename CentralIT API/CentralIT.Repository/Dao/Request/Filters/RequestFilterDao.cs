using System;
using System.Collections.Generic;
using System.Text;

using CentralIT.Repository.Dao.security;

using Newtonsoft.Json;

namespace CentralIT.Repository.Dao.Request.Filters {
    public class RequestFilterDao {
        [JsonProperty("IdSolicitud")]
        public int RequestId { get; set; }
        [JsonProperty("IdUsuarioSolicita")]
        public int UserRequestedId { get; set; }
        [JsonProperty("IdUsuarioAtiende")]
        public int UserAttendedId { get; set; }
        [JsonProperty("IdTipoSolicitud")]
        public int RequestTypeId { get; set; }
        [JsonProperty("IdPrioridad")]
        public int PriorityId { get; set; }
        [JsonProperty("IdServicio")]
        public int ServiceId { get; set; }
        [JsonProperty("IdDepartamento")]
        public int DepartmentId { get; set; }
        [JsonProperty("IndActivo")]
        public int Status { get; set; }
        [JsonProperty("FechaSolicitud")]
        public DateTime RequestDate { get; set; }
        [JsonProperty("FechaAtencion")]
        public DateTime AttendedDate { get; set; }
    }
}
