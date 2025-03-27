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
        this.darkModeToggle = document.getElementById('darkModeToggle');
        this.searchInput = document.getElementById('jobSearch');
        this.updateInterval = null;
        this.init();
        this.setupRealTimeUpdates();
        // Add click outside listener to close menus
        document.addEventListener('click', () => this.closeAllMenus());
    }

    createFilterInput() {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Filter jobs...';
        input.className = 'px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700';
        return input;
    }

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

    setupDarkMode() {
        if (!this.darkModeToggle) {
            console.error('Dark mode toggle button not found');
            return;
        }

        const darkMode = localStorage.getItem('darkMode') === 'true';
        document.documentElement.classList.toggle('dark', darkMode);

        this.darkModeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
        });
    }

    setupSearch() {
        if (!this.searchInput || !this.rows) {
            console.error('Search input or table rows not found');
            return;
        }

        this.searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            Array.from(this.rows).forEach(row => {
                const text = Array.from(row.children)
                    .map(cell => cell.textContent)
                    .join(' ')
                    .toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }

    setupRealTimeUpdates() {
        this.updateInterval = setInterval(() => this.updateJobData(), 5000);
    }

    async updateJobData() {
        try {
            // Simulate API call - replace with actual API endpoint
            const response = await this.mockApiCall();
            this.updateTableContent(response);
        } catch (error) {
            console.error('Failed to update job data:', error);
        }
    }

    mockApiCall() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    { id: '#JOB-001', status: 'running', progress: Math.random() * 100 },
                    { id: '#JOB-002', status: 'pending', progress: Math.random() * 100 },
                    // Add more mock data as needed
                ]);
            }, 500);
        });
    }

    updateTableContent(jobs) {
        jobs.forEach(job => {
            const row = this.tableBody?.querySelector(`tr:has(td:contains("${job.id}"))`);
            if (row) {
                this.updateRowData(row, job);
            }
        });
    }

    updateRowData(row, job) {
        const progressBar = row.querySelector('.bg-blue-600, .bg-yellow-600, .bg-red-600');
        if (progressBar) {
            progressBar.style.width = `${job.progress}%`;
            progressBar.classList.toggle('loading', job.status === 'running');
        }
    }

    addJobActions(row) {
        const actionsCell = document.createElement('td');
        actionsCell.className = 'px-6 py-4 whitespace-nowrap text-sm text-gray-500 relative';
        actionsCell.innerHTML = `
            <button class="action-menu-button p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                </svg>
            </button>
            <div class="action-menu hidden absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                <div class="py-1" role="menu">
                    <button class="view-job block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                        View Details
                    </button>
                    <button class="pause-job block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                        Pause
                    </button>
                    <button class="restart-job block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                        Restart
                    </button>
                    <button class="cancel-job block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left">
                        Cancel
                    </button>
                </div>
            </div>
        `;

        const menuButton = actionsCell.querySelector('.action-menu-button');
        const menu = actionsCell.querySelector('.action-menu');

        // Toggle menu on button click
        menuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeAllMenus();
            menu.classList.toggle('hidden');
        });

        // Setup action handlers
        actionsCell.querySelector('.view-job').addEventListener('click', 
            () => this.showJobDetails(row));
        actionsCell.querySelector('.pause-job').addEventListener('click', 
            () => this.toggleJobStatus(row));
        actionsCell.querySelector('.restart-job').addEventListener('click', 
            () => this.restartJob(row));
        actionsCell.querySelector('.cancel-job').addEventListener('click', 
            () => this.cancelJob(row));
            
        row.appendChild(actionsCell);
    }

    closeAllMenus() {
        document.querySelectorAll('.action-menu').forEach(menu => 
            menu.classList.add('hidden'));
    }

    toggleJobStatus(row) {
        const statusCell = row.querySelector('td:nth-child(2) span');
        if (statusCell.classList.contains('bg-green-100')) {
            statusCell.classList.replace('bg-green-100', 'bg-yellow-100');
            statusCell.classList.replace('text-green-800', 'text-yellow-800');
            statusCell.textContent = 'Paused';
        } else {
            statusCell.classList.replace('bg-yellow-100', 'bg-green-100');
            statusCell.classList.replace('text-yellow-800', 'text-green-800');
            statusCell.textContent = 'Running';
        }
    }

    cancelJob(row) {
        row.classList.add('bg-red-50', 'dark:bg-red-900/20');
        setTimeout(() => {
            row.style.transition = 'opacity 0.5s';
            row.style.opacity = '0';
            setTimeout(() => row.remove(), 500);
        }, 300);
    }

    init() {
        try {
            if (!this.table) {
                throw new Error('No table found in the document');
            }
            this.setupDarkMode();
            this.setupSorting();
            this.setupSearch();
            this.setupFilter();
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }
}

// Initialize the table manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        new JobTableManager();
    } catch (error) {
        console.error('Failed to initialize JobTableManager:', error);
    }
});

function toggleDropdown(button) {
    // Close all other open dropdowns
    document.querySelectorAll('.absolute.right-0.mt-2').forEach(dropdown => {
        if (dropdown !== button.nextElementSibling) {
            dropdown.classList.add('hidden');
        }
    });
    
    // Toggle current dropdown
    const dropdown = button.nextElementSibling;
    dropdown.classList.toggle('hidden');
}

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('button')) {
        document.querySelectorAll('.absolute.right-0.mt-2').forEach(dropdown => {
            dropdown.classList.add('hidden');
        });
    }
});

