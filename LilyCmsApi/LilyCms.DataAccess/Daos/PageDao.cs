using AutoMapper;
using LilyCms.DataAccess.Context;
using LilyCms.DataAccess.Interfaces;
using LilyCms.DataAccess.Models;
using LilyCms.DomainObjects.Pages;
using LilyCms.DomainObjects.RelatedPageInfo;
using Microsoft.EntityFrameworkCore;
using SlugGenerator;
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
            var existsSite = await Context.Sites.AnyAsync(s => s.UrlSlug == siteUrl && s.Enabled);
            if (!existsSite)
            {
                return null;
            }
            var items = await Context.Pages.Where(page => page.Site.UrlSlug == siteUrl && page.Enabled).ToListAsync();
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
                newItem.ModifiedAt = newItem.CreatedAt;
                Context.Pages.Add(newItem);
                await Context.SaveChangesAsync();
                await SetUniquePageUrlSlug(newItem);
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

        public async Task<PageDetailsDto> GetPageDetailsAsync(string siteUrl, string pageUrl, bool isUserView)
        {
            var item = await Context.Pages
                .Include(e => e.PageAreas.Where(e => isUserView ? e.Enabled : true))
                .Where(e => e.UrlSlug == pageUrl && e.Site.UrlSlug == siteUrl)
                .FirstOrDefaultAsync(e => isUserView ? e.Enabled : true);
            return Mapper.Map<PageDetailsDto>(item);
        }

        public async Task<PageDetailsDto> SavePageContentAsync(PageDetailsDto pageDetailsDto)
        {
            var item = await Context.Pages.Include(e => e.PageAreas).FirstOrDefaultAsync(e => e.Id == pageDetailsDto.Id);
            Mapper.Map(pageDetailsDto, item);
            await Context.SaveChangesAsync();

            return Mapper.Map<PageDetailsDto>(item);
        }

        private async Task SetUniquePageUrlSlug(Page page)
        {
            var urlSlug = page.Title.GenerateSlug();
            if (!await IsPageUrlFreeAsync(urlSlug, page.SiteId))
            {
                urlSlug += "-" + page.Id.ToString();
            }
            page.UrlSlug = urlSlug;
            await Context.SaveChangesAsync();
        }

        public async Task<PageDto> GetPageByFeedbackIdAsync(Guid pageFeedbackId)
        {
            var item = await Context.PageFeedbacks.Include(e => e.Page).Where(e => e.Id == pageFeedbackId).Select(e => e.Page).FirstOrDefaultAsync();
            return Mapper.Map<PageDto>(item);
        }

        public async Task<IEnumerable<PageFeedbackDto>> GetPageFeedbacksAsync(Guid pageId)
        {
            var items = await Context.PageFeedbacks.Where(e => e.PageId == pageId).ToListAsync();
            return Mapper.Map<List<PageFeedbackDto>>(items);
        }

        public async Task<PageFeedbackDto> AddOrUpdatePageFeedbackAsync(PageFeedbackDto pageFeedbackDto)
        {
            var item = await Context.PageFeedbacks.FirstOrDefaultAsync(t => t.Id == pageFeedbackDto.Id);
            if (item != null)
            {
                pageFeedbackDto.ModifiedAt = DateTimeOffset.Now;
                Mapper.Map(pageFeedbackDto, item);
                await Context.SaveChangesAsync();
            }
            else
            {
                var newItem = Mapper.Map<PageFeedback>(pageFeedbackDto);
                newItem.CreatedAt = DateTimeOffset.Now;
                newItem.ModifiedAt = newItem.CreatedAt;
                Context.PageFeedbacks.Add(newItem);
                await Context.SaveChangesAsync();
                item = newItem;
            }
            return Mapper.Map<PageFeedbackDto>(item);
        }

        public async Task DeletePageFeedbackAsync(Guid pageFeedbackId)
        {
            var item = await Context.PageFeedbacks.FirstOrDefaultAsync(t => t.Id == pageFeedbackId);
            if (item != null)
            {
                Context.PageFeedbacks.Remove(item);
                await Context.SaveChangesAsync();
            }
        }
    }
}
