using ApiApplication.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;

[ApiController]
[Route("api/[controller]")]
public class CountriesController : ControllerBase
{
    private readonly HttpClient _httpClient;

    public CountriesController(IHttpClientFactory httpClientFactory)
    {
        _httpClient = httpClientFactory.CreateClient();
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CountryDto>>> GetCountries()
    {
        var response = await _httpClient.GetAsync("https://restcountries.com/v3.1/all");

        if (!response.IsSuccessStatusCode)
            return StatusCode((int)response.StatusCode, "Failed to fetch country data.");

        var json = await response.Content.ReadAsStringAsync();

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        var rawCountries = JsonSerializer.Deserialize<List<JsonElement>>(json, options);

        var countries = rawCountries.Select(c =>
        {
            var name = c.GetProperty("name").GetProperty("common").GetString();
            var capital = c.TryGetProperty("capital", out var cap) && cap.ValueKind == JsonValueKind.Array && cap.GetArrayLength() > 0
                ? cap[0].GetString()
                : "N/A";
            var population = c.TryGetProperty("population", out var pop) ? pop.GetInt64() : 0;
            var flagUrl = c.GetProperty("flags").GetProperty("png").GetString();

            return new CountryDto
            {
                Name = name,
                Capital = capital,
                Population = population,
                FlagUrl = flagUrl
            };
        }).ToList();

        return Ok(countries);
    }
}
