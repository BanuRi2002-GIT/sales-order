using SalesOrderApi.Domain.Entities;

namespace SalesOrderApi.Application.Interfaces;

public interface IItemRepository
{
    Task<List<Item>> GetAllAsync();
    Task<Item?> GetByCodeAsync(string itemCode);
}
