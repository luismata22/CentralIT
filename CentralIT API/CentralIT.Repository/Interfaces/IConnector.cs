using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;

using CentralIT.Repository.Dao.common;

using Newtonsoft.Json.Linq;

namespace CentralIT.Repository.Interfaces {
    public interface IConnector {

        Task<DataTable> ExecuteQueryForDataTable(string query, List<SqlParameter> sqlParameters = null, bool isStoreProcedure = false);

        Task<bool> ExecuteNonQueryTask(string query, List<SqlParameter> sqlParameters = null, bool isStoreProcedure = false);

        bool ExecuteNonQuery(string query, List<SqlParameter> sqlParameters = null, bool isStoreProcedure = false);

        long ExecuteScalar(string query, SqlTransaction transaction, List<SqlParameter> sqlParameters = null, bool isStoreProcedure = false);

        DatabaseResult ExecuteWithJsonInput(string query, object input, List<SqlParameter> sqlParameters = null);
        DataSet CreateDs(string tableName, string spName, List<SqlParameter> parameters);

        SqlTransaction BeginSqlTransaction();

        void CloseConnection();

        string GetJson(string spName, List<SqlParameter> parameters);

        string GetJson(string spName, JObject jsonParams);
    }
}
