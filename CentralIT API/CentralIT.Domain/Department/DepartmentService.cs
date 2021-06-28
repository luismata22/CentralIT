using System;
using System.Collections.Generic;
using System.Text;

using CentralIT.Domain.Exceptions;

namespace CentralIT.Domain.Department {
    public class DepartmentService : IDepartmentService{

        private readonly IDepartmentRepository _departmentRepository;

        public DepartmentService(IDepartmentRepository departmentRepository)
        {
            this._departmentRepository = departmentRepository;
        }

        /// <summary>
        /// Metodo para obtener la lista de departamentos
        /// </summary>
        /// <param name="departmentFilter"></param>
        /// <returns></returns>
        public List<Departments> GetDepartments(DepartmentFilter departmentFilter)
        {
            return _departmentRepository.GetDepartments(departmentFilter);
        }

        /// <summary>
        /// Metodo para guardar y editar los departamentos
        /// </summary>
        /// <param name="department"></param>
        /// <returns></returns>
        public long PostDepartment(Departments department, long idUser)
        {
            if (department == null)
                throw new ArgumentsNullException();

            var result = _departmentRepository.PostDepartment(department, idUser);
            return result;
        }
    }
}
