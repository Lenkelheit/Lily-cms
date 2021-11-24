using Google.Apis.Auth;
using LilyCms.BLL.Interfaces;
using LilyCms.DataAccess.Interfaces;
using LilyCms.DomainObjects.Auth;
using LilyCms.DomainObjects.Users;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.BLL.Services
{
    public class AuthService : IAuthService
    {
        private readonly AuthGoogleConfig _authGoogleConfig;
        private readonly IUserDao _userDao;

        public AuthService(IOptions<AuthGoogleConfig> authGoogleConfig, IUserDao userDao)
        {
            _authGoogleConfig = authGoogleConfig.Value;
            _userDao = userDao;
        }

        public async Task<AuthResult> AuthenticateGoogleAsync(AuthRequest authRequest)
        {
            var payload = await VerifyGoogleToken(authRequest);
            var user = await _userDao.GetUserAsync(payload.Email);
            if (user == null)
            {
                user = new UserDto
                {
                    FirstName = payload.GivenName,
                    LastName = payload.FamilyName,
                    Email = payload.Email, 
                    Provider = authRequest.Provider
                };
                user = await _userDao.AddUserAsync(user);
            }

            var token = GenerateJwtToken(user);
            return new AuthResult { Token = token };
        }

        private async Task<GoogleJsonWebSignature.Payload> VerifyGoogleToken(AuthRequest authRequest)
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings()
            {
                Audience = new List<string>() { _authGoogleConfig.ClientId }
            };
            return await GoogleJsonWebSignature.ValidateAsync(authRequest.IdToken, settings);
        }

        private string GenerateJwtToken(UserDto user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_authGoogleConfig.JwtSecretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
