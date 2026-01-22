// --- INTRO ANIMATION SEQUENCE ---
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.intro-hero');
    const navContent = document.querySelector('.intro-nav');
    const radioContent = document.querySelector('.intro-radio');

    setTimeout(() => {
        if(heroContent) heroContent.classList.add('visible');
    }, 500);

    setTimeout(() => {
        if(navContent) navContent.classList.add('visible');
    }, 1200);

    setTimeout(() => {
        if(radioContent) radioContent.classList.add('visible');
    }, 2000);
});


// --- TOAST SYSTEM ---
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    let icon = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <div class="toast-content">
            <h5>${type === 'success' ? 'Success' : 'Notice'}</h5>
            <p>${message}</p>
        </div>
    `;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// --- MOBILE MENU LOGIC ---
const menuToggle = document.getElementById('menu-toggle');
const mobileDrawer = document.getElementById('mobile-nav-drawer');
const mobileOverlay = document.getElementById('mobile-overlay');
const mobileCloseTrigger = document.getElementById('mobile-close-trigger');
const mobileLinkItems = document.querySelectorAll('.mobile-link-item');
const mobileListItems = document.querySelectorAll('.mobile-links-list li');

function toggleMenu() {
    const isOpen = mobileDrawer.classList.contains('active');
    
    menuToggle.classList.toggle('open');
    mobileDrawer.classList.toggle('active');
    mobileOverlay.classList.toggle('active');

    if (!isOpen) {
        mobileListItems.forEach((item, index) => {
            item.style.transition = 'none'; 
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        });
    } else {
        mobileListItems.forEach(item => {
            item.style.transition = 'none';
            item.style.opacity = '0';
        });
    }
}

menuToggle.addEventListener('click', toggleMenu);
mobileCloseTrigger.addEventListener('click', toggleMenu);
mobileOverlay.addEventListener('click', toggleMenu);
mobileLinkItems.forEach(item => {
    item.addEventListener('click', toggleMenu);
});

// --- SCROLL REVEAL ---
const revealElements = document.querySelectorAll('.reveal');
function checkReveal() {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        if(boxTop < triggerBottom) {
            box.classList.add('active');
        }
    });
}
window.addEventListener('scroll', checkReveal);
checkReveal();

// --- FIXED HEADER LOGIC (Hide on Down, Show on Up) ---
const mainHeader = document.getElementById('main-header');
let lastScrollTop = 0;
const scrollDelta = 5; // Minimum scroll distance to trigger direction change

window.addEventListener('scroll', function() {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    
    // Handle Glassmorphism Background Change
    if (st <= 0) {
        mainHeader.classList.remove('scrolled');
    } else {
        mainHeader.classList.add('scrolled');
    }

    // Handle Disappearing/Reappearing based on scroll direction
    // Only trigger if scroll distance is significant enough
    if (Math.abs(lastScrollTop - st) <= scrollDelta) {
        lastScrollTop = st <= 0 ? 0 : st;
        return;
    }

    if (st > lastScrollTop) {
        // Scrolling Down -> Hide nav
        mainHeader.classList.add('nav-hidden');
    } else {
        // Scrolling Up -> Show nav
        mainHeader.classList.remove('nav-hidden');
    }
    
    lastScrollTop = st <= 0 ? 0 : st;
});

// --- HISTORY SLIDER LOGIC ---
const historySlides = document.querySelectorAll('.history-slide');
const historyDots = document.querySelectorAll('.slider-dot');
let currentHistorySlide = 0;
let historyInterval;

function showHistorySlide(index) {
    historySlides.forEach(slide => slide.classList.remove('active'));
    historyDots.forEach(dot => dot.classList.remove('active'));

    if (index >= historySlides.length) index = 0; 
    if (index < 0) index = historySlides.length - 1;

    historySlides[index].classList.add('active');
    historyDots[index].classList.add('active');
    currentHistorySlide = index;
}

function startHistorySlider() {
    if (historyInterval) clearInterval(historyInterval);
    showHistorySlide(0);
    historyInterval = setInterval(() => {
        showHistorySlide(currentHistorySlide + 1);
    }, 5000);
}

window.manualSlide = function(index) {
    showHistorySlide(index);
    clearInterval(historyInterval);
    historyInterval = setInterval(() => {
        showHistorySlide(currentHistorySlide + 1);
    }, 5000);
}

document.addEventListener('DOMContentLoaded', startHistorySlider);

// --- RADIO PLAYER ---
const audio = document.getElementById('live-stream');
const radioContainer = document.getElementById('radio-container');
const expandTrigger = document.getElementById('expand-trigger');
const closeTrigger = document.getElementById('close-trigger');
const playBtn = document.getElementById('play-trigger');
const volSlider = document.getElementById('volume-slider');
const songTitle = document.getElementById('current-song');

audio.volume = 0.8;

expandTrigger.addEventListener('click', () => {
    radioContainer.classList.add('expanded');
});

closeTrigger.addEventListener('click', () => {
    radioContainer.classList.remove('expanded');
});

playBtn.addEventListener('click', () => {
    if (radioContainer.classList.contains('expanded')) {
        if (audio.paused) {
            audio.play().then(() => {
                playBtn.classList.add('playing');
            }).catch(e => {
                showToast('Click page to enable audio');
            });
        } else {
            audio.pause();
            playBtn.classList.remove('playing');
        }
    } else {
    }
});

volSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

audio.addEventListener('error', () => {
     showToast('Stream unavailable.');
     playBtn.classList.remove('playing');
});

// --- YOUTUBE MODAL LOGIC ---
const modal = document.getElementById('youtube-modal');
const iframe = document.getElementById('youtube-iframe');
const closeModal = document.querySelector('.close-modal');

window.openYouTubeModal = function(videoId) {
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    modal.classList.add('active');
};

closeModal.onclick = function() {
    modal.classList.remove('active');
    iframe.src = ""; 
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove('active');
        iframe.src = "";
    }
};

// --- MINISTRIES LOGIC ---
const ministriesData = [
    {
        label: "RETREAT CAMPS",
        title: "THREE TIMES A YEAR",
        desc: "Frequency: Three times a year<br>Months: March or April, August, and December<br>Purpose: Spiritual renewal, fellowship, and deep teaching",
        img: "images/retreat.jpg"
    },
    {
        label: "DESTINY GATHERING",
        title: "EVERY YEAR IN JUNE",
        desc: "Focus: Revival, prophetic alignment, and impartation<br>Audience: Open to all believers seeking purpose activation",
        img: "images/destin.jpg"
    },
    {
        label: "SCHOOL OF MINISTRY",
        title: "EVERY YEAR IN JULY",
        desc: "Purpose: Equipping ministers, intercessors, and spiritual leaders<br>Content: Biblical foundations, spiritual discipline, and practical ministry tools",
        img: "images/school of ministry.jpg"
    },
    {
        label: "BUSINESS SCHOOL",
        title: "EVERY YEAR IN AUGUST",
        desc: "Focus: Entrepreneurship and financial stewardship<br>Goal: Empower believers to thrive in business with kingdom principles",
        img: "images/thumbanail1.jpg"
    },
    {
        label: "DESTINY TRAINING DEPOT",
        title: "EVERY YEAR IN OCTOBER",
        desc: "Purpose: Leadership development and strategic mentorship<br>Audience: Those called to serve in ministry and community leadership",
        img: "images/home 2.jpg"
    }
];

const tabsContainer = document.getElementById('ministry-tabs');
const labelEl = document.getElementById('min-label');
const titleEl = document.getElementById('min-title');
const descEl = document.getElementById('min-desc');
const imgEl = document.getElementById('min-image');
const contentGrid = document.querySelector('.ministry-content-grid');

const minPrevBtn = document.getElementById('mobile-min-prev');
const minNextBtn = document.getElementById('mobile-min-next');

let currentMinIndex = 0;

ministriesData.forEach((min, index) => {
    const btn = document.createElement('button');
    btn.className = `ministry-tab ${index === 0 ? 'active' : ''}`;
    btn.textContent = min.label;
    btn.onclick = () => loadMinistry(index);
    tabsContainer.appendChild(btn);
});

loadMinistry(0);

function loadMinistry(index) {
    currentMinIndex = index;
    const tabs = document.querySelectorAll('.ministry-tab');
    tabs.forEach(t => t.classList.remove('active'));
    tabs[index].classList.add('active');

    contentGrid.classList.remove('fade-enter');
    void contentGrid.offsetWidth; 

    titleEl.textContent = ministriesData[index].label;
    labelEl.textContent = ministriesData[index].title;
    descEl.innerHTML = ministriesData[index].desc;
    imgEl.src = ministriesData[index].img;

    contentGrid.classList.add('fade-enter');
}

if(minPrevBtn && minNextBtn) {
    minPrevBtn.addEventListener('click', () => {
        let newIndex = currentMinIndex - 1;
        if (newIndex < 0) newIndex = ministriesData.length - 1;
        loadMinistry(newIndex);
    });

    minNextBtn.addEventListener('click', () => {
        let newIndex = currentMinIndex + 1;
        if (newIndex >= ministriesData.length) newIndex = 0;
        loadMinistry(newIndex);
    });
}

// --- MOBILE EVENTS CAROUSEL LOGIC ---
const eventGrid = document.querySelector('.events-grid');
const prevEventBtn = document.getElementById('mobile-event-prev');
const nextEventBtn = document.getElementById('mobile-event-next');

if(eventGrid && prevEventBtn && nextEventBtn) {
    let eventScrollAmount = 0;
    const scrollAmount = 350; 

    prevEventBtn.addEventListener('click', () => {
        eventGrid.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    nextEventBtn.addEventListener('click', () => {
        eventGrid.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
}