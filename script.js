// =================== CONFIGURAÇÃO ===================
        // URLs das imagens para a galeria (substitua com suas próprias)
        const PHOTO_URLS = [
            'fotos/5fe414cd-e112-4d17-a866-6cd44cdd9ae9.JPG',
            'fotos/461f1ed7-188f-4277-a5a5-de8109e28d46.JPG',
            'fotos/classicu 2024-08-25 000452.809.JPG',
            'fotos/FullSizeRender.GIF',
            'fotos/FullSizeRender.jpg',
            'fotos/IMG_0783.jpg',
            'fotos/IMG_0784.jpg',
            'fotos/IMG_0785.jpg',
            'fotos/IMG_1176.jpg',
            'fotos/IMG_4080.JPG',
            'fotos/IMG_4695.jpg',
            'fotos/IMG_5921.jpg',
            'fotos/IMG_7133.jpg',
            'fotos/Tezza-1863.JPG',

        ];
        
        // URL da música (substitua com o link da sua música)
        const MUSIC_SRC = 'Grupo Revelação - Essência da Paixão (DVD Ao Vivo No Olimpo) (online-audio-converter.com).mp3';
        
        // Mensagem do gatinho
        const CAT_MESSAGE = "Eu também desejo muitos anos de amor pra vocês 💕";
        
        // Palavras para a word cloud (ampliada com mais frases românticas)
        const ROMANTIC_WORDS = [
            "Amor", "Diva", "Minha", "Nerfetiti", "Amor",
            "Vida", "Dengo", "Meu", "Te Amo", "Te Quero",
            "Diva", "Mais", "Quero", "Saudade", "Futuro",
            "Sonho", "Tenho", "Anos", "Doce", "Suave",
            "Feliz", "Preta", "Apaixonado", "Namoro", "Gatinha",
            "Dourado", "Futura", "Minha Diva", "Amorzito", "Nosso",
            "Gostosa", "Felicidade", "Melhor amiga", "Negah", "Linda",
            "Diva", "Vem cá", "Amorzinho", "Vida", "Mulher",
            "Você é", "Flamenguista", "Nosso", "Encontro", "2",
            "❤️", "Meu love", "Para Sempre", "Juntos", "Saudades",
        ];

        // =================== WORD CLOUD ==================
        function createWordCloud() {
            const cloud = document.getElementById('wordCloud');
            
            ROMANTIC_WORDS.forEach((word, index) => {
                const wordEl = document.createElement('div');
                wordEl.className = 'word';
                wordEl.textContent = word;
                // Adiciona um delay de animação diferente para cada palavra
                wordEl.style.animationDelay = `${index * 0.2}s`;
                
                cloud.appendChild(wordEl);
            });
        }

        // =================== GALERIA ===================
        function initGallery() {
                const gallery = document.getElementById('gallery');

            // === Galeria com imagens ===
            PHOTO_URLS.forEach(src => {
                const fig = document.createElement('figure');
                const im = document.createElement('img');
                im.loading = 'lazy';
                im.decoding = 'async';
                im.src = src;
                im.alt = 'Foto nossa';
                fig.appendChild(im);
                gallery.appendChild(fig);
            });

            // === Arrastar para rolar (desktop) ===
            let isDown = false;
            let startX = 0;
            let scrollLeft = 0;

            gallery.addEventListener('mousedown', (e) => { 
                isDown = true; 
                gallery.classList.add('drag'); 
                startX = e.pageX - gallery.offsetLeft; 
                scrollLeft = gallery.scrollLeft; 
            });

            gallery.addEventListener('mouseleave', () => isDown = false);
            gallery.addEventListener('mouseup', () => isDown = false);
            gallery.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - gallery.offsetLeft;
                const walk = (x - startX) * 1.2;
                gallery.scrollLeft = scrollLeft - walk;
            });

             // Configura rolagem automática
                let index = 0;
                const total = PHOTO_URLS.length;
                const galleryWidth = gallery.clientWidth;

                setInterval(() => {
                    index = (index + 1) % total;
                    const scrollPos = index * galleryWidth;
                    gallery.scrollTo({
                        left: scrollPos,
                        behavior: 'smooth' // animação suave
                    });
                }, 3000); // muda a cada 4 segundos
            } // intervalo em ms (quanto menor, mais suave)
        

        // =================== MODAL E MÚSICA ===================
        function initModal() {
            const modal = document.getElementById('modal');
            const musicBtn = document.getElementById('musicBtn');
            const closeBtn = document.getElementById('closeModal');
            const audio = document.getElementById('audio');
            
            // Configurar áudio
            audio.src = MUSIC_SRC;
            
            // Abrir modal
            musicBtn.addEventListener('click', () => {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Iniciar música
                audio.play().catch(e => {
                    console.log('Reprodução automática bloqueada. O usuário precisa interagir primeiro.');
                });
            });
            
            // Fechar modal
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                
                // Pausar música
                audio.pause();
            });
            
            // Fechar ao clicar fora do conteúdo
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    audio.pause();
                }
            });
            function initGallery() {
                const gallery = document.getElementById('gallery');
                let index = 0;

            

                // Carrossel automático
                setInterval(() => {
                    index = (index + 1) % total;
                    gallery.style.transform = `translateX(-${index * 100}%)`;
                }, 4000); // muda a cada 4s
            }

            // Tecla ESC para fechar
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    audio.pause();
                }
            });
        }

        // =================== GATINHO INTERATIVO ===================
        function initCat() {
            const cat = document.getElementById('cat');
            const bubble = cat.querySelector('.bubble');
            
            // Definir mensagem
            bubble.textContent = CAT_MESSAGE;
            
            // Apenas interação ao passar o mouse (sem movimento automático)
            cat.addEventListener('mouseenter', () => {
                cat.style.transform = 'scale(1.1)';
            });
            
            cat.addEventListener('mouseleave', () => {
                cat.style.transform = 'scale(1)';
            });
            
            // Acessibilidade: abrir/fechar balão por teclado
            cat.setAttribute('tabindex', '0');
            cat.addEventListener('focus', () => {
                bubble.style.opacity = 1;
                bubble.style.transform = 'translateY(-8px) scale(1)';
            });
            cat.addEventListener('blur', () => {
                bubble.style.opacity = 0;
                bubble.style.transform = 'translateY(0) scale(.98)';
            });
        }

        // =================== INICIALIZAÇÃO ===================
        document.addEventListener('DOMContentLoaded', () => {
            createWordCloud();
            initGallery();
            initModal();
            initCat();
            
            // Evita arrastar imagens da galeria acidentalmente
            document.addEventListener('dragstart', (e) => {
                if (e.target.tagName === 'IMG') e.preventDefault();
            });
        });