using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

using AutoMapper;

using CentralIT.API.ViewModels.Masters;
using CentralIT.API.ViewModels.Masters.Filters;
using CentralIT.API.ViewModels.Security;
using CentralIT.API.ViewModels.Security.Filters;
using CentralIT.Domain.Users;
using CentralIT.Domain.Users.Roles;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

using static System.Net.Mime.MediaTypeNames;

namespace CentralIT.API.Controllers.Security {

    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase {

        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private IHostingEnvironment _hostingEnvironment;
        public IConfiguration Configuration { get; }

        public UserController(IMapper mapper, IUserService userService, IHostingEnvironment hostingEnvironment, IConfiguration configuration)
        {
            this._mapper = mapper;
            this._userService = userService;
            this._hostingEnvironment = hostingEnvironment;
            this.Configuration = configuration;
        }

        /// <summary>
        /// Metodo para obtener la lista de usuarios.
        /// </summary>
        /// <param name="filterViewModel">Filtro.</param>
        /// <returns>result.</returns>
        [HttpGet]
        [AllowAnonymous]
        public ActionResult<List<UserViewModel>> Get([FromQuery] UserFilterViewModel filterViewModel)
        {
            List<User> result = this._userService.GetUsers(this._mapper.Map<UserFilter>(filterViewModel));
            return new JsonResult(this._mapper.Map<List<UserViewModel>>(result));
        }

        /// <summary>
        /// Metodo para guardar y editar los usuarios
        /// </summary>
        /// <param name="viewModel"> variable a agregar. </param>
        /// <param name="idUser"> parametro de idusuario. </param>
        /// <returns>Json con valor entero.</returns>
        [HttpPost("{idUser}")]
        [AllowAnonymous]
        public ActionResult<long> Post([FromBody] UserViewModel viewModel, long idUser)
        {
            long result = this._userService.PostUser(this._mapper.Map<User>(viewModel), idUser);
            return new JsonResult(result);
        }

        /// <summary>
        /// Metodo para obtener la lista de tipos de documentos.
        /// </summary>
        /// <param name="filterViewModel">Filtro.</param>
        /// <returns>result.</returns>
        [HttpGet("GetDocumentType")]
        [AllowAnonymous]
        public ActionResult<List<DocumentTypeViewModel>> GetDocumentType([FromQuery] DocumentTypeFilterViewModel filterViewModel)
        {
            List<DocumentType> result = this._userService.GetDocumentTypes(this._mapper.Map<DocumentTypeFilter>(filterViewModel));
            return new JsonResult(this._mapper.Map<List<DocumentTypeViewModel>>(result));
        }

        /// <summary>
        /// Metodo para obtener la lista de roles.
        /// </summary>
        /// <param name="filterViewModel">Filtro.</param>
        /// <returns>result.</returns>
        [HttpGet("GetRoles")]
        [AllowAnonymous]
        public ActionResult<List<RoleViewModel>> GetRoles([FromQuery] RoleFilterViewModel filterViewModel)
        {
            List<Role> result = this._userService.GetRoles(this._mapper.Map<RoleFilter>(filterViewModel));
            return new JsonResult(this._mapper.Map<List<RoleViewModel>>(result));
        }

        /// <summary>
        /// Metodo para guardar y editar los roles por usuarios
        /// </summary>
        /// <param name="viewModel"> variable a agregar. </param>
        /// <param name="idUser"> parametro de idusuario. </param>
        /// <returns>Json con valor entero.</returns>
        [HttpPost("PostRoleUser/{idUser}")]
        [AllowAnonymous]
        public ActionResult<long> PostRoleUser([FromBody] UserViewModel viewModel, long idUser)
        {
            long result = this._userService.PostRoleUser(this._mapper.Map<User>(viewModel), idUser);
            return new JsonResult(result);
        }

        /// <summary>
        /// Metodo para cambiar la contrasena de usuario
        /// </summary>
        /// <param name="viewModel"> variable a agregar. </param>
        /// <param name="idUser"> parametro de idusuario. </param>
        /// <returns>Json con valor entero.</returns>
        [HttpPost("PostNewPassword/{idUser}")]
        [AllowAnonymous]
        public ActionResult<long> PostNewPassword([FromBody] UserViewModel viewModel, long idUser)
        {
            long result = this._userService.PostNewPassword(this._mapper.Map<User>(viewModel), idUser);
            return new JsonResult(result);
        }

        /// <summary>
        /// Metodo para cambiar la contrasena de usuario desde el perfil
        /// </summary>
        /// <param name="viewModel"> variable a agregar. </param>
        /// <param name="idUser"> parametro de idusuario. </param>
        /// <returns>Json con valor entero.</returns>
        [HttpPost("PostNewPasswordUser/{idUser}")]
        [AllowAnonymous]
        public ActionResult<long> PostNewPasswordUser([FromBody] UserNewPasswordViewModel viewModel, long idUser)
        {
            long result = this._userService.PostNewPasswordUser(this._mapper.Map<UserNewPassword>(viewModel), idUser);
            return new JsonResult(result);
        }

        /// <summary>
        /// Metodo para cambiar la contrasena de usuario desde el perfil
        /// </summary>
        /// <param name="formFile"> variable a agregar. </param>
        /// <param name="idUser"> parametro de idusuario. </param>
        /// <returns>Json con valor entero.</returns>
        //[Produces("multipart/form-data")]
        [HttpPost("PostImageUpload/{id}")]
        [DisableRequestSizeLimit]
        [AllowAnonymous]
        public ActionResult PostImageUpload([FromBody] ProfileViewModel Image1, int id)
        {
            try
            {
                var arraybase = Image1.Image.Split(",");
                string folderName = Configuration.GetSection("RutaArchivos")["ImagenesPerfiles"];
                //string folder = Path.Combine("Profile", folderName);
                //if (!Directory.Exists(folder))
                //{
                    Directory.CreateDirectory(folderName);
                //}
                if (!System.IO.File.Exists(folderName))
                {
                    string filePath = folderName + "\\user" + id.ToString() + ".jpg";
                    if (System.IO.File.Exists(filePath))
                    {
                        try
                        {
                            System.IO.File.Delete(filePath);
                        }
                        catch (System.IO.IOException e)
                        {
                            throw e;
                        }
                    }
                    System.IO.File.WriteAllBytes(filePath, Convert.FromBase64String(arraybase[1]));
                }
                
                return Ok();
            }
            catch (System.Exception ex)
            {
                return Ok();
            }
        }
        [HttpGet("GetImageProfile/{id}")]
        [AllowAnonymous]
        public ProfileViewModel GetBackGround(int id)
        {
            //string PathBaseImagesFondoTeamWork = _configuration.GetSection("RutaArchivos")["ImagenesPerfil:ImagenFondoPerfil"];
            var imagereturn = new ProfileViewModel();
            byte[] image = null;
            string folderName = Configuration.GetSection("RutaArchivos")["ImagenesPerfiles"] + "\\user" + id.ToString() + ".jpg";

            if (System.IO.File.Exists(folderName))
            {
                image = System.IO.File.ReadAllBytes(folderName);
                if (image != null)
                {
                    image = System.IO.File.ReadAllBytes(folderName);
                    imagereturn.Image = "data:image/jpg;base64," + Convert.ToBase64String(image);
                }
                return imagereturn;

            }
            else
            {
                folderName = Configuration.GetSection("RutaArchivos")["ImagenesPerfiles"] + "\\noimage.jpg";
                if (System.IO.File.Exists(folderName))
                {
                    image = System.IO.File.ReadAllBytes(folderName);
                    if (image != null)
                    {
                        image = System.IO.File.ReadAllBytes(folderName);
                        imagereturn.Image = "data:image/jpg;base64," + Convert.ToBase64String(image);
                    }
                    return imagereturn;
                }
                return new ProfileViewModel();
            }
        }
    }
}
