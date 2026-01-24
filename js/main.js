// Page Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('page-loader');
    setTimeout(() => {
        loader.classList.add('fade-out');
        // Remove from DOM after animation completes
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 800); // Show loader for at least 800ms
});

// Typewriter Effect for Hero Section
const typewriterElement = document.getElementById('typewriter');
if (typewriterElement) {
    const roles = ['Full-Stack Developer', 'AI Enthusiast', 'BCA Student', 'Problem Solver'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function typeWriter() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 75;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(typeWriter, typingSpeed);
    }

    typeWriter();
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.section-header, .stat-card, .project-card, .timeline-item, .skill-card, .info-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});


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

// Skill Progress Bar Animation
const skillProgressBars = document.querySelectorAll('.skill-progress-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const progress = progressBar.getAttribute('data-progress');
            progressBar.style.width = progress + '%';
            skillObserver.unobserve(progressBar);
        }
    });
}, { threshold: 0.5 });

skillProgressBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Statistics Counter Animation
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
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
const mobileNavLi = document.querySelectorAll('.mobile-nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    // Update desktop nav
    navLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });

    // Update mobile nav
    mobileNavLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});


// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        // Prevent body scroll when menu is open
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}


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

// Contact Form Mailto Fallback
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

        window.location.href = `mailto:arpitbavankule03@gmail.com?subject=${subject}&body=${body}`;
    });
}
