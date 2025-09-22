document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70, // Account for fixed header
                behavior: 'smooth'
            });
        });
    });
    
    // Reveal Elements on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.8;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Check on initial load
    
    // Animate Skill Bars
    const skillSections = document.querySelectorAll('.skills');
    
    function animateSkillBars() {
        skillSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const triggerBottom = window.innerHeight * 0.8;
            
            if (sectionTop < triggerBottom) {
                const skillBars = section.querySelectorAll('.skill-level');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }
        });
    }
    
    //window.addEventListener('scroll', animateSkillBars);
    
    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically handle form submission with AJAX
            // For now, we'll just show a success message
            const formGroups = contactForm.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.style.display = 'none';
            });
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.style.display = 'none';
            
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I'll get back to you soon.</p>
            `;
            
            contactForm.appendChild(successMessage);
            
            // Reset form after delay
            setTimeout(() => {
                contactForm.reset();
                successMessage.remove();
                formGroups.forEach(group => {
                    group.style.display = 'block';
                });
                submitButton.style.display = 'block';
            }, 5000);
        });
    }
    
    // Animated Navigation Highlight on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    function highlightNavigation() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // Typed.js-like effect for the hero subtitle
    const heroSubtitle = document.querySelector('.hero h2');
    
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        heroSubtitle.classList.add('typing');
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 1000);
    }
    
    // Particle Background Effect for Hero Section 
    
    const hero = document.querySelector('.hero');
    
    if (hero) {
        // Create and append canvas element
        const canvas = document.createElement('canvas');
        canvas.classList.add('particles-canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '1';
        hero.style.position = 'relative';
        hero.insertBefore(canvas, hero.firstChild);
        
        const heroContent = document.querySelector('.hero-content');
        heroContent.style.zIndex = '2';
        heroContent.style.position = 'relative';
        
        // Set canvas size
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
        
        // Initialize particles
        const ctx = canvas.getContext('2d');
        const particles = [];
        const particleCount = 200;
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1,
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 1 - 0.5,
                color: `rgba(67, 97, 238, ${Math.random() * 0.5 + 0.1})`
            });
        }
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
                
                // Update position
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Boundary check
                if (particle.x < 0 || particle.x > canvas.width) {
                    particle.speedX = -particle.speedX;
                }
                
                if (particle.y < 0 || particle.y > canvas.height) {
                    particle.speedY = -particle.speedY;
                }
            });
        }
        
        // Start animation
        animate();
        
        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        });
    }
    
    
    // Add class to body when page is loaded
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});