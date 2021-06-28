using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using CentralIT.API.ViewModels.Security;

namespace CentralIT.API.ViewModels.Request.Filters {
    public class RequestFilterViewModel {

        public int RequestId { get; set; }

        public int UserRequestedId { get; set; }

        public int UserAttendedId { get; set; }

        public int RequestTypeId { get; set; }

        public int PriorityId { get; set; }

        public int ServiceId { get; set; }

        public int DepartmentId { get; set; }

        public int Status { get; set; }

        public string RequestDateS { get; set; }

        public string AttendedDateS { get; set; }

        public DateTime RequestDate { get; set; }

        public DateTime AttendedDate { get; set; }
    }
}
