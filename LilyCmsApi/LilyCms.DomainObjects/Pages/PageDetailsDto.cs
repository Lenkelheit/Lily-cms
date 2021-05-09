using LilyCms.DomainObjects.BaseEntity;
using LilyCms.DomainObjects.PageAreas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.DomainObjects.Pages
{
    public class PageDetailsDto : BaseEntity.BaseEntity, ISearchable
    {
        public string UrlSlug { get; set; }
        public Guid SiteId { get; set; }

        public ICollection<PageAreaDto> PageAreas { get; set; } = new List<PageAreaDto>();
    }
}
