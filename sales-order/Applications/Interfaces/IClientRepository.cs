using SalesOrderApi.Domain.Entities;

namespace SalesOrderApi.Application.Interfaces;

public interface IClientRepository
{
    Task<List<Client>> GetAllAsync();
    Task<Client?> GetByIdAsync(string id);
}
