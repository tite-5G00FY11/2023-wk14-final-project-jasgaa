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
};

const updateTable = async (input, table, limit) => {
    try {
        const data = await fetchData(input, limit > 0 ? limit : null);
        // Clear table
        if (data.length > 0) {
            table.innerHTML = '';
        }
        // Update table
        data.forEach((item) => {
            const tableRow = createTableRow(item);
            table.append(tableRow);
        });
    } catch (error) {
        console.error(error);
    }
};
