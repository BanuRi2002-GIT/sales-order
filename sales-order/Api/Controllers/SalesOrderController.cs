using Microsoft.AspNetCore.Mvc;
using SalesOrderApi.API.Models;
using SalesOrderApi.Application.Interfaces;

namespace SalesOrderApi.API.Controllers;

[ApiController]
[Route("api/salesorders")]
public class SalesOrdersController : ControllerBase
{
    private readonly ISalesOrderService _salesOrderService;

    public SalesOrdersController(ISalesOrderService salesOrderService)
    {
        _salesOrderService = salesOrderService;
    }

    // GET /api/salesorders — Screen 2 grid
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var orders = await _salesOrderService.GetAllAsync();
        return Ok(orders);
    }

    // GET /api/salesorders/{id} — full order with lines, for the edit screen
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        var order = await _salesOrderService.GetByIdAsync(id);
        if (order is null) return NotFound(new { message = $"Sales order '{id}' not found." });
        return Ok(order);
    }

    // POST /api/salesorders — create a new order (with lines)
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] SalesOrderInputDto input)
    {
        if (input.Lines is null || input.Lines.Count == 0)
            return BadRequest(new { message = "An order must have at least one line item." });

        var created = await _salesOrderService.CreateAsync(input);
        return CreatedAtAction(nameof(GetById), new { id = created.OrderId }, created);
    }

    // PUT /api/salesorders/{id} — update/save an edited order
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, [FromBody] SalesOrderInputDto input)
    {
        if (input.Lines is null || input.Lines.Count == 0)
            return BadRequest(new { message = "An order must have at least one line item." });

        var updated = await _salesOrderService.UpdateAsync(id, input);
        if (updated is null) return NotFound(new { message = $"Sales order '{id}' not found." });
        return Ok(updated);
    }
}
