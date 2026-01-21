// Custom Cursor
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Cursor Hover Effects
const addCursorHover = () => {
    const interactables = document.querySelectorAll('a, button, .project-card, .flip-btn, input, textarea');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            cursorOutline.style.mixBlendMode = 'difference';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorOutline.style.mixBlendMode = 'normal';
        });
    });
};
addCursorHover();

// Card Flip Logic
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    const flipBtn = card.querySelector('.flip-btn');
    const backBtn = card.querySelector('.flip-back-btn');

    flipBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent bubbling if card has other clicks
        card.classList.add('flipped');
    });

    backBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        card.classList.remove('flipped');
    });
});

// Terminal Typing Effect
const terminalContent = document.getElementById('terminal-content');
const cmdSpan = terminalContent.querySelector('.cmd:not(.cursor-blink)');
const outputDiv = terminalContent.querySelector('.output');
const commandText = "whoami";

let charIndex = 0;

function typeCommand() {
    if (charIndex < commandText.length) {
        cmdSpan.textContent += commandText.charAt(charIndex);
        charIndex++;
        setTimeout(typeCommand, 100 + Math.random() * 100);
    } else {
        setTimeout(revealOutput, 500);
    }
}

function revealOutput() {
    outputDiv.style.opacity = '1';
    outputDiv.style.display = 'block'; // Ensure it's visible if hidden by CSS
    // Also simulate creating the new prompt line
    const newPromptLine = document.createElement('div');
    newPromptLine.className = 'command-line';
    newPromptLine.innerHTML = '<span class="prompt">➜</span> <span class="cmd cursor-blink">_</span>';
    // terminalContent.appendChild(newPromptLine); // already static in HTML, just strictly logical here
}

// Initialize Terminal State
cmdSpan.textContent = "";
outputDiv.style.display = 'none'; // Hide initially

// Trigger typing when scrolled into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typeCommand();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(document.querySelector('.terminal-window'));


// Glitch Text Effect for Nav Links
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

document.querySelectorAll('.nav-links a').forEach(item => {
    item.addEventListener('mouseover', event => {
        let iteration = 0;
        const originalText = event.target.dataset.text; // Use data-text as source

        clearInterval(event.target.interval);

        event.target.interval = setInterval(() => {
            event.target.innerText = event.target.innerText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return letters[Math.floor(Math.random() * 26)]
                })
                .join("");

            if (iteration >= originalText.length) {
                clearInterval(event.target.interval);
            }

            iteration += 1 / 3;
        }, 30);
    });

    // Reset on mouseleave just in case
    item.addEventListener('mouseleave', event => {
        event.target.innerText = event.target.dataset.text;
    });
});


// Scroll Active Link Spy
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});


// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Function to update the theme icon
function updateThemeIcon(theme) {
    // Replace innerHTML with a fresh i tag for Lucide to convert
    const iconName = theme === 'theme-light' ? 'sun' : 'moon';
    themeToggle.innerHTML = `<i data-lucide="${iconName}"></i>`;
    // Reinitialize Lucide icons to apply the change
    lucide.createIcons();
}

// Check for saved theme preference or default to 'theme-dark'
const currentTheme = localStorage.getItem('theme') || 'theme-dark';
body.className = currentTheme;
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    // Toggle between theme-dark and theme-light
    if (body.classList.contains('theme-dark')) {
        body.classList.remove('theme-dark');
        body.classList.add('theme-light');
        localStorage.setItem('theme', 'theme-light');
        updateThemeIcon('theme-light');
    } else {
        body.classList.remove('theme-light');
        body.classList.add('theme-dark');
        localStorage.setItem('theme', 'theme-dark');
        updateThemeIcon('theme-dark');
    }
});
