using SalesOrderApi.Domain.Entities;

namespace SalesOrderApi.Application.Interfaces;

public interface ISalesOrderRepository
{
    Task<List<SalesOrder>> GetAllAsync();
    Task<SalesOrder?> GetByIdAsync(string id);
    Task CreateAsync(SalesOrder order);
    Task<bool> UpdateAsync(string id, SalesOrder order);
}
