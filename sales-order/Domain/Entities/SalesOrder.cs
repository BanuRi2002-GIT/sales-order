using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SalesOrderApi.Domain.Entities;

public class SalesOrder
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string OrderId { get; set; } = null!;

    [BsonRepresentation(BsonType.ObjectId)]
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

    public List<SalesOrderLine> Lines { get; set; } = new();

    public decimal TotalExcl { get; set; }
    public decimal TotalTax { get; set; }
    public decimal TotalIncl { get; set; }
}
