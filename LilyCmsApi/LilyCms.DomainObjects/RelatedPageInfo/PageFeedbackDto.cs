using LilyCms.DomainObjects.BaseEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.DomainObjects.RelatedPageInfo
{
    public class PageFeedbackDto : IAuditable
    {
        public Guid Id { get; set; }
        public bool Vote { get; set; }
        public string UserEmail { get; set; }
        public string Comment { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? ModifiedAt { get; set; }
        public Guid PageId { get; set; }
    }
}
