using System;
using System.Collections.Generic;
using System.Text;

using CentralIT.Domain.Exceptions;

namespace CentralIT.Domain.Service {
    public class ServiceService : IServiceService{

        private readonly IServiceRepository _serviceRepository;

        public ServiceService(IServiceRepository serviceRepository)
        {
            this._serviceRepository = serviceRepository;
        }

        /// <summary>
        /// Metodo para obtener la lista de services
        /// </summary>
        /// <param name="departmentFilter"></param>
        /// <returns></returns>
        public List<Services> GetServices(ServiceFilter serviceFilter)
        {
            return _serviceRepository.GetServices(serviceFilter);
        }

        /// <summary>
        /// Metodo para guardar y editar los servicios
        /// </summary>
        /// <param name="service"></param>
        /// <returns></returns>
        public long PostService(Services service, long idUser)
        {
            if (service == null)
                throw new ArgumentsNullException();

            var result = _serviceRepository.PostService(service, idUser);
            return result;
        }
    }
}
