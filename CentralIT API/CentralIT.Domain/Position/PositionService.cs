using System;
using System.Collections.Generic;
using System.Text;

using CentralIT.Domain.Exceptions;

namespace CentralIT.Domain.Position {
    public class PositionService : IPositionService{

        private readonly IPositionRepository _positionRepository;

        public PositionService(IPositionRepository positionRepository)
        {
            this._positionRepository = positionRepository;
        }

        /// <summary>
        /// Metodo para obtener la lista de cargos
        /// </summary>
        /// <param name="positionFilter"></param>
        /// <returns></returns>
        public List<Positions> GetPositions(PositionFilter positionFilter)
        {
            return _positionRepository.GetPositions(positionFilter);
        }

        /// <summary>
        /// Metodo para guardar y editar los cargos
        /// </summary>
        /// <param name="department"></param>
        /// <returns></returns>
        public long PostPosition(Positions position, long idUser)
        {
            if (position == null)
                throw new ArgumentsNullException();

            var result = _positionRepository.PostPosition(position, idUser);
            return result;
        }

        /// <summary>
        /// Metodo para obtener la lista de cargos po derpartamentos
        /// </summary>
        /// <param name="positionFilter"></param>
        /// <returns></returns>
        public List<Positions> GetPositionDepartment(PositionFilter positionFilter)
        {
            return _positionRepository.GetPositionDepartment(positionFilter);
        }
    }
}
