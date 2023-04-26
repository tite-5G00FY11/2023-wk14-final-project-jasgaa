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
        });
        return chart;
    } catch (error) {
        console.error(error);
    }  
};

const updateChart = async (dataType, view, btnValue) => {
    try {
        const data = await fetchData(dataType, btnValue > 0 ? btnValue : null);
        const chartLabels = [];
        const chartData = [];
        data.forEach(element => {
            if (btnValue > 25) {
            chartLabels.push(parseWeather(element).dt);
            } else {
                chartLabels.push(parseWeather(element).time);
            }
            chartData.push(parseWeather(element).value);
        });
        chart = charts[view];
        chart.data.labels = [];
        chart.data.datasets[0].data = [];
        chart.data.labels = chartLabels;
        chart.data.datasets[0].data = chartData;
        chart.options.plugins.title.text = parseWeather(data[0]).key.toUpperCase();
        chart.update();
    } catch (error) {
        console.error(error);
    } 
};
