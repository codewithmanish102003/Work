const toggleButton = document.getElementById('mode-toggle');

// Initialize the mode based on local storage or default to light mode
const savedMode = localStorage.getItem('mode');
if (savedMode) {
    document.body.classList.add(savedMode);
} else {
    // Set default mode to light mode (no need to add a class since it's the default)
    localStorage.setItem('mode', 'light-mode');
}

// Toggle dark mode and save preference on button click
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('mode', 'dark-mode');
    } else {
        localStorage.setItem('mode', 'light-mode');
    }
});
