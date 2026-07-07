using SalesOrderApi.API.Models;

namespace SalesOrderApi.Application.Interfaces;

public interface IClientService
{
    Task<List<ClientListItemDto>> GetAllAsync();
    Task<ClientDetailDto?> GetByIdAsync(string id);
}
