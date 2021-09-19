using LilyCms.DomainObjects.Sites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.BLL.Interfaces
{
    public interface ISiteService
    {
        Task<IEnumerable<SiteDto>> GetSitesAsync(string userEmail);
        Task<SiteDto> AddOrUpdateSiteAsync(SiteDto siteDto, string userEmail);
        Task DeleteSiteAsync(Guid siteId);
        Task<SiteDetailsDto> GetSiteDetailsAsync(string siteUrl, bool isUserView);
        Task<bool> IsSiteUrlFreeAsync(string siteUrl);
    }
}
