using AutoMapper;
using SalesOrderApi.API.Models;
using SalesOrderApi.Application.Interfaces;

namespace SalesOrderApi.Application.Services;

public class ItemService : IItemService
{
    private readonly IItemRepository _repository;
    private readonly IMapper _mapper;

    public ItemService(IItemRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<List<ItemDto>> GetAllAsync()
    {
        var items = await _repository.GetAllAsync();
        return _mapper.Map<List<ItemDto>>(items);
    }
}
