using AutoMapper;
using LilyCms.DataAccess.Context;
using LilyCms.DataAccess.Interfaces;
using LilyCms.DataAccess.Models;
using LilyCms.DomainObjects.Sites;
using Microsoft.EntityFrameworkCore;
using SlugGenerator;
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

        public async Task<IEnumerable<SiteDto>> GetSitesAsync(string userEmail)
        {
            var items = await Context.Sites.Where(x => x.User.Email == userEmail).ToListAsync();
            return Mapper.Map<List<SiteDto>>(items);
        }

        public async Task<SiteDto> AddOrUpdateSiteAsync(SiteDto siteDto, Guid userId)
        {
            var item = await Context.Sites.FirstOrDefaultAsync(t => t.Id == siteDto.Id);
            if (item != null)
            {
                siteDto.ModifiedAt = DateTimeOffset.Now;
                Mapper.Map(siteDto, item);
                await Context.SaveChangesAsync();
            }
            else
            {
                var newSite = Mapper.Map<Site>(siteDto);
                newSite.UserId = userId;
                newSite.CreatedAt = DateTimeOffset.Now;
                newSite.ModifiedAt = newSite.CreatedAt;
                Context.Sites.Add(newSite);
                await Context.SaveChangesAsync();
                await SetUniqueSiteUrlSlug(newSite);
                item = newSite;
            }
            return Mapper.Map<SiteDto>(item);
        }

        public async Task DeleteSiteAsync(Guid siteId)
        {
            var item = await Context.Sites.FirstOrDefaultAsync(t => t.Id == siteId);
            if (item != null)
            {
                Context.Sites.Remove(item);
                await Context.SaveChangesAsync();
            }
        }

        public async Task<SiteDetailsDto> GetSiteDetailsAsync(string siteUrl, bool isUserView)
        {
            var item = await Context.Sites
                .Include(e => e.Pages.Where(e => isUserView ? e.Enabled : true))
                .Where(e => e.UrlSlug == siteUrl)
                .FirstOrDefaultAsync(e => isUserView ? e.Enabled : true);
            return Mapper.Map<SiteDetailsDto>(item);
        }

        public async Task<bool> IsSiteUrlFreeAsync(string siteUrl)
        {
            return !(await Context.Sites.AnyAsync(e => e.UrlSlug == siteUrl));
        }

        public async Task<bool> HasUserAccessToSite(Guid siteId, string userEmail)
        {
            return await Context.Sites.AnyAsync(e => e.Id == siteId && e.User.Email == userEmail);
        }

        public async Task<bool> HasUserAccessToSite(string siteUrl, string userEmail)
        {
            return await Context.Sites.AnyAsync(e => e.UrlSlug == siteUrl && e.User.Email == userEmail);
        }

        public async Task<bool> HasUserAccessToPage(Guid pageId, string userEmail)
        {
            return await Context.Pages.AnyAsync(e => e.Id == pageId && e.Site.User.Email == userEmail);
        }

        private async Task SetUniqueSiteUrlSlug(Site site)
        {
            var urlSlug = site.Title.GenerateSlug();
            if (!await IsSiteUrlFreeAsync(urlSlug))
            {
                urlSlug += "-" + site.Id.ToString();
            }
            site.UrlSlug = urlSlug;
            await Context.SaveChangesAsync();
        }
    }
}
