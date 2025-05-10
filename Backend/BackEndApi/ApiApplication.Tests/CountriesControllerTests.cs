using ApiApplication.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;
using Moq.Protected;
using Moq;
using System.Net;
using System.Text;

namespace ApiApplication.Tests
{
    public class CountriesControllerTests
    {
        [Fact]
        public async Task GetCountries_ReturnsListOfCountries()
        {
            // Arrange
            var mockJson = @"[
            {
                ""name"": { ""common"": ""Testland"" },
                ""capital"": [""Testville""],
                ""population"": 123456,
                ""flags"": { ""png"": ""http://example.com/flag.png"" }
            }
        ]";

            var mockMessageHandler = new Mock<HttpMessageHandler>();
            mockMessageHandler
                .Protected()
                .Setup<Task<HttpResponseMessage>>(
                    "SendAsync",
                    ItExpr.IsAny<HttpRequestMessage>(),
                    ItExpr.IsAny<CancellationToken>()
                )
                .ReturnsAsync(new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.OK,
                    Content = new StringContent(mockJson, Encoding.UTF8, "application/json")
                });

            var httpClient = new HttpClient(mockMessageHandler.Object);
            var httpClientFactory = new Mock<IHttpClientFactory>();
            httpClientFactory.Setup(f => f.CreateClient(It.IsAny<string>())).Returns(httpClient);

            var controller = new CountriesController(httpClientFactory.Object);

            // Act
            var result = await controller.GetCountries();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var countries = Assert.IsAssignableFrom<IEnumerable<CountryDto>>(okResult.Value);
            var country = Assert.Single(countries);

            Assert.Equal("Testland", country.Name);
            Assert.Equal("Testville", country.Capital);
            Assert.Equal(123456, country.Population);
            Assert.Equal("http://example.com/flag.png", country.FlagUrl);
        }


        [Fact]
        public async Task GetCountries_ReturnsStatusCode_WhenApiFails()
        {
            // Arrange
            var response = new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.InternalServerError,
                Content = new StringContent("Internal Server Error")
            };

            var handlerMock = new Mock<HttpMessageHandler>();
            handlerMock
                .Protected()
                .Setup<Task<HttpResponseMessage>>(
                    "SendAsync",
                    ItExpr.IsAny<HttpRequestMessage>(),
                    ItExpr.IsAny<CancellationToken>())
                .ReturnsAsync(response);

            var httpClient = new HttpClient(handlerMock.Object);
            var httpClientFactory = new Mock<IHttpClientFactory>();
            httpClientFactory.Setup(_ => _.CreateClient(It.IsAny<string>())).Returns(httpClient);

            var controller = new CountriesController(httpClientFactory.Object);

            // Act
            var result = await controller.GetCountries();

            // Assert
            var objectResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal((int)HttpStatusCode.InternalServerError, objectResult.StatusCode);
            Assert.Equal("Failed to fetch country data.", objectResult.Value);
        }

    }
}