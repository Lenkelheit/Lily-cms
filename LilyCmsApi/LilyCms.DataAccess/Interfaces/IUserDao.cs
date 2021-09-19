using LilyCms.DomainObjects.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.DataAccess.Interfaces
{
    public interface IUserDao
    {
        Task<UserDto> GetUserAsync(string email);
        Task<UserDto> AddUserAsync(UserDto userDto);
    }
}
