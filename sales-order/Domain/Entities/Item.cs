using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SalesOrderApi.Domain.Entities;

public class Item
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = null!;

    public string ItemCode { get; set; } = null!;
    public string Description { get; set; } = null!;
    public decimal Price { get; set; }
}
