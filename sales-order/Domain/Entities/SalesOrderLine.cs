using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SalesOrderApi.Domain.Entities;

public class SalesOrderLine
{
    [BsonRepresentation(BsonType.ObjectId)]
    public string LineId { get; set; } = ObjectId.GenerateNewId().ToString();

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
