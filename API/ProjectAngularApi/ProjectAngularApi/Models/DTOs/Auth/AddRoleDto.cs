using System.ComponentModel.DataAnnotations;
namespace ProjectAngularApi.Models.DTOs.Auth
{
    public class AddRoleDto
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string Role { get; set; }
    }
}



