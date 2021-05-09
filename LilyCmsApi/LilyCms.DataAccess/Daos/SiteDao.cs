using AutoMapper;
using LilyCms.DataAccess.Context;
using LilyCms.DataAccess.Interfaces;
using LilyCms.DomainObjects.Sites;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.DataAccess.Daos
{
    public class SiteDao : BaseDao, ISiteDao
    {
        public SiteDao(LilyCmsDbContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public async Task<IEnumerable<SiteDto>> GetSitesAsync()
        {
            var items = await Context.Sites.ToListAsync();
            return Mapper.Map<List<SiteDto>>(items);
        }
    }
}
