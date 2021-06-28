using System;
using System.Collections.Generic;
using System.Text;

namespace CentralIT.Domain.Common {
    public class CommonService : ICommonService{

        private readonly ICommonRepository _commonRepository;

        public CommonService(ICommonRepository commonRepository)
        {
            this._commonRepository = commonRepository;
        }

        /// <summary>
        /// Metodo para obtener la lista de estatus
        /// </summary>
        /// <param name="departmentFilter"></param>
        /// <returns></returns>
        public List<Status> GetStatues(StatusFilter statusFilter)
        {
            return _commonRepository.GetStatues(statusFilter);
        }

        /// <summary>
        /// Metodo para obtener la lista de prioridades
        /// </summary>
        /// <param name="priorityFilter"></param>
        /// <returns></returns>
        public List<Priority> GetPriorities(PriorityFilter priorityFilter)
        {
            return _commonRepository.GetPriorities(priorityFilter);
        }

        /// <summary>
        /// Metodo para obtener la lista de tipos de solicitudes
        /// </summary>
        /// <param name="requestTypeFilter"></param>
        /// <returns></returns>
        public List<RequestType> GetRequestTypes(RequestTypeFilter requestTypeFilter)
        {
            return _commonRepository.GetRequestTypes(requestTypeFilter);
        }
    }
}
