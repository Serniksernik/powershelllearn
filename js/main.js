document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionName = link.getAttribute('data-section');

            // Update navigation
            navLinks.forEach(nl => nl.classList.remove('active'));
            link.classList.add('active');

            // Show selected section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `${sectionName}-section`) {
                    section.classList.add('active');
                }
            });
        });
    });

    // Initialize Feather icons
    feather.replace();

    // Load initial content
    loadLessons();
    loadExercises();
    loadScripts(); // Added loadScripts() here
    initializeTerminal();
    initializePlayground();
});

// Handle messages and notifications
function showMessage(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.querySelector('.container').insertBefore(alertDiv, document.querySelector('.container').firstChild);
}