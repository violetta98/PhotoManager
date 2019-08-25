using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PhotoManager.MongoRepositories.Models;
using PhotoManager.MongoRepositories.Repositories;

namespace PhotoManager.Web.Controllers.Auth
{
    [Route("api"), ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly AuthRepository _authRepository;

        public AuthController(ILogger<AuthController> logger, AuthRepository authRepository)
        {
            _logger = logger;
            _authRepository = authRepository;
        }

        [HttpPost("sign-in")]
        public async Task<IActionResult> SignIn(SignInModel signInModel)
        {
            var user = await _authRepository.GetUserAsync(signInModel.Email, signInModel.Password);

            if (user == null)
            {
                _logger.LogWarning($"Authentication was failed. This user {signInModel} was not found.");
                return NotFound();
            }

            var token = _authRepository.GenerateToken(user);
            _logger.LogInformation($"User with email={signInModel.Email} was successfully authenticated.");

            return Ok(token);
        }

        [HttpPost("sign-up")]
        public async Task<IActionResult> SignUp(SignUpModel signUpModel)
        {
            if (await _authRepository.AddUserAsync(signUpModel))
            {
                var user = await _authRepository.GetUserAsync(signUpModel.Email, signUpModel.Password);
                var token = _authRepository.GenerateToken(user);
                _logger.LogInformation($"User with email={signUpModel.Email} was successfully authenticated.");

                return Ok(token);
            }

            _logger.LogWarning($"Registration was failed. User with email={signUpModel.Email} already exists.");
            return Conflict();
        }
    }
}