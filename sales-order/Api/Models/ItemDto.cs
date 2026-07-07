namespace SalesOrderApi.API.Models;

public class ItemDto
{
    public string ItemCode { get; set; } = null!;
    public string Description { get; set; } = null!;
    public decimal Price { get; set; }
}
