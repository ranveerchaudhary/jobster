class JobTableManager {
    constructor() {
        this.table = document.querySelector('table');
        this.headers = this.table?.querySelectorAll('th');
        this.tableBody = this.table?.querySelector('tbody');
        this.rows = this.tableBody?.querySelectorAll('tr');
        this.filterInput = this.createFilterInput();
        this.sortConfig = {
            column: null,
            direction: 'asc'
        };
        this.init();
    }

    // ...existing code for createFilterInput...

    setupSorting() {
        this.headers?.forEach((header, index) => {
            header.classList.add('cursor-pointer', 'select-none', 'hover:bg-gray-50');
            header.addEventListener('click', () => this.sortColumn(header, index));
            // Add initial sort indicators
            const indicator = document.createElement('span');
            indicator.className = 'sort-indicator ml-2 opacity-0 transition-opacity';
            indicator.textContent = '↑';
            header.appendChild(indicator);
        });
    }

    sortColumn(header, index) {
        const isAsc = this.sortConfig.column === index && this.sortConfig.direction === 'asc';
        this.sortConfig.column = index;
        this.sortConfig.direction = isAsc ? 'desc' : 'asc';

        const sortedRows = this.getSortedRows(index, isAsc);
        this.updateSortIndicators(header);
        this.updateTableRows(sortedRows);
    }

    getSortedRows(index, isAsc) {
        return Array.from(this.rows || []).sort((a, b) => {
            const aCol = this.getCellValue(a, index);
            const bCol = this.getCellValue(b, index);
            return this.compareValues(aCol, bCol, !isAsc);
        });
    }

    getCellValue(row, index) {
        const cell = row.querySelector(`td:nth-child(${index + 1})`);
        // Handle different cell content types
        if (cell.querySelector('.bg-green-100')) return 'a'; // Running
        if (cell.querySelector('.bg-yellow-100')) return 'b'; // Pending
        if (cell.querySelector('.bg-red-100')) return 'c'; // Failed
        if (cell.querySelector('.bg-gray-200')) { // Progress bar
            return parseInt(cell.textContent) || 0;
        }
        return cell.textContent.toLowerCase();
    }

    compareValues(a, b, ascending) {
        if (typeof a === 'number' && typeof b === 'number') {
            return ascending ? a - b : b - a;
        }
        return ascending ? 
            a < b ? -1 : (a > b ? 1 : 0) :
            a < b ? 1 : (a > b ? -1 : 0);
    }

    updateSortIndicators(activeHeader) {
        this.headers?.forEach(header => {
            const indicator = header.querySelector('.sort-indicator');
            if (header === activeHeader) {
                indicator.textContent = this.sortConfig.direction === 'asc' ? '↑' : '↓';
                indicator.classList.remove('opacity-0');
            } else {
                indicator.textContent = '↑';
                indicator.classList.add('opacity-0');
            }
        });
    }

    updateTableRows(sortedRows) {
        this.tableBody?.append(...sortedRows);
        // Update rows reference after sorting
        this.rows = this.tableBody?.querySelectorAll('tr');
    }

    init() {
        if (!this.table) {
            console.error('No table found in the document');
            return;
        }
        this.setupSorting();
        this.setupFilter();
    }
}

// Initialize the table manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new JobTableManager();
});

