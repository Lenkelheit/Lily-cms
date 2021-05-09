using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.DomainObjects.BaseEntity
{
    public interface IBaseEntity : IAuditable
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Enabled { get; set; }
    }
}
