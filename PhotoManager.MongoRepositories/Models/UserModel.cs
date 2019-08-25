using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PhotoManager.MongoRepositories.Models
{
    public class UserModel
    {
        [BsonId, BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string HashPassword { get; set; }
    }
}
