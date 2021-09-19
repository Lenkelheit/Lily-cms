using LilyCms.DomainObjects.Sites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.DataAccess.Interfaces
{
    public interface ISiteDao
    {
        Task<IEnumerable<SiteDto>> GetSitesAsync(string userEmail);
        Task<SiteDto> AddOrUpdateSiteAsync(SiteDto siteDto, Guid userId);
        Task DeleteSiteAsync(Guid siteId);
        Task<SiteDetailsDto> GetSiteDetailsAsync(string siteUrl, bool isUserView);
        Task<bool> IsSiteUrlFreeAsync(string siteUrl);
        Task<bool> HasUserAccessToSite(Guid siteId, string userEmail);
        Task<bool> HasUserAccessToSite(string siteUrl, string userEmail);
        Task<bool> HasUserAccessToPage(Guid pageId, string userEmail);
    }
}
