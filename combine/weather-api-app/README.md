# Weather App

**Weather App** is a web application that allows users to receive up—to-date information about the weather, current time and news for a selected city. The project uses three APIs:

- **OpenWeather API** for getting weather data,
- **TimeZoneDB API** to display the current time in the selected city,
- **NewsAPI** for getting the latest news.


## Installation and launch



1. Install all dependencies:
``bash
npm install
    ```

2. Create the `.env` file in the root of the project and add the API keys:
  OPENWEATHER_API_KEY=44ba0beef05ac0218312d2d2745bcd2b
TIMEZONEDB_API_KEY=Z408LI28W3YS
NEWS_API_KEY=7b56580d04ca4eaebf6f3f9c6029fe76

3. Launch the app:
    node core.The js
application will be available at `http://localhost:3000 `.

## Functional description

The application provides the following functions:

1. **Weather**: Retrieves current weather data for the selected city. It includes information about temperature, humidity, wind speed, weather description, etc.
2. **Time**: Displays the current time in the selected city based on its time zone.
3. **News**: Getting the latest news for the selected city.

## Project structure

The project consists of the following main components:

- **HTML**: The structure of the page with fields for entering the city and buttons for receiving weather, time and news data.
- **CSS**: Styles are applied to display weather, time, news, as well as maps and other elements.
- **JavaScript**: Scripts for processing API requests and displaying the received data on the page.

### Basic HTML elements:
- **City Input field**: Allows the user to enter the name of the city.
- **The "Get" button**: When clicked, an API request is made to receive data.
- **Containers**:
  - **Weather**: To display weather data.
  - **Time**: To display the current time.
  - **News**: To display the news.
  - **Map**: To display the location map of the city.

## Usage example

1. Enter the name of the city in the text field (for example, "Moscow").
2. Click the "Get" button.
3. The page will display:
- Information about the weather in the specified city.
   - The current time for the given city.
   - The latest news related to this city.
   - A map of the location of the city.

## Notes

- The application uses **API keys**, which must be obtained from the relevant services: [OpenWeather](https://openweathermap.org /), [TimeZoneDB](https://timezonedb.com /), and [NewsAPI](https://newsapi.org /).


