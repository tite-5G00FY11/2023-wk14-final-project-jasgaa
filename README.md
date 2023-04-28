[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/D_drWJKh)
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-8d59dc4de5201274e310e4c54b9627a8934c3b88527886e3b421487c677d23eb.svg)](https://classroom.github.com/a/D_drWJKh)

# Final Project: Weather Statistis

## General & self evaluation:

In my opinion all phases are completed ok. Phase 3 is missing "standard deviation" (-4 points). Pages are designed mainly for computers and laptops, not for mobile use. I didn't really thik about mobile usage, because long tables with lots of data are not very mobile friendly anyway. 

There are still some responsible features: chart and statistics (if exists) will move below the main table on narrower screens/windows. Maybe the other way, table on the bottom might have been a better option. I'm not looking for those 5 extra point from UI, but the page is running in GitHub pages (+5 points).

## [== Weather page on GitHub pages ==](https://tite-5g00fy11.github.io/2023-wk14-final-project-jasgaa/)

### There are 3 views in total: 

- Latest values
- Temperature
- Light

#### Latest values

In firts view there are two dropdowns. First one is "measurement", where the wanted measurement can be selected. List items are based on to the [Latest active measurement names](http://webapi19sa-1.course.tamk.cloud/v1/weather/names). _While writing this I noticed that for example "light" and "temperature" is missing from the list. At the same time some new measurements appeared to the list. This page has been made with expextaion that the API always provides correct information._

Another button, "Timespan" is locked (disabled) until measurement has been selected. After selecting measurement, both dropdowns can be operated. Table and chart will update according to user selections. _Please note that bc of the API, some measurements might not contain data for the whole selected timespan._

#### Temperature & light

These pages share the same functionality, first one displays suprice suprice temperature and another light values. When entering the page, last 20 values of the measurement are shown in table and chart. Additionally there are some statistics (mean, median, mode and range) calculated from visible weather data in their own table.

A dropdown menu can be found above statistics table. Dropdown controls the timespawn of data in table, chart and statistics. When changed data updates according to selected timespan. _Again somewhat unstable API might not provide all values..._
