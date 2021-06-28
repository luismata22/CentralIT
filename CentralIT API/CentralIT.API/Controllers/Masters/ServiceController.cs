using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AutoMapper;

using CentralIT.API.ViewModels.Masters;
using CentralIT.API.ViewModels.Masters.Filters;
using CentralIT.Domain.Service;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CentralIT.API.Controllers.Masters {

    [Route("[controller]")]
    [ApiController]
    public class ServiceController : ControllerBase {

        private readonly IMapper _mapper;
        private readonly IServiceService _serviceService;

        public ServiceController(IMapper mapper, IServiceService serviceService)
        {
            this._mapper = mapper;
            this._serviceService = serviceService;
        }

        /// <summary>
        /// Metodo para obtener la lista de servicios.
        /// </summary>
        /// <param name="filterViewModel">Filtro.</param>
        /// <returns>result.</returns>
        [HttpGet]
        [AllowAnonymous]
        public ActionResult<List<ServiceViewModel>> Get([FromQuery] ServiceFilterViewModel filterViewModel)
        {
            List<Services> result = this._serviceService.GetServices(this._mapper.Map<ServiceFilter>(filterViewModel));
            return new JsonResult(this._mapper.Map<List<ServiceViewModel>>(result));
        }

        /// <summary>
        /// Metodo para guardar y editar los servicios
        /// </summary>
        /// <param name="viewModel"> variable a agregar. </param>
        /// <param name="idUser"> parametro de idusuario. </param>
        /// <returns>Json con valor entero.</returns>
        [HttpPost("{idUser}")]
        [AllowAnonymous]
        public ActionResult<long> Post([FromBody] ServiceViewModel viewModel, long idUser)
        {
            long result = this._serviceService.PostService(this._mapper.Map<Services>(viewModel), idUser);
            return new JsonResult(result);
        }
    }
}
