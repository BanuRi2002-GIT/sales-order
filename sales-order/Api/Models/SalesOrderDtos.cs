namespace SalesOrderApi.API.Models;

// What the frontend sends per line — the backend recalculates Excl/Tax/Incl itself,
// so it never trusts client-supplied totals.
public class SalesOrderLineInputDto
{
    public string ItemCode { get; set; } = null!;
    public string Description { get; set; } = "";
    public string Note { get; set; } = "";
    public decimal Quantity { get; set; }
    public decimal Price { get; set; }
    public decimal TaxRate { get; set; }
}

// What the API returns per line — includes the computed amounts.
public class SalesOrderLineDto
{
    public string LineId { get; set; } = null!;
    public string ItemCode { get; set; } = null!;
    public string Description { get; set; } = "";
    public string Note { get; set; } = "";
    public decimal Quantity { get; set; }
    public decimal Price { get; set; }
    public decimal TaxRate { get; set; }
    public decimal ExclAmount { get; set; }
    public decimal TaxAmount { get; set; }
    public decimal InclAmount { get; set; }
}

// Payload for POST /api/salesorders and PUT /api/salesorders/{id}
public class SalesOrderInputDto
{
    public string CustomerId { get; set; } = null!;
    public string CustomerName { get; set; } = "";
    public string Address1 { get; set; } = "";
    public string Address2 { get; set; } = "";
    public string Address3 { get; set; } = "";
    public string City { get; set; } = "";
    public string State { get; set; } = "";
    public string PostCode { get; set; } = "";
    public string InvoiceNo { get; set; } = null!;
    public DateTime InvoiceDate { get; set; }
    public string ReferenceNo { get; set; } = "";
    public List<SalesOrderLineInputDto> Lines { get; set; } = new();
}

// Row shape for the Screen 2 grid — GET /api/salesorders
public class SalesOrderListItemDto
{
    public string OrderId { get; set; } = null!;
    public string InvoiceNo { get; set; } = null!;
    public string CustomerName { get; set; } = "";
    public DateTime InvoiceDate { get; set; }
    public string ReferenceNo { get; set; } = "";
    public decimal TotalExcl { get; set; }
    public decimal TotalTax { get; set; }
    public decimal TotalIncl { get; set; }
    public int ItemCount { get; set; }
}

// Full shape for editing — GET /api/salesorders/{id}
public class SalesOrderDetailDto
{
    public string OrderId { get; set; } = null!;
    public string CustomerId { get; set; } = null!;
    public string CustomerName { get; set; } = "";
    public string Address1 { get; set; } = "";
    public string Address2 { get; set; } = "";
    public string Address3 { get; set; } = "";
    public string City { get; set; } = "";
    public string State { get; set; } = "";
    public string PostCode { get; set; } = "";
    public string InvoiceNo { get; set; } = null!;
    public DateTime InvoiceDate { get; set; }
    public string ReferenceNo { get; set; } = "";
    public List<SalesOrderLineDto> Lines { get; set; } = new();
    public decimal TotalExcl { get; set; }
    public decimal TotalTax { get; set; }
    public decimal TotalIncl { get; set; }
}
