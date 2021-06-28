using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

using CentralIT.Domain.Users;

using Microsoft.Extensions.Logging;

namespace CentralIT.Domain.Security {
    public class PasswordConfigurationService : IPasswordConfiguration {

        private const string Salt = "D5XC";
        private readonly ILogger<PasswordConfigurationService> _logger;

        public PasswordConfigurationService(ILogger<PasswordConfigurationService> logger)
        {
            _logger = logger;
        }
        public string GeneratePassword(User userInfo)
        {
            _logger.LogDebug("GeneratePassword", null);
            return string.IsNullOrEmpty(userInfo.Password)
                ? GeneratePasswordValue(userInfo)
                : userInfo.Password;
        }
        private string GeneratePasswordValue(User userInfo)
        {
            string newPassword;
            var randomString = string.Empty;
            var initialName = FirstValueOf(userInfo.FirstName);
            var initialLastname = FirstValueOf(userInfo.FirstLastName);
            var dniNumber = InitialValueOf(userInfo.IdentityCard);
            newPassword = initialName + initialLastname + dniNumber + randomString;
            return newPassword;
        }

        private string FirstValueOf(string value)
        {
            return string.IsNullOrEmpty(value) ? RandomOTP(1) : value.Substring(0, 1);
        }
        private string InitialValueOf(string value)
        {
            return string.IsNullOrEmpty(value) ? RandomOTP(5) : value;
        }
        public string RandomOTP(int length)
        {
            var random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
        public string EncryptPassword(string password)
        {
            _logger.LogDebug("EncryptPassword", null);
            password += Salt;
            return ComputeHash(password);
        }
        private string ComputeHash(string password)
        {
            StringBuilder builder = new StringBuilder();
            using (SHA256 mySha256 = SHA256.Create())
            {
                byte[] bytes = mySha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
            }

            return builder.ToString();
        }
    }
}
