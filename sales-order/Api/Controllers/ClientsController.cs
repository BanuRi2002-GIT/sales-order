using Microsoft.AspNetCore.Mvc;
using SalesOrderApi.Application.Interfaces;

namespace SalesOrderApi.API.Controllers;

[ApiController]
[Route("api/clients")]
public class ClientsController : ControllerBase
{
    private readonly IClientService _clientService;

    public ClientsController(IClientService clientService)
    {
        _clientService = clientService;
    }

    // GET /api/clients — customer names for the Screen 1 dropdown
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var clients = await _clientService.GetAllAsync();
        return Ok(clients);
    }

    // GET /api/clients/{id} — full address details for auto-fill
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        var client = await _clientService.GetByIdAsync(id);
        if (client is null) return NotFound(new { message = $"Client '{id}' not found." });
        return Ok(client);
    }
}
