using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AutoMapper;

using CentralIT.API.ViewModels.Masters;
using CentralIT.API.ViewModels.Masters.Filters;
using CentralIT.Domain.Position;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CentralIT.API.Controllers.Masters {

    [Route("[controller]")]
    [ApiController]
    public class PositionController : ControllerBase {

        private readonly IMapper _mapper;
        private readonly IPositionService _positionService;

        public PositionController(IMapper mapper, IPositionService positionService)
        {
            this._mapper = mapper;
            this._positionService = positionService;
        }
        /// <summary>
        /// Metodo para obtener la lista de cargos.
        /// </summary>
        /// <param name="filterViewModel">Filtro.</param>
        /// <returns>result.</returns>
        [HttpGet]
        [AllowAnonymous]
        public ActionResult<List<PositionViewModel>> Get([FromQuery] PositionFilterViewModel filterViewModel)
        {
            List<Positions> result = this._positionService.GetPositions(this._mapper.Map<PositionFilter>(filterViewModel));
            return new JsonResult(this._mapper.Map<List<PositionViewModel>>(result));
        }

        /// <summary>
        /// Metodo para guardar y editar los cargos
        /// </summary>
        /// <param name="viewModel"> variable a agregar. </param>
        /// <param name="idUser"> parametro de idusuario. </param>
        /// <returns>Json con valor entero.</returns>
        [HttpPost("{idUser}")]
        [AllowAnonymous]
        public ActionResult<long> Post([FromBody] PositionViewModel viewModel, long idUser)
        {
            long result = this._positionService.PostPosition(this._mapper.Map<Positions>(viewModel), idUser);
            return new JsonResult(result);
        }

        /// <summary>
        /// Metodo para obtener la lista de cargos por departamentos.
        /// </summary>
        /// <param name="filterViewModel">Filtro.</param>
        /// <returns>result.</returns>
        [HttpGet("PositionDepartment")]
        [AllowAnonymous]
        public ActionResult<List<PositionViewModel>> GetPositionDepartment([FromQuery] PositionFilterViewModel filterViewModel)
        {
            List<Positions> result = this._positionService.GetPositionDepartment(this._mapper.Map<PositionFilter>(filterViewModel));
            return new JsonResult(this._mapper.Map<List<PositionViewModel>>(result));
        }
    }
}
