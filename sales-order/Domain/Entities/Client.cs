// dir Domain\Entities\
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SalesOrderApi.Domain.Entities;

public class Client
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string CustomerId { get; set; } = null!;

    public string Name { get; set; } = null!;
    public string Address1 { get; set; } = "";
    public string Address2 { get; set; } = "";
    public string Address3 { get; set; } = "";
    public string City { get; set; } = "";
    public string State { get; set; } = "";
    public string PostCode { get; set; } = "";
}
