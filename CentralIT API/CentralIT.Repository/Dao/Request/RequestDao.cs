using System;
using System.Collections.Generic;
using System.Text;

using CentralIT.Repository.Dao.Masters;
using CentralIT.Repository.Dao.security;

using Newtonsoft.Json;

namespace CentralIT.Repository.Dao.Request {
    public class RequestDao {
        [JsonProperty("IdSolicitud")]
        public int RequestId { get; set; }
        [JsonProperty("UsuarioSolicita")]
        public UserDao UserRequestedId { get; set; }
        [JsonProperty("UsuarioAtiende")]
        public UserDao UserAttendedId { get; set; }
        [JsonProperty("Estatus")]
        public StatusDao RequestStatus { get; set; }
        [JsonProperty("TipoSolicitud")]
        public RequestTypeDao RequestType { get; set; }
        [JsonProperty("Prioridad")]
        public PriorityDao Prioriry { get; set; }
        [JsonProperty("Servicio")]
        public ServiceDao Service { get; set; }
        [JsonProperty("Motivo")]
        public string Reason { get; set; }
        [JsonProperty("Observacion")]
        public string Observation { get; set; }
        [JsonProperty("IndActivo")]
        public bool Status { get; set; }
        [JsonProperty("FechaSolicitud")]
        public DateTime RequestDate { get; set; }
        [JsonProperty("FechaAtencion")]
        public DateTime AttendedDate { get; set; }
    }
}
