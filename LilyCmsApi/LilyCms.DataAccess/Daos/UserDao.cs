using AutoMapper;
using LilyCms.DataAccess.Context;
using LilyCms.DataAccess.Interfaces;
using LilyCms.DataAccess.Models;
using LilyCms.DomainObjects.Users;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.DataAccess.Daos
{
    public class UserDao : BaseDao, IUserDao
    {
        public UserDao(LilyCmsDbContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public async Task<UserDto> GetUserAsync(string email)
        {
            var item = await Context.Users.FirstOrDefaultAsync(e => e.Email == email);
            return Mapper.Map<UserDto>(item);
        }

        public async Task<UserDto> AddUserAsync(UserDto userDto)
        {
            var newUser = Mapper.Map<UserDto, User>(userDto);
            await Context.Users.AddAsync(newUser);
            await Context.SaveChangesAsync();

            userDto.Id = newUser.Id;
            return userDto;
        }
    }
}
