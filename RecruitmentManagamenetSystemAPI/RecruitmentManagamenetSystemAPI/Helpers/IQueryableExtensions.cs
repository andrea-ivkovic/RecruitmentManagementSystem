using RecruitmentManagamenetSystemAPI.DTOs;

namespace RecruitmentManagamenetSystemAPI.Helpers
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> Paginate<T>(this IQueryable<T> queryable, PaginationDTO paginationDTO)
        {
            return queryable
                .Skip((paginationDTO.Page - 1) * paginationDTO.RecordsPerPage) //skip allows us to skip several records
                .Take(paginationDTO.RecordsPerPage);  //take allows us to only return a x amount of records from our table
        }
    }
}
