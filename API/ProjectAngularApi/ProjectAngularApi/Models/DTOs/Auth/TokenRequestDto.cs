using System.ComponentModel.DataAnnotations;

namespace ProjectAngularApi.Models.DTOs.Auth
{
    public class TokenRequestDto
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
