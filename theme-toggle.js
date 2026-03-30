// Funcionalidade
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Atualiza o ícone do botão com base no tema atual
    const updateButtonText = () => {
        if (body.classList.contains('light-mode')) {
            themeToggleButton.textContent = '☀️';
        } else {
            themeToggleButton.textContent = '🌙';
        }
    };

    // Verificação do tema salvo 
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
    }
    updateButtonText();

    themeToggleButton.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
        updateButtonText();
    });
});