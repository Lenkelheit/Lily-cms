using LilyCms.DomainObjects.BaseEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.DataAccess.Models
{
    public class PageFeedback : IAuditable
    {
        public Guid Id { get; set; }
        public bool Vote { get; set; }
        public string UserEmail { get; set; }
        public string Comment { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? ModifiedAt { get; set; }
        public Guid PageId { get; set; }

        public Page Page { get; set; }
    }
}
