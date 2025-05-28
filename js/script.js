document.addEventListener('DOMContentLoaded', function() {
    const reaveal = document.querySelectorAll('.scroll-reaveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });
    reaveal.forEach(element => {
        observer.observe(element);
    });
});

// Display nav bar
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.sticky-nav');
    const heroLogo = document.querySelector('.hero .logo');
    const navBtn = document.querySelector('.nav-btn');

    // Show sticky nav after scrolling 60vh
    if (window.scrollY > window.innerHeight * 0.1) {
        nav.classList.add('active');
        heroLogo.classList.add('shrink');
    } else {
        nav.classList.remove('active');
        heroLogo.classList.remove('shrink');
    }

    // Gradual fade-in for button between 56vh and 58vh
    const fadeStart = window.innerHeight * 0.18;
    const fadeEnd = window.innerHeight * 0.75;

    if (window.scrollY < fadeStart) {
        navBtn.style.opacity = '0';
    } else if (window.scrollY >= fadeEnd) {
        navBtn.style.opacity = '1';
    } else {
        const progress = (window.scrollY - fadeStart) / (fadeEnd - fadeStart);
        navBtn.style.opacity = progress.toFixed(2);
    }
});

// Function to open modal
function openModal() {
    document.getElementById('modal-notify').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Function to close modal
function closeModal() {
    document.getElementById('modal-notify').style.display = 'none';
    document.body.style.overflow = 'auto'; // restore scroll
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('modal-notify');
    if (event.target === modal) { closeModal(); }
}

// Function to handle form submission
function submitForm(event) {
    event.preventDefault(); // Prevent form submission
    // Extract form data
    const name = event.target.name.value.trim();
    const email = event.target.email.value.trm;
    const message = event.target.message.value;
    // Show alert (for demonstration purposes, no back-end logic)
    alert(`Thank you for subscribing, ${name}! We will notify you at ${email}.`);
    // Close the modal after submission
    closeModal();
    // Clear the form
    event.target.reset();
}

// Waits until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('notify-form');
    form.addEventListener('submit', submitForm);
});