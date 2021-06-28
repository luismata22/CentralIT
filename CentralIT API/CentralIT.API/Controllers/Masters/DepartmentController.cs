using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using AutoMapper;

using CentralIT.API.ViewModels.Masters;
using CentralIT.API.ViewModels.Masters.Filters;
using CentralIT.Domain.Department;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CentralIT.API.Controllers.Masters {

    [Route("[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase {

        private readonly IMapper _mapper;
        private readonly IDepartmentService _departmentService;

        public DepartmentController(IMapper mapper, IDepartmentService departmentService)
        {
            this._mapper = mapper;
            this._departmentService = departmentService;
        }

        /// <summary>
        /// Metodo para obtener la lista de departamentos.
        /// </summary>
        /// <param name="filterViewModel">Filtro.</param>
        /// <returns>result.</returns>
        [HttpGet]
        [AllowAnonymous]
        public ActionResult<List<DepartmentViewModel>> Get([FromQuery] DepartmentFilterViewModel filterViewModel)
        {
            List<Departments> result = this._departmentService.GetDepartments(this._mapper.Map<DepartmentFilter>(filterViewModel));
            return new JsonResult(this._mapper.Map<List<DepartmentViewModel>>(result));
        }

        /// <summary>
        /// Metodo para guardar y editar los departamentos
        /// </summary>
        /// <param name="viewModel"> variable a agregar. </param>
        /// <param name="idUser"> parametro de idusuario. </param>
        /// <returns>Json con valor entero.</returns>
        [HttpPost("{idUser}")]
        [AllowAnonymous]
        public ActionResult<long> Post([FromBody] DepartmentViewModel viewModel, long idUser)
        {
            long result = this._departmentService.PostDepartment(this._mapper.Map<Departments>(viewModel), idUser);
            return new JsonResult(result);
        }
    }
}
