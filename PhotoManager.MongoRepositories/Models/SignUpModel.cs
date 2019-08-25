using System.ComponentModel.DataAnnotations;
using PhotoManager.MongoRepositories.Validation;

namespace PhotoManager.MongoRepositories.Models
{
    public class SignUpModel
    {
        [Required(ErrorMessage = "Please input email!")]
        [EmailAddress(ErrorMessage = "Please input valid email!")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Please input password!")]
        [StringLength(30, ErrorMessage = "Password should be at least {2} symbols and no more {0} symbols!", MinimumLength = 6)]
        [IsNotTagOrScript(ErrorMessage = "Password shouldn\'t be a tag or script!")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Please input password confirmation!")]
        [Compare("Password", ErrorMessage = "Password doesn\'t match confirmation!")]
        public string PasswordConfirmation { get; set; }
    }
}
