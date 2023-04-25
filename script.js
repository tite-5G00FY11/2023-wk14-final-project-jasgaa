const API_URL = 'http://webapi19sa-1.course.tamk.cloud/v1/weather';
const charts = {};
let timespan;

const fetchData = async (input, limit) => {
    let url;
  
    // Int input (from view 1)
    if (Number.isInteger(input) && !limit) {
        url = `${API_URL}/limit/${input}`;
    }
    // Possible names for view 1
    else if (input === 'names') {
        url = `${API_URL}/names/`;
    }
    // 20 of selected input (type) (v 2&3)
    else if (typeof input === "string" && !limit) {
        url = `${API_URL}/${input}/`;
    }
    // limit amount of selected input (type) (v 2&3)
    else if (typeof input === "string" && Number.isInteger(limit)) {
        url = `${API_URL}/${input}/${limit}/`;
    } else {
        throw new Error("Invalid input");
    }
  
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
        throw new Error(response.statusText);
        }
        return data;
    } catch (error) {
        console.error(error);
    }
};

const parseWeather = (weatherData) => {
    const dateTime = new Date(weatherData.date_time);
    const date = `${dateTime.getDate()}.${dateTime.getMonth() + 1}.${dateTime.getFullYear()}`;
    const time = `${dateTime.getHours()}:${dateTime.getMinutes() < 10 ? '0' : ''}${dateTime.getMinutes()}:${dateTime.getSeconds() < 10 ? '0' : ''}${dateTime.getSeconds()}`;
    const dt = `${dateTime.getDate()}.${dateTime.getMonth() + 1}. ${dateTime.getHours()}:${dateTime.getMinutes() < 10 ? '0' : ''}${dateTime.getMinutes()}`
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
    // Round value to 2 decimals
    value = parseFloat(parseFloat(value).toFixed(2));
    return {key, date, time, value, dateTime, dt};
};

/**
 * Updates input data to view's table
 * @param {*} input Either count for latest readings or name of entry point eg. light, temperature etc.
 * @param {int} view Number of view to update
 */
const updatePage = async (input, view, amount, update) => {
    const table = document.getElementById(`view-${view}-table`);

    const timespanBtn = document.getElementById(`view-${view}-dropdown`);
    await updateTable(input, table, amount != null ? amount : null);
    if (!update) {
        charts[view] = await drawChart(input, view);
    } else {
        updateChart(input, view, timespan);
    }
    if (view != 1) {
        await updateStatistics(input, view);
    }

    // Update according to selected timespan
    timespanBtn.addEventListener('click', function(event) {
        document.getElementById(`view-${view}-timespan`).textContent = event.target.innerText + ' ';
        timespan = event.target.value;
        if (view === 1) {
            input = selectedData;
        }
        updateTable(input, table, timespan);
        updateChart(input, view, timespan);
        if (view != 1) {
            updateStatistics(input, view, timespan);
        }
    });

};
