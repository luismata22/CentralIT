using System;
using System.Collections.Generic;
using System.Text;

using CentralIT.Domain.Exceptions;
using CentralIT.Domain.Request;

namespace CentralIT.Domain.Requests {
    public class RequestService : IRequestService{

        private readonly IRequestRepository _requestRepository;

        public RequestService(IRequestRepository requestRepository)
        {
            this._requestRepository = requestRepository;
        }

        /// <summary>
        /// Metodo para obtener la lista de solicitudes
        /// </summary>
        /// <param name="requestFilter"></param>
        /// <returns></returns>
        public List<RequestGet> GetRequests(RequestFilter requestFilter)
        {
            return _requestRepository.GetRequests(requestFilter);
        }

        /// <summary>
        /// Metodo para guardar y editar las solicitudes
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public long PostRequest(Requests request, long idUser)
        {
            if (request == null)
                throw new ArgumentsNullException();

            var result = _requestRepository.PostRequest(request, idUser);
            return result;
        }

        /// <summary>
        /// Metodo para obtener los reportes de las solictudes
        /// </summary>
        /// <param name="requestFilter"></param>
        /// <returns></returns>
        public List<RequestGet> GetReportsRequests(ReportRequestFilter reportrequestFilter)
        {
            return _requestRepository.GetReportsRequests(reportrequestFilter);
        }
    }
}
