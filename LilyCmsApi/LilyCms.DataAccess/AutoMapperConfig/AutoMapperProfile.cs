using AutoMapper;
using LilyCms.DataAccess.Models;
using LilyCms.DomainObjects.PageAreas;
using LilyCms.DomainObjects.Pages;
using LilyCms.DomainObjects.Sites;
using LilyCms.DomainObjects.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LilyCms.DataAccess.AutoMapperConfig
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UserDto, User>().ReverseMap();

            CreateMap<SiteDto, Site>().ReverseMap();
            CreateMap<SiteDetailsDto, Site>().ReverseMap();

            CreateMap<PageDto, Page>().ReverseMap();
            CreateMap<PageDetailsDto, Page>().ReverseMap();

            CreateMap<PageAreaDto, PageArea>().ReverseMap();
        }
    }
}
