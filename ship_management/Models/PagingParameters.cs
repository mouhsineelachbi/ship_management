namespace ship_management.Models
{
    public class PagingParameters
    {
        const int maxPageSize = 100;
        public int pageNumber { get; set; } = 1;
        private int _pageSize = 10;

        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = (value > maxPageSize) ? maxPageSize : value;
            }
        }
    }
}
