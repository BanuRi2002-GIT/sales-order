namespace SalesOrderApi.API.Models;

// Lightweight shape for the customer dropdown list (GET /api/clients)
public class ClientListItemDto
{
    public string CustomerId { get; set; } = null!;
    public string Name { get; set; } = null!;
}

// Full shape for auto-filling address fields (GET /api/clients/{id})
public class ClientDetailDto
{
    public string CustomerId { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string Address1 { get; set; } = "";
    public string Address2 { get; set; } = "";
    public string Address3 { get; set; } = "";
    public string City { get; set; } = "";
    public string State { get; set; } = "";
    public string PostCode { get; set; } = "";
}
