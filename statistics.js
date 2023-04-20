/**
 * Calculates statistics from given `data` array
 * @param {[]} data used to calculate statistics
 * @returns Object of statistics from `data`
 */
const calculateStatistics = (data) => {
    // Mean
    const mean = data.reduce((prev, curr) => prev + curr, 0) / data.length;
    let median;
    // Median
    const sortedData = data.slice().sort((a, b) => a - b);
    if (sortedData.length % 2 == 0) {
        median = (sortedData[data.length / 2 - 1] + sortedData[data.length / 2]) / 2;
    } else {
        median = sortedData[(data.length - 1) / 2];
    }
    // Mode
    let mode, maxFrequency = 0;
    const dataFrequency = {};
    data.forEach(value => {
        if (value in dataFrequency) {
        dataFrequency[value]++;
        } else {
        dataFrequency[value] = 1;
        }
    });
    for (const val in dataFrequency) {
        if (dataFrequency[val] > maxFrequency) {
            maxFrequency = dataFrequency[val];
            mode = Number(val);
        }
    }
    // Range
    const range = Math.max(...data) - Math.min(...data);
    // Standard deviation
    
    return { mean, median, mode, range/*, stdDeviation*/ };
}

/**
 * Updates statistics of requested `dataType` to `view`
 * @param {string} dataType eg. light, temperature
 * @param {int} view Number of view to update
 */
const updateStatistics = async (dataType, view) => {
    try {
        const data = await fetchData(dataType)
        const values = [];
        data.map((item) => {
            values.push(parseFloat(parseWeather(item).value));
        });
        const stats = calculateStatistics(values)
        let statistics = document.getElementById(`view-${view}-statistics`);
        for (const key in stats) {
            let statsRow = document.createElement('tr');
            let statsKey = document.createElement('td');
            statsKey.innerText = key.toUpperCase();
            let statsValue = document.createElement('td');
            statsValue.innerText = stats[key].toFixed(2);
            statsRow.append(statsKey, statsValue);
            statistics.append(statsRow);
        }
    } catch (error) {
        console.error(error);
    }
}
