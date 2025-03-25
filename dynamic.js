// Job Table Sorting and Filtering Functionality
class JobTableManager {
    constructor() {
        this.table = document.querySelector('table');
        this.headers = this.table?.querySelectorAll('th');
        this.tableBody = this.table?.querySelector('tbody');
        this.rows = this.tableBody?.querySelectorAll('tr');
        this.filterInput = this.createFilterInput();
        this.init();
    }

    createFilterInput() {
        const input = document.createElement('input');
        input.placeholder = 'Search jobs...';
        input.classList.add(
            'px-4', 'py-2', 'border', 
            'rounded-md', 'mb-4', 'w-64', 
            'focus:outline-none', 'focus:ring-2', 
            'focus:ring-purple-500'
        );
        this.table?.parentElement.insertBefore(input, this.table);
        return input;
    }

    setupSorting() {
        this.headers?.forEach((header, index) => {
            header.classList.add('cursor-pointer', 'select-none', 'hover:bg-gray-50');
            header.addEventListener('click', () => this.sortColumn(header, index));
        });
    }

    sortColumn(header, index) {
        const direction = header.classList.contains('sort-asc') ? -1 : 1;
        const sortedRows = Array.from(this.rows || []).sort((a, b) => {
            const aCol = a.querySelector(`td:nth-child(${index + 1})`).textContent;
            const bCol = b.querySelector(`td:nth-child(${index + 1})`).textContent;
            return aCol > bCol ? direction : -direction;
        });

        this.headers?.forEach(h => h.classList.remove('sort-asc', 'sort-desc'));
        header.classList.toggle('sort-asc', direction === 1);
        header.classList.toggle('sort-desc', direction === -1);

        // Add sorting indicators
        header.querySelector('.sort-indicator')?.remove();
        const indicator = document.createElement('span');
        indicator.className = 'sort-indicator ml-2';
        indicator.textContent = direction === 1 ? '↑' : '↓';
        header.appendChild(indicator);

        this.tableBody?.append(...sortedRows);
    }

    setupFilter() {
        this.filterInput?.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            Array.from(this.rows || []).forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }

    init() {
        if (!this.table) {
            console.error('No table found in the document');
            return;
        }
        this.setupSorting();// filepath: /Users/jerry/workspace/cool_stuff/jobster/dynamic.js
// Job Table Sorting and Filtering Functionality
class JobTableManager {
    constructor() {
        this.table = document.querySelector('table');
        this.headers = this.table?.querySelectorAll('th');
        this.tableBody = this.table?.querySelector('tbody');
        this.rows = this.tableBody?.querySelectorAll('tr');
        this.filterInput = this.createFilterInput();
        this.init();
    }

    createFilterInput() {
        const input = document.createElement('input');
        input.placeholder = 'Search jobs...';
        input.classList.add(
            'px-4', 'py-2', 'border', 
            'rounded-md', 'mb-4', 'w-64', 
            'focus:outline-none', 'focus:ring-2', 
            'focus:ring-purple-500'
        );
        this.table?.parentElement.insertBefore(input, this.table);
        return input;
    }

    setupSorting() {
        this.headers?.forEach((header, index) => {
            header.classList.add('cursor-pointer', 'select-none', 'hover:bg-gray-50');
            header.addEventListener('click', () => this.sortColumn(header, index));
        });
    }

    sortColumn(header, index) {
        const direction = header.classList.contains('sort-asc') ? -1 : 1;
        const sortedRows = Array.from(this.rows || []).sort((a, b) => {
            const aCol = a.querySelector(`td:nth-child(${index + 1})`).textContent;
            const bCol = b.querySelector(`td:nth-child(${index + 1})`).textContent;
            return aCol > bCol ? direction : -direction;
        });

        this.headers?.forEach(h => h.classList.remove('sort-asc', 'sort-desc'));
        header.classList.toggle('sort-asc', direction === 1);
        header.classList.toggle('sort-desc', direction === -1);

        // Add sorting indicators
        header.querySelector('.sort-indicator')?.remove();
        const indicator = document.createElement('span');
        indicator.className = 'sort-indicator ml-2';
        indicator.textContent = direction === 1 ? '↑' : '↓';
        header.appendChild(indicator);

        this.tableBody?.append(...sortedRows);
    }

    setupFilter() {
        this.filterInput?.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            Array.from(this.rows || []).forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }

    init() {
        if (!this.table) {
            console.error('No table found in the document');
            return;
        }
        this.setupSorting();