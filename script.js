document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        item.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
    
    // Carousel functionality
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    const slideInterval = 6000;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        // Reset text animation
        const textElement = slides[index].querySelector('.slide-title');
        if (textElement) {
            textElement.style.animation = 'none';
            void textElement.offsetWidth;
            textElement.style.animation = '';
        }
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Auto-rotate slides
    let intervalId = setInterval(nextSlide, slideInterval);
    
    // Manual navigation
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            clearInterval(intervalId);
            intervalId = setInterval(nextSlide, slideInterval);
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav item based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');
    const mobileNavItemsActive = document.querySelectorAll('.mobile-nav-item');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
        
        mobileNavItemsActive.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // CTA button interactions
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if it's an anchor link
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 100;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    return;
                }
            }
            
            // Show notification for other buttons
            let message;
            if (this.textContent.trim() === 'Get Started') {
                message = 'Welcome! Discover more about our community';
            } else if (this.textContent.trim() === 'Join Us This Sunday') {
                message = 'We look forward to seeing you this Sunday';
            } else if (this.textContent.trim() === 'Explore More') {
                message = 'Learn more about our values and beliefs';
            } else if (this.textContent.trim() === 'Join the Family') {
                message = 'Welcome! We\'re excited to have you join our family';
            } else if (this.textContent.trim() === 'Learn More') {
                message = 'Discover more about this ministry';
            } else if (this.textContent.trim() === 'Explore') {
                message = 'Explore this ministry in detail';
            } else if (this.textContent.trim() === 'Visit Our Channels') {
                message = 'Follow us on our digital platforms';
            } else if (this.textContent.trim() === 'Visit Channel' || 
                      this.textContent.trim() === 'Visit Page' || 
                      this.textContent.trim() === 'Follow Us') {
                message = 'Opening ' + this.closest('.channel-card').querySelector('.channel-title').textContent + ' in a new window';
            } else if (this.textContent.trim() === 'Find a Church Near You') {
                message = 'Finding the nearest ABC Global Church branch';
            }
            
            if (message) {
                showNotification(message);
            }
        });
    });
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(26, 26, 26, 0.9);
            color: white;
            padding: 15px 25px;
            border-left: 3px solid #e74c3c;
            border-radius: 2px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            backdrop-filter: blur(10px);
            font-size: 14px;
            max-width: 300px;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Add notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.content-card, .value-card, .channel-card, .giving-method, .contact-item').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // Add fadeInUp animation
    const fadeInStyle = document.createElement('style');
    fadeInStyle.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(fadeInStyle);
    
    // Ministries Section Functionality
    const ministryTabs = document.querySelectorAll('.ministry-tab');
    const ministryContent = document.querySelector('.ministry-content.desktop');
    const ministryCards = document.querySelectorAll('.ministry-card');
    
    // Ministry data
    const ministries = {
        'retreat-camps': {
            title: 'Retreat Camps',
            subtitle: 'Spiritual renewal and fellowship',
            text: 'Our retreat camps are held three times a year (March/April, August, and December) to provide opportunities for spiritual renewal, deep fellowship, and transformative teaching. These camps are designed to help believers disconnect from daily distractions and reconnect with God in a powerful way.',
            image: 'https://picsum.photos/seed/retreat-camp/800/600.jpg'
        },
        'destiny-gathering': {
            title: 'Destiny Gathering',
            subtitle: 'Revival and prophetic alignment',
            text: 'Held every year in June, the Destiny Gathering focuses on revival, prophetic alignment, and impartation. This event is open to all believers seeking purpose activation and a fresh encounter with God\'s presence.',
            image: 'https://picsum.photos/seed/destiny-gathering/800/600.jpg'
        },
        'school-of-ministry': {
            title: 'School of Ministry',
            subtitle: 'Equipping spiritual leaders',
            text: 'Held every year in July, our School of Ministry is designed to equip ministers, intercessors, and spiritual leaders with biblical foundations, spiritual discipline, and practical ministry tools for effective service.',
            image: 'https://picsum.photos/seed/school-of-ministry/800/600.jpg'
        },
        'business-school': {
            title: 'Kabigumila Business School',
            subtitle: 'Entrepreneurship with kingdom principles',
            text: 'Held every year in August, this school focuses on entrepreneurship and financial stewardship. Our goal is to empower believers to thrive in business with kingdom principles and create economic impact in their communities.',
            image: 'https://picsum.photos/seed/business-school/800/600.jpg'
        },
        'training-depot': {
            title: 'Destiny Training Depot',
            subtitle: 'Leadership development',
            text: 'Held every year in October, this program provides leadership development and strategic mentorship for those called to serve in ministry and community leadership. It\'s designed to sharpen skills and impart wisdom for effective leadership.',
            image: 'https://picsum.photos/seed/training-depot/800/600.jpg'
        }
    };
    
    // Update ministry display
    function updateMinistryDisplay(ministryId) {
        const ministry = ministries[ministryId];
        
        // Update desktop display
        if (ministryContent) {
            ministryContent.querySelector('.ministry-title').textContent = ministry.title;
            ministryContent.querySelector('.ministry-subtitle').textContent = ministry.subtitle;
            ministryContent.querySelector('.ministry-text').textContent = ministry.text;
            ministryContent.querySelector('.ministry-image img').src = ministry.image;
        }
        
        // Update mobile cards
        ministryCards.forEach(card => {
            card.classList.remove('active');
            if (card.dataset.ministry === ministryId) {
                card.classList.add('active');
                // Scroll to the active card on mobile
                if (window.innerWidth <= 768) {
                    card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                }
            }
        });
    }
    
    // Tab click event
    ministryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            ministryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update display
            const ministryId = tab.dataset.ministry;
            updateMinistryDisplay(ministryId);
        });
    });
    
    // Enhanced mobile card swipe functionality
    if (window.innerWidth <= 768) {
        const cardsContainer = document.querySelector('.ministry-cards.mobile');
        let isDown = false;
        let startX;
        let scrollLeft;
        let velocity = 0;
        let momentumID;
        
        cardsContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - cardsContainer.offsetLeft;
            scrollLeft = cardsContainer.scrollLeft;
            cancelMomentumTracking();
        });
        
        cardsContainer.addEventListener('mouseleave', () => {
            isDown = false;
            beginMomentumTracking();
        });
        
        cardsContainer.addEventListener('mouseup', () => {
            isDown = false;
            beginMomentumTracking();
        });
        
        cardsContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - cardsContainer.offsetLeft;
            const walk = (x - startX) * 2;
            const prevScrollLeft = cardsContainer.scrollLeft;
            cardsContainer.scrollLeft = scrollLeft - walk;
            velocity = prevScrollLeft - cardsContainer.scrollLeft;
        });
        
        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        cardsContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            cancelMomentumTracking();
        });
        
        cardsContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            beginMomentumTracking();
        });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // Swiped left
                navigateToNextCard();
            }
            if (touchEndX > touchStartX + 50) {
                // Swiped right
                navigateToPrevCard();
            }
        }
        
        function navigateToNextCard() {
            const activeCard = document.querySelector('.ministry-card.active');
            const nextCard = activeCard.nextElementSibling;
            if (nextCard) {
                const ministryId = nextCard.dataset.ministry;
                updateMinistryDisplay(ministryId);
                nextCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        }
        
        function navigateToPrevCard() {
            const activeCard = document.querySelector('.ministry-card.active');
            const prevCard = activeCard.previousElementSibling;
            if (prevCard) {
                const ministryId = prevCard.dataset.ministry;
                updateMinistryDisplay(ministryId);
                prevCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        }
        
        // Momentum scrolling
        function beginMomentumTracking() {
            clearInterval(momentumID);
            if (Math.abs(velocity) > 0.5) {
                momentumID = setInterval(() => {
                    cardsContainer.scrollLeft += velocity;
                    velocity *= 0.95; // Deceleration
                    if (Math.abs(velocity) < 0.5) {
                        clearInterval(momentumID);
                    }
                }, 20);
            }
        }
        
        function cancelMomentumTracking() {
            clearInterval(momentumID);
        }
        
        // Update active tab based on visible card
        cardsContainer.addEventListener('scroll', () => {
            const cards = document.querySelectorAll('.ministry-card');
            const containerCenter = cardsContainer.scrollLeft + cardsContainer.offsetWidth / 2;
            
            cards.forEach(card => {
                const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                if (Math.abs(containerCenter - cardCenter) < card.offsetWidth / 2) {
                    // Update active tab
                    const ministryId = card.dataset.ministry;
                    ministryTabs.forEach(tab => {
                        tab.classList.remove('active');
                        if (tab.dataset.ministry === ministryId) {
                            tab.classList.add('active');
                        }
                    });
                }
            });
        });
    }
    
    // Initialize with first ministry
    updateMinistryDisplay('retreat-camps');
    
    // Radio Player Functionality
    const radioPlayer = document.getElementById('radioPlayer');
    const radioIcon = document.getElementById('radioIcon');
    const radioControls = document.getElementById('radioControls');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const radioStatus = document.getElementById('radioStatus');
    const radio = document.getElementById('radio');
    
    // Toggle radio player expanded state
    radioIcon.addEventListener('click', () => {
        radioPlayer.classList.toggle('expanded');
    });
    
    // Play/Pause functionality
    let isPlaying = false;
    
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            radio.pause();
            playPauseBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
            `;
            radioStatus.textContent = 'Paused';
            isPlaying = false;
        } else {
            radio.play().catch(error => {
                console.error('Error playing radio:', error);
                radioStatus.textContent = 'Error loading stream';
            });
            playPauseBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
            `;
            radioStatus.textContent = 'Playing live';
            isPlaying = true;
        }
    });
    
    // Volume control
    volumeSlider.addEventListener('input', () => {
        radio.volume = volumeSlider.value;
    });
    
    // Set initial volume
    radio.volume = 0.7;
    
    // Update radio status based on audio events
    radio.addEventListener('loadstart', () => {
        radioStatus.textContent = 'Loading...';
    });
    
    radio.addEventListener('canplay', () => {
        radioStatus.textContent = 'Ready to play';
    });
    
    radio.addEventListener('playing', () => {
        radioStatus.textContent = 'Playing live';
        isPlaying = true;
        playPauseBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
        `;
    });
    
    radio.addEventListener('pause', () => {
        radioStatus.textContent = 'Paused';
        isPlaying = false;
        playPauseBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
        `;
    });
    
    radio.addEventListener('error', () => {
        radioStatus.textContent = 'Error loading stream';
        isPlaying = false;
        playPauseBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
        `;
    });
    
    // Close radio player when clicking outside
    document.addEventListener('click', (e) => {
        if (!radioPlayer.contains(e.target) && radioPlayer.classList.contains('expanded')) {
            radioPlayer.classList.remove('expanded');
        }
    });
});