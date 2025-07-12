using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace ProjectAngularApi.Models.Entities
{
    public class ApplicationUser:IdentityUser 
    {
        [Required]
        [StringLength(30)]
        public string FullName { get; set; }

    }
}
