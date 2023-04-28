let selectedData;

const createMeasurementDropdown = async () => {
    try {
        const data = await fetchData('names');
        const dropdownContainer = document.getElementById('view-1-measurement-selector')
        dropdownContainer.className = 'dropdown';

        const dropdownToggle = document.createElement('button');
        dropdownToggle.className = 'btn btn-secondary dropdown-toggle';
        dropdownToggle.type = 'button';
        dropdownToggle.id = 'view-1-measurement';
        dropdownToggle.setAttribute('data-bs-toggle', 'dropdown');
        dropdownToggle.setAttribute('aria-expanded', 'false');
        dropdownToggle.textContent = 'Select measurement'

        const dropdownMenu = document.createElement('ul');
        dropdownMenu.className = 'dropdown-menu';
        dropdownMenu.id = 'view-1-measurement-dropdown';
        dropdownMenu.setAttribute('aria-labelledby', 'view-1-measurement');

        data.forEach(value => {
            const option = document.createElement('li');
            option.className = 'dropdown-item';
            option.setAttribute('value', value.name);
            option.textContent = value.name;
            dropdownMenu.appendChild(option);
        });

        dropdownMenu.addEventListener('click', event => {
            selectedData = event.target.textContent
            dropdownToggle.textContent = selectedData;
            // Updating is not happening on first time (nothing to update)
            if (document.getElementById('view-1-timespan').disabled == false) {
                updatePage(selectedData, 1, timespan, true);
            }
            document.getElementById('view-1-timespan').disabled = false;
        });

        dropdownContainer.appendChild(dropdownToggle);
        dropdownContainer.appendChild(dropdownMenu);
    } catch (error) {
        console.error(error);
    }
};

const waitForInput = () => {
    if (selectedData != undefined) {
        updatePage(selectedData, 1);
    } else {
      setTimeout(waitForInput, 500);
    }
  }

createMeasurementDropdown();
waitForInput();
