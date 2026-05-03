# Daylium App

When starting a new day, I've found it tedious to switch between different apps and views to get an overview of the upcoming day. That's why I wanted to create the Daylium app. 

At a single glance on the Daylium app, you'll see:
- Date, weekday and time
- The day's current and upcoming weather 
- Any calendar events for the day (device calendar integration)

The app sends a daily morning notification to remind the user to open it and check their day.

# Goal

The goal of Daylium is to reduce morning friction by combining important daily information into a single, glanceable view.

# The technology used

This app was built using [React Native](https://reactnative.dev/) with the [Expo](https://expo.dev/) framework:

- [**Expo Router**](https://docs.expo.dev/versions/latest/sdk/router/) – navigation and app structure  
- [**Expo Calendar**](https://docs.expo.dev/versions/latest/sdk/calendar/) – device calendar access  
- [**Expo Location**](https://docs.expo.dev/versions/latest/sdk/location/) – user location for weather 
- [**Expo Notifications**](https://docs.expo.dev/versions/latest/sdk/notifications/) – daily reminders to check app

The project also uses the free [Open-Meteo API](https://open-meteo.com/) for fetching weather data based on user's location.