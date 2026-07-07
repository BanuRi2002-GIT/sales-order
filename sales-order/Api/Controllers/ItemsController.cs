using Microsoft.AspNetCore.Mvc;
using SalesOrderApi.Application.Interfaces;

namespace SalesOrderApi.API.Controllers;

[ApiController]
[Route("api/items")]
public class ItemsController : ControllerBase
{
    private readonly IItemService _itemService;

    public ItemsController(IItemService itemService)
    {
        _itemService = itemService;
    }

    // GET /api/items — item code + description + price for the line-item dropdowns
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _itemService.GetAllAsync();
        return Ok(items);
    }
}
