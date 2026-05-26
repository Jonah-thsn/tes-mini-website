document.addEventListener('DOMContentLoaded', () => {
    const agentListContainer = document.getElementById('agent-list');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Function to set theme
    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme); // Save preference
        // Update button text to reflect current mode for clarity
        themeToggleBtn.textContent = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }

    // Load saved theme or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    // Toggle button functionality
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });


    // Fetch and render agent data
    fetch('/data/agents.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(agents => {
            agents.forEach(agent => {
                const agentCard = document.createElement('div');
                agentCard.classList.add('agent-card');
                agentCard.innerHTML = `
                    <h3>${agent.name}</h3>
                    <p>${agent.role}</p>
                    <p><small>(${agent.slug})</small></p>
                `;
                agentListContainer.appendChild(agentCard);
            });
        })
        .catch(error => {
            console.error('Error fetching or rendering agent data:', error);
            agentListContainer.innerHTML = '<p style="color: red;">Failed to load agent data. Please try again later.</p>';
        });
});
