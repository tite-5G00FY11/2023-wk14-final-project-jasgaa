const API_URL = 'http://webapi19sa-1.course.tamk.cloud/v1/weather';
let table1 = document.getElementById('view-1-table');
let table2 = document.getElementById('view-2-table');
let table3 = document.getElementById('view-3-table');

const createTableRow = (item) => {
    const parsed = parseWeather(item);

    let weatherRow = document.createElement('tr');
    let date = document.createElement('td');
    date.innerText = parsed.date;
    weatherRow.append(date);
    let time = document.createElement('td');
    time.innerText = parsed.time;
    weatherRow.append(time);
    let value = document.createElement('td');
    value.className = 'text-end';
    value.innerText = parsed.value;
    weatherRow.append(value);

    return weatherRow;
}

const fetchData = async (input) => {
    if (Number.isInteger(input)) {
        input = '/limit/' + input;
    } else {
        input = `/${input}/`;
    }
    try {
        const response = await fetch(API_URL + input);
        const data = await response.json();
        // console.log(data)
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return data;
    } catch (error) {
        console.error(error);
    }
}

const parseWeather = (weatherData) => {
    const dateTime = new Date(weatherData.date_time);
    const date = `${dateTime.getDate()}.${dateTime.getMonth() + 1}.${dateTime.getFullYear()}`;
    const time = `${dateTime.getHours()}:${dateTime.getMinutes() < 10 ? '0' : ''}${dateTime.getMinutes()}:${dateTime.getSeconds() < 10 ? '0' : ''}${dateTime.getSeconds()}`;
    let value, key;

    if (weatherData.hasOwnProperty('data')) {
        // All types have been requested
        // key = Object.keys(weatherData.data)[0];
        value = Object.values(weatherData.data)[0];
    } else {
        // Only single data type has been requested.
        key = Object.keys(weatherData).find(name => name !== 'device_id' && name !== 'date_time');
        value = weatherData[key];
    }   
    return {key, date, time, value, dateTime};
}

/**
 * Draws chart with dataType called data to selected view
 * @param {string} dataType eg. light, temperature
 * @param {int} view Number of view to update
 */
const drawChart = async (dataType, view) => {
    const chartObj = document.getElementById(`view-${view}-chart`);
    try {
        const data = await fetchData(dataType);
        const chartLabels = [];
        const chartData = [];
        data.forEach(element => {
            chartLabels.push(parseWeather(element).time);
            chartData.push(parseWeather(element).value);
        });
        console.log(chartData);
        chart = new Chart(chartObj, {
            type: 'bar',
            data: {
                labels: chartLabels,
                datasets: [{
                    data: chartData
                }]
            },
            options: {
                responsive: true,
                layout: {
                    padding: 20
                },
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: parseWeather(data[0]).key.toUpperCase()
                    }
                }
            }
        })
    } catch (error) {
        console.error(error);
    }
    
}

/**
 * Updates input data to view's table
 * @param {*} input Either count for latest readings or name of entry point eg. light, temperature etc.
 * @param {int} view Number of view to update
 */
const updatePage = async (input, view) => {
    try {
        const data = await fetchData(input)
        data.map((item) => {
            let tableRow = '';
            switch (view) {
                case 1:
                    tableRow = createTableRow(item);
                    table1.append(tableRow);
                    break;
                case 2:
                    tableRow = createTableRow(item);
                    table2.append(tableRow);
                    break;
                case 3:
                    tableRow = createTableRow(item);
                    table3.append(tableRow);
                    break;
                default:
                    break;
            }
        }
        );
    } catch (error) {
        console.error(error);
    }
    
}
