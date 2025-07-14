using ProjectAngularApi.Models.DTOs.Auth;
using ProjectAngularApi.Models.Entities;

namespace ProjectAngularApi.Service.IServices
{
    public interface IAuthService
    {
        Task<AuthModel> SeedAdminAsync();
        Task<AuthModel> RegisterAsync(RegisterDto registerModel);
        Task<AuthModel> GetTokenAsync(TokenRequestDto token);
        Task<string> AddRoleAsync (AddRoleDto role);

    }
}