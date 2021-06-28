using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AutoMapper;

using CentralIT.API.ViewModels.Masters;
using CentralIT.API.ViewModels.Masters.Filters;
using CentralIT.Domain.Common;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CentralIT.API.Controllers.Masters {

    [Route("[controller]")]
    [ApiController]
    public class CommonController : ControllerBase {

        private readonly IMapper _mapper;
        private readonly ICommonService _commonService;

        public CommonController(IMapper mapper, ICommonService commonService)
        {
            this._mapper = mapper;
            this._commonService = commonService;
        }

        /// <summary>
        /// Metodo para obtener la lista de estatus.
        /// </summary>
        /// <param name="filterViewModel">Filtro.</param>
        /// <returns>result.</returns>
        [HttpGet("Status")]
        [AllowAnonymous]
        public ActionResult<List<StatusViewModel>> Get([FromQuery] StatusFilterViewModel filterViewModel)
        {
            List<Status> result = this._commonService.GetStatues(this._mapper.Map<StatusFilter>(filterViewModel));
            return new JsonResult(this._mapper.Map<List<StatusViewModel>>(result));
        }

        /// <summary>
        /// Metodo para obtener la lista de prioridades.
        /// </summary>
        /// <param name="filterViewModel">Filtro.</param>
        /// <returns>result.</returns>
        [HttpGet("Priority")]
        [AllowAnonymous]
        public ActionResult<List<PriorityViewModel>> GetPriorities([FromQuery] PriorityFilterViewModel filterViewModel)
        {
            List<Priority> result = this._commonService.GetPriorities(this._mapper.Map<PriorityFilter>(filterViewModel));
            return new JsonResult(this._mapper.Map<List<PriorityViewModel>>(result));
        }

        /// <summary>
        /// Metodo para obtener la lista de tipos de soliitudes.
        /// </summary>
        /// <param name="filterViewModel">Filtro.</param>
        /// <returns>result.</returns>
        [HttpGet("RequestType")]
        [AllowAnonymous]
        public ActionResult<List<RequestTypeViewModel>> GetRequestTypes([FromQuery] RequestTypeFilterViewModel filterViewModel)
        {
            List<RequestType> result = this._commonService.GetRequestTypes(this._mapper.Map<RequestTypeFilter>(filterViewModel));
            return new JsonResult(this._mapper.Map<List<RequestTypeViewModel>>(result));
        }
    }
}
