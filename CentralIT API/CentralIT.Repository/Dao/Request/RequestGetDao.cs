using System;
using System.Collections.Generic;
using System.Text;

using CentralIT.Repository.Dao.Masters;
using CentralIT.Repository.Dao.security;
using Newtonsoft.Json;

namespace CentralIT.Repository.Dao.Request {
    public class RequestGetDao {
        [JsonProperty("IdSolicitud")]
        public int RequestId { get; set; }
        [JsonProperty("NombreUsuarioSolicita")]
        public string NameUserRequested { get; set; }
        [JsonProperty("IdUsuarioAtiende")]
        public int UserAttendedId { get; set; }
        [JsonProperty("NombreUsuarioAtiende")]
        public string NameUserAttended { get; set; }
        [JsonProperty("UsuarioSolicita")]
        public UserDao UserRequested { get; set; }
        [JsonProperty("UsuarioAtiende")]
        public UserDao UserAttended { get; set; }
        [JsonProperty("NombreUsuarioSolicitaInicial")]
        public string NameUserRequestedInitial { get; set; }
        [JsonProperty("TelefonoUsuarioSolicitaInicial")]
        public string PhoneUserRequestedInitial { get; set; }
        [JsonProperty("Estatus")]
        public StatusDao RequestStatus { get; set; }
        [JsonProperty("TipoSolicitud")]
        public RequestTypeDao RequestType { get; set; }
        [JsonProperty("Prioridad")]
        public PriorityDao Priority { get; set; }
        [JsonProperty("Servicio")]
        public ServiceDao Service { get; set; }
        [JsonProperty("Departamento")]
        public DepartmentDao Department { get; set; }
        [JsonProperty("Cargo")]
        public PositionDao Position { get; set; }
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
        [JsonProperty("FechaFinalizacion")]
        public DateTime FinishDate { get; set; }
    }
}
