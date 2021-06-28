using System;
using System.Collections.Generic;
using System.Text;

namespace CentralIT.Domain.Position {
    public interface IPositionService {

        List<Positions> GetPositions(PositionFilter positionFilter);

        long PostPosition(Positions position, long idUser);

        List<Positions> GetPositionDepartment(PositionFilter positionFilter);
    }
}
