import { categories } from './data.js';
import { createCarousel } from './components/Carousel.js';
import { perfis } from './perfis.js';

document.addEventListener('DOMContentLoaded', () => {
    const nomePerfil = localStorage.getItem('perfilAtivoNome');
    const imagemPerfil = localStorage.getItem('perfilAtivoImagem');

    if (nomePerfil && imagemPerfil) {
        const kidsLink = document.querySelector('.kids-link');
        const profileIcon = document.querySelector('.profile-icon');
        
        if (kidsLink) kidsLink.textContent = nomePerfil;
        if (profileIcon) profileIcon.src = imagemPerfil;
    }

    const container = document.getElementById('main-content');
    
    if (container) {
        categories.forEach(category => {
            const carousel = createCarousel(category);
            container.appendChild(carousel);
        });
    }

    // ===== PROFILE DROPDOWN FUNCTIONALITY =====
    const profileButton = document.querySelector('.profile-menu');
    const dropdownMenu = document.querySelector('.profile-dropdown-menu');
    const dropdownContainer = document.querySelector('.profile-dropdown-container');

    if (profileButton && dropdownMenu) {
        // Injeta os perfis no dropdown
        const dropdownHTML = perfis.map(perfil => `
            <button class="profile-dropdown-item ${perfil.nome === nomePerfil ? 'active' : ''}" data-nome="${perfil.nome}" data-imagem="${perfil.imagem}">
                <img src="${perfil.imagem}" alt="${perfil.nome}">
                <span>${perfil.nome}</span>
            </button>
        `).join('') + `
            <div class="profile-dropdown-divider"></div>
            <button class="profile-dropdown-item profile-logout-item">
                <i class="fas fa-sign-out-alt" style="margin-left: 2px;"></i>
                <span>Sair</span>
            </button>
        `;
        
        dropdownMenu.innerHTML = dropdownHTML;

        // Toggle dropdown ao clicar no perfil
        profileButton.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('active');
        });

        // Fechar dropdown ao clicar fora
        document.addEventListener('click', (e) => {
            if (!dropdownContainer.contains(e.target)) {
                dropdownMenu.classList.remove('active');
            }
        });

        // Trocar de perfil
        const dropdownItems = document.querySelectorAll('.profile-dropdown-item:not(.profile-logout-item)');
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const novoNome = item.getAttribute('data-nome');
                const novaImagem = item.getAttribute('data-imagem');

                // Atualizar localStorage
                try {
                    localStorage.setItem('perfilAtivoNome', novoNome);
                    localStorage.setItem('perfilAtivoImagem', novaImagem);
                } catch (err) {
                    console.warn('Não foi possível salvar o perfil ativo no localStorage', err);
                }

                // Atualizar UI
                const kidsLink = document.querySelector('.kids-link');
                const profileIcon = document.querySelector('.profile-icon');
                
                if (kidsLink) kidsLink.textContent = novoNome;
                if (profileIcon) profileIcon.src = novaImagem;

                // Atualizar estado ativo no dropdown
                dropdownItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                // Fechar dropdown
                dropdownMenu.classList.remove('active');

                // Recarregar a página para atualizar o conteúdo (opcional)
                // Descomente a linha abaixo se quiser recarregar a página ao trocar de perfil
                // window.location.reload();
            });
        });

        // Logout
        const logoutButton = document.querySelector('.profile-logout-item');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                // Limpar dados do perfil ativo
                try {
                    localStorage.removeItem('perfilAtivoNome');
                    localStorage.removeItem('perfilAtivoImagem');
                } catch (err) {
                    console.warn('Não foi possível limpar o perfil ativo do localStorage', err);
                }

                // Redirecionar para index.html
                window.location.href = '../index.html';
            });
        };
    }
});
