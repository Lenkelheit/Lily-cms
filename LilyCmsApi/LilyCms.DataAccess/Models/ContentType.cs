using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.DataAccess.Models
{
    public class ContentType
    {
        public Enums.ContentType Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
