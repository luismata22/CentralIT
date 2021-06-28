using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AutoMapper;

using CentralIT.API.ViewModels.Request;
using CentralIT.API.ViewModels.Request.Filters;
using CentralIT.Domain.Request;
using CentralIT.Domain.Requests;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CentralIT.API.Controllers.Request {
    [Route("[controller]")]
    [ApiController]
    public class RequestController : ControllerBase {

        private readonly IMapper _mapper;
        private readonly IRequestService _requestService;

        public RequestController(IMapper mapper, IRequestService requestService)
        {
            this._mapper = mapper;
            this._requestService = requestService;
        }

        /// <summary>
        /// Metodo para obtener la lista de solicitudes.
        /// </summary>
        /// <param name="filterViewModel">Filtro.</param>
        /// <returns>result.</returns>
        [HttpGet]
        [AllowAnonymous]
        public ActionResult<List<RequestGetViewModel>> Get([FromQuery] RequestFilterViewModel filterViewModel)
        {
            filterViewModel.RequestDate = Convert.ToDateTime(filterViewModel.RequestDateS);
            filterViewModel.AttendedDate = Convert.ToDateTime(filterViewModel.AttendedDateS);
            List<RequestGet> result = this._requestService.GetRequests(this._mapper.Map<RequestFilter>(filterViewModel));
            return new JsonResult(this._mapper.Map<List<RequestGetViewModel>>(result));
        }

        /// <summary>
        /// Metodo para guardar y editar las solictudes
        /// </summary>
        /// <param name="viewModel"> variable a agregar. </param>
        /// <param name="idUser"> parametro de idusuario. </param>
        /// <returns>Json con valor entero.</returns>
        [HttpPost("{idUser}")]
        [AllowAnonymous]
        public ActionResult<long> Post([FromBody] RequestViewModel viewModel, long idUser)
        {
            long result = this._requestService.PostRequest(this._mapper.Map<Requests>(viewModel), idUser);
            return new JsonResult(result);
        }

        /// <summary>
        /// Metodo para obtener los reportes de las solicitudes
        /// </summary>
        /// <param name="filterViewModel">Filtro.</param>
        /// <returns>result.</returns>
        [HttpGet("GetReports")]
        [AllowAnonymous]
        public ActionResult<List<RequestGetViewModel>> GetReports([FromQuery] ReportRequestFilterViewModel filterViewModel)
        {
            filterViewModel.FromDate = Convert.ToDateTime(filterViewModel.From);
            filterViewModel.ToDate = Convert.ToDateTime(filterViewModel.To);
            List<RequestGet> result = this._requestService.GetReportsRequests(this._mapper.Map<ReportRequestFilter>(filterViewModel));
            return new JsonResult(this._mapper.Map<List<RequestGetViewModel>>(result));
        }
    }
}
