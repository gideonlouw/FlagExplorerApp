namespace ApiApplication.DataTransferObjects
{
    public class CountryDto
    {
        public string Id { get; set; } // This could be a Guid or `cca3`
        public string Name { get; set; }
        public string Capital { get; set; }
        public long Population { get; set; }
        public string FlagUrl { get; set; }
    }
}
