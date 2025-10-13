// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
            });
        });
    }
});

// Enhanced form validation for candidatura.html
if (document.getElementById('application-form')) {
    const form = document.getElementById('application-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all required fields
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'var(--warning)';
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        if (!isValid) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Candidatura enviada com sucesso! Entraremos em contato em breve.');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Redirect to home page after successful submission
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }, 2000);
    });
}
