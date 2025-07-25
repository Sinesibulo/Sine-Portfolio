/* ---
   script.js
   Functionality for the portfolio
--- */

document.addEventListener("DOMContentLoaded", function () {

    // --- Techy Background Effect ---
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = `rgba(100, 255, 218, ${Math.random()})`;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.size > 0.1) this.size -= 0.03;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function handleParticles() {
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(100, 255, 218, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.2;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
            if (particles[i].size <= 0.1) {
                particles.splice(i, 1);
                i--;
            }
        }
    }

    function createParticles(e) {
        let x = e.x;
        let y = e.y;
        for (let i = 0; i < 5; i++) {
            particles.push(new Particle(x, y));
        }
    }

    window.addEventListener('mousemove', createParticles);
    window.addEventListener('resize', resizeCanvas);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleParticles();
        requestAnimationFrame(animate);
    }
    animate();

    // --- Mobile Navigation Toggle ---
    const navToggle = document.querySelector(".nav-toggle");
    const mobileNav = document.querySelector(".mobile-nav");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav a");

    navToggle.addEventListener("click", () => {
        mobileNav.classList.toggle("is-open");
        // Optional: Change icon to 'X'
        const icon = navToggle.querySelector("i");
        if (mobileNav.classList.contains("is-open")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        } else {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }
    });

    // Close mobile menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('is-open');
            const icon = navToggle.querySelector("i");
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        });
    });


    // --- Contact Form Handler ---
    const contactForm = document.getElementById("contactForm");
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Custom modal instead of alert
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.left = '0';
        modal.style.top = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '2000';

        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = 'var(--light-navy)';
        modalContent.style.color = 'var(--lightest-slate)';
        modalContent.style.padding = '2rem';
        modalContent.style.borderRadius = 'var(--border-radius)';
        modalContent.style.border = '1px solid var(--accent)';
        modalContent.style.textAlign = 'center';
        modalContent.style.maxWidth = '400px';

        modalContent.innerHTML = `
            <h3 style="color: var(--white); margin-bottom: 1rem;">Message Sent!</h3>
            <p style="margin-bottom: 1.5rem;">Thanks for your message! I’ll get back to you shortly.</p>
            <button id="closeModal" class="btn btn-primary">Close</button>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        document.getElementById('closeModal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        contactForm.reset();
    });

    // --- Dynamic Year for Footer ---
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});
