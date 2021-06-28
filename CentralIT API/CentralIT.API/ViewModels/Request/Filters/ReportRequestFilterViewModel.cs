using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CentralIT.API.ViewModels.Request.Filters {
    public class ReportRequestFilterViewModel {

        public int RequestId { get; set; }

        public int UserRequestedId { get; set; }

        public int UserAttendedId { get; set; }

        public int ServiceId { get; set; }

        public int DepartmentId { get; set; }

        public int StatusId { get; set; }

        public string From { get; set; }

        public string To { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }
    }
}
