document.addEventListener('DOMContentLoaded', () => {
    const agentListDiv = document.getElementById('agent-list');
    const themeToggleBtn = document.getElementById('theme-toggle'); // Assuming a button with this ID will be added later for toggling

    // Function to fetch and render agent data
    async function loadAgents() {
        try {
            const response = await fetch('/data/agents.json');
            const agents = await response.json();
            
            agentListDiv.innerHTML = ''; // Clear loading message
            agents.forEach(agent => {
                const agentCard = document.createElement('div');
                agentCard.classList.add('agent-card');
                agentCard.innerHTML = `
                    <h3>${agent.name}</h3>
                    <p>${agent.role}</p>
                    <p><small>Slug: ${agent.slug}</small></p>
                `;
                agentListDiv.appendChild(agentCard);
            });
        } catch (error) {
            console.error('Error loading agents:', error);
            agentListDiv.innerHTML = '<p>Failed to load agent data. Please try again later.</p>';
        }
    }

    // Function to toggle theme (light/dark mode)
    // This is a placeholder. A real implementation would involve UI elements like buttons or switches.
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    // Initialize theme based on user preference or default to light
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme && savedTheme === 'dark' || !savedTheme && prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    // Load agents when the DOM is ready
    loadAgents();

    // Add event listener for theme toggle if the button exists (for future implementation)
    // if (themeToggleBtn) {
    //     themeToggleBtn.addEventListener('click', toggleTheme);
    // }
});
