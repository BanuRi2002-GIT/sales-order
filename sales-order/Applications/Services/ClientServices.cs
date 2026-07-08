using AutoMapper;
using SalesOrderApi.API.Models;
using SalesOrderApi.Application.Interfaces;

namespace SalesOrderApi.Application.Services;

public class ClientService : IClientService
{
    private readonly IClientRepository _repository;
    private readonly IMapper _mapper;

    public ClientService(IClientRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<List<ClientListItemDto>> GetAllAsync()
    {
        var clients = await _repository.GetAllAsync();
        return _mapper.Map<List<ClientListItemDto>>(clients);
    }

    public async Task<ClientDetailDto?> GetByIdAsync(string id)
    {
        var client = await _repository.GetByIdAsync(id);
        return client is null ? null : _mapper.Map<ClientDetailDto>(client);
    }
}
