using LilyCms.DomainObjects.BaseEntity.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.DomainObjects.RelatedPageInfo
{
    public class PageAreaDto : BaseEntity.BaseEntity
    {
        public string Content { get; set; }
        public ContentType ContentType { get; set; }

        public Guid PageId { get; set; }
    }
}
