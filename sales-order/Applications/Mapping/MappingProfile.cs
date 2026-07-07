using AutoMapper;
using SalesOrderApi.API.Models;
using SalesOrderApi.Domain.Entities;

namespace SalesOrderApi.Application.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Client
        CreateMap<Client, ClientListItemDto>();
        CreateMap<Client, ClientDetailDto>();

        // Item
        CreateMap<Item, ItemDto>();

        // SalesOrderLine -> output DTO (entity already holds computed amounts)
        CreateMap<SalesOrderLine, SalesOrderLineDto>();

        // SalesOrder -> grid row DTO
        CreateMap<SalesOrder, SalesOrderListItemDto>()
            .ForMember(dest => dest.ItemCount, opt => opt.MapFrom(src => src.Lines.Count));

        // SalesOrder -> detail DTO (for edit screen)
        CreateMap<SalesOrder, SalesOrderDetailDto>();
    }
}
