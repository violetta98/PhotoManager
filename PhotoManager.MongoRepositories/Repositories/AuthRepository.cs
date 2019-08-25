using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using PhotoManager.MongoRepositories.Models;
using PhotoManager.MongoRepositories.Options;

namespace PhotoManager.MongoRepositories.Repositories
{
    public class AuthRepository
    {
        private readonly PhotoManagerContext _context;
        private readonly AuthOptions _authOptions;

        public AuthRepository(PhotoManagerContext context, AuthOptions authOptions)
        {
            _context = context;
            _authOptions = authOptions;
        }

        public async Task<UserModel> GetUserAsync(string email, string password)
        {
            return await _context.Users
                .Find(x => x.Email == email && x.HashPassword == HashPassword(password))
                .FirstOrDefaultAsync();
        }

        public async Task<bool> AddUserAsync(SignUpModel signUpModel)
        {
            if (await UserExistsAsync(signUpModel.Email))
            {
                return false;
            }

            var user = new UserModel
            {
                Email = signUpModel.Email,
                HashPassword = HashPassword(signUpModel.Password)
            };

            await _context.Users.InsertOneAsync(user);
            return true;
        }

        private string HashPassword(string password)
        {
            using (var md5 = MD5.Create())
            {
                var inputBytes = Encoding.ASCII.GetBytes(password);
                var hashBytes = md5.ComputeHash(inputBytes);
                var hashPassword = new StringBuilder();

                foreach (var hashByte in hashBytes)
                {
                    hashPassword.Append(hashByte.ToString("X2"));
                }

                return hashPassword.ToString();
            }
        }

        private async Task<bool> UserExistsAsync(string email)
        {
            var user = await _context.Users
                .Find(x => x.Email == email)
                .FirstOrDefaultAsync();

            return user != null;
        }

        public string GenerateToken(UserModel user)
        {
            var identity = GetIdentity(user);
            var now = DateTime.UtcNow;

            var jwt = new JwtSecurityToken(
                issuer: _authOptions.Issuer,
                audience: _authOptions.Audience,
                notBefore: now,
                claims: identity.Claims,
                expires: now.Add(TimeSpan.FromMinutes(_authOptions.Lifetime)),
                signingCredentials: new SigningCredentials(_authOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
                );

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        private ClaimsIdentity GetIdentity(UserModel user)
        {
            var claims = new List<Claim>
            {
                new Claim("userId", user.UserId),
                new Claim("email", user.Email)
            };

            var claimsIdentity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);

            return claimsIdentity;
        }
    }
}
