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
        Task<IEnumerable<SiteDto>> GetSitesAsync();
        Task<SiteDto> AddOrUpdateSiteAsync(SiteDto siteDto);
        Task DeleteSiteAsync(Guid siteId);
        Task<SiteDetailsDto> GetSiteDetailsAsync(string siteUrl);
        Task<bool> IsSiteUrlFreeAsync(string siteUrl);
    }
}
