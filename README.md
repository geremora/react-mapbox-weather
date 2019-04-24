This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## About

React webapp based on the following required functionality:

- Displays a map of the world, which a user can move and zoom

- When a user clicks on a given location, the webapp should display the current weather data for that location

Side Notes:

- I added a units (F/C) menu changer

- This example is simple enough to not really need react/redux, but the process shown will scale better.

## Tools/Tech

- MapBox
- OpenWeather API
- Axios (https://github.com/axios/axios)
- Redux (https://github.com/reduxjs/redux)
- Redux-thunk (https://github.com/reduxjs/redux-thunk)
- Semantic UI (https://semantic-ui.com/)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## TODO

- Improve test cases. Test mapbox?
- Add spinner loading in each API call.
- Popup as React component?