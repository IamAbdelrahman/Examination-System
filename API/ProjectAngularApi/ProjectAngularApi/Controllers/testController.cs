using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ProjectAngularApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles="Admin", AuthenticationSchemes = "Bearer")]
    public class TestController : ControllerBase
    {

        [HttpGet("ak")]
        public string GetWelcome()
        {
            return "Welcome";
        }
    }

}
