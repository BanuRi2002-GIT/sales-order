using SalesOrderApi.API.Models;

namespace SalesOrderApi.Application.Interfaces;

public interface IItemService
{
    Task<List<ItemDto>> GetAllAsync();
}
