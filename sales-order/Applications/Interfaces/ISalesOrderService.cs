using SalesOrderApi.API.Models;

namespace SalesOrderApi.Application.Interfaces;

public interface ISalesOrderService
{
    Task<List<SalesOrderListItemDto>> GetAllAsync();
    Task<SalesOrderDetailDto?> GetByIdAsync(string id);
    Task<SalesOrderDetailDto> CreateAsync(SalesOrderInputDto input);
    Task<SalesOrderDetailDto?> UpdateAsync(string id, SalesOrderInputDto input);
}
