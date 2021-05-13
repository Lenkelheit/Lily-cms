using AutoMapper;
using LilyCms.DataAccess.Context;
using LilyCms.DataAccess.Interfaces;
using LilyCms.DataAccess.Models;
using LilyCms.DomainObjects.Pages;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.DataAccess.Daos
{
    public class PageDao : BaseDao, IPageDao
    {
        public PageDao(LilyCmsDbContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public async Task<IEnumerable<PageDto>> GetPagesAsync(string siteUrl)
        {
            var existsSite = await Context.Sites.AnyAsync(s => s.UrlSlug == siteUrl);
            if (!existsSite)
            {
                return null;
            }
            var items = await Context.Pages.Where(page => page.Site.UrlSlug == siteUrl).ToListAsync();
            return Mapper.Map<List<PageDto>>(items);
        }

        public async Task<PageDto> AddOrUpdatePageAsync(PageDto pageDto)
        {
            var item = await Context.Pages.FirstOrDefaultAsync(t => t.Id == pageDto.Id);
            if (item != null)
            {
                pageDto.ModifiedAt = DateTimeOffset.Now;
                Mapper.Map(pageDto, item);
                await Context.SaveChangesAsync();
            }
            else
            {
                var newItem = Mapper.Map<Page>(pageDto);
                newItem.CreatedAt = DateTimeOffset.Now;
                Context.Pages.Add(newItem);
                await Context.SaveChangesAsync();
                item = newItem;
            }
            return Mapper.Map<PageDto>(item);
        }

        public async Task DeletePageAsync(Guid pageId)
        {
            var item = await Context.Pages.FirstOrDefaultAsync(t => t.Id == pageId);
            if (item != null)
            {
                Context.Pages.Remove(item);
                await Context.SaveChangesAsync();
            }
        }

        public async Task<bool> IsPageUrlFreeAsync(string pageUrl, Guid siteId)
        {
            return !(await Context.Pages.AnyAsync(e => e.UrlSlug == pageUrl && e.SiteId == siteId));
        }

    }
}
