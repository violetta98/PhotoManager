using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using PhotoManager.MongoRepositories.Validation;

namespace PhotoManager.MongoRepositories.Models
{
    public class SignInModel
    {
        [BsonId, BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }

        [Required(ErrorMessage = "Please input email!")]
        [EmailAddress(ErrorMessage = "Please input valid email!")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Please input password!")]
        [StringLength(30, ErrorMessage = "Password should be at least {2} symbols and no more {0} symbols!", MinimumLength = 6)]
        [IsNotTagOrScript(ErrorMessage = "Password shouldn\'t be a tag or script!")]
        public string Password { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
