using AutoMapper;
using LilyCms.DataAccess.Context;
using LilyCms.DataAccess.Interfaces;
using LilyCms.DataAccess.Models;
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

        public async Task<SiteDto> AddSiteAsync(SiteDto siteDto)
        {
            var newSite = Mapper.Map<Site>(siteDto);
            newSite.CreatedAt = DateTimeOffset.Now;
            Context.Sites.Add(newSite);
            await Context.SaveChangesAsync();
            return Mapper.Map<SiteDto>(newSite);
        }
        
    }
}
