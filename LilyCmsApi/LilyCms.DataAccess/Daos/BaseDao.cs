using AutoMapper;
using LilyCms.DataAccess.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.DataAccess.Daos
{
    public abstract class BaseDao
    {
        protected LilyCmsDbContext Context { get; set; }
        protected IMapper Mapper { get; set; }

        public BaseDao(LilyCmsDbContext context, IMapper mapper)
        {
            Context = context;
            Mapper = mapper;
        }
    }
}