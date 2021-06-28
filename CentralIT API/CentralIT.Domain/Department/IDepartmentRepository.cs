using System;
using System.Collections.Generic;
using System.Text;

namespace CentralIT.Domain.Department {
    public interface IDepartmentRepository {

        List<Departments> GetDepartments(DepartmentFilter departmentFilter);

        long PostDepartment(Departments department, long idUser);
    }
}
