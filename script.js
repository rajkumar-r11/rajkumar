// This file can be used for JavaScript animations or interactive features.

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Loading Animation (Existing, commented out to avoid conflict)
// window.addEventListener('load', () => {
//     const loader = document.querySelector('.loading');
//     if (loader) {
//         loader.style.opacity = '0';
//         setTimeout(() => {
//             loader.style.display = 'none';
//         }, 500);
//     }
// });

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const headerHeight = document.querySelector('.sticky-header').offsetHeight;

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Update active navigation link
const updateActiveNavLink = () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 50;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
};

// Smooth scrolling for navigation links
navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);

        if (target) {
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu after clicking a link
            nav.classList.remove('active');
            menuToggle.classList.remove('active');

            // Update active class
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Update active link on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Initial active link highlighting
window.addEventListener('load', updateActiveNavLink);

// Typing Animation
const typingText = document.querySelector('.typing-text');
const roles = ['Web Developer', 'App Developer', 'Full Stack Developer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeEffect() {
    if (!typingText) return; // Check if element exists

    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingDelay = 2000; // Pause at end of text
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length; // Move to next role
        typingDelay = 500; // Pause before typing next role
    }

    setTimeout(typeEffect, typingDelay);
}

// Start typing animation when the page loads
window.addEventListener('load', () => {
    setTimeout(typeEffect, 1000); // Delay start for effect
});

// Form Submission
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML; // Use innerHTML to preserve icon
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            // Simulate API call
            // Replace with actual form submission logic (e.g., fetch API)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
            contactForm.appendChild(successMessage);

            // Clear form
            contactForm.reset();

            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);

        } catch (error) {
            console.error('Form submission error:', error);
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error sending message.';
            contactForm.appendChild(errorMessage);

            // Remove error message after 3 seconds
            setTimeout(() => {
                errorMessage.remove();
            }, 3000);
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

// Skill Progress Animation
const skillCategories = document.querySelectorAll('.skill-category');

const animateSkillBars = (category) => {
    const skillBars = category.querySelectorAll('.progress-bar');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0'; // Reset width before animating
        setTimeout(() => {
            bar.style.width = width; // Set width to trigger animation
        }, 100); // Small delay to allow reset
    });
};

// Animate skill bars when their category comes into view
const skillObserverOptions = {
    threshold: 0.3 // Trigger when 30% of the category is visible
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars(entry.target);
            skillObserver.unobserve(entry.target); // Stop observing once animated
        }
    });
}, skillObserverOptions);

skillCategories.forEach(category => {
    skillObserver.observe(category);
});

// Add scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Parallax Effect for Hero Image
const heroImage = document.querySelector('.hero-section .home-image img');

if (heroImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        // Adjust the multiplier for the desired parallax strength
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    });
}

// Add hover effect to project cards (optional, can be done with CSS)
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)'; // Already handled by CSS, keep for consistency or remove
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)'; // Already handled by CSS, keep for consistency or remove
    });
});

// Enhanced Text Animation for headings and paragraphs on scroll into view
document.addEventListener('DOMContentLoaded', () => {
    const animateTextElements = document.querySelectorAll('#home .home-text-content h1, #home .home-text-content p');

    const textAnimationObserverOptions = {
        threshold: 0.5
    };

    const textAnimationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const textElement = entry.target;
                const text = textElement.textContent;
                textElement.textContent = ''; // Clear the original text

                text.split('').forEach((char, index) => {
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.style.opacity = '0';
                    span.style.animation = `fadeIn 0.5s ease-in-out forwards`;
                    span.style.animationDelay = `${index * 0.03}s`; // Adjust delay for speed
                    textElement.appendChild(span);
                });

                observer.unobserve(textElement); // Stop observing once animated
            } else {
                 // Optional: reset animation when not in view
                 // textElement.innerHTML = textElement.textContent.replace(/<span>(.*?)<\/span>/g, '$1'); // Reset spans
            }
        });
    }, textAnimationObserverOptions);

    animateTextElements.forEach(element => {
        textAnimationObserver.observe(element);
    });
});

// Splash Screen Script
document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.querySelector('.splash-screen');
    const body = document.body;

    if (splashScreen && body) {
        // Show splash screen and prevent scrolling immediately
        splashScreen.classList.remove('hidden');
        body.classList.add('no-scroll');

        // Hide splash screen after a delay (e.g., 2 seconds) and re-enable scrolling
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            // Wait for the transition to finish before allowing scroll
            splashScreen.addEventListener('transitionend', () => {
                body.classList.remove('no-scroll');
            }, { once: true }); // Remove listener after it runs once
        }, 1800); // Duration the splash screen is visible (2000ms = 2 seconds)
    }
}); 