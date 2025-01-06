document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('current-Year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});