const wrapper = document.getElementById('projectsWrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
const totalProjects = 5; 

// --- SLIDER LOGIC ---
function updateSlider() {
    wrapper.style.transform = `translateX(calc(${currentIndex} * -100% - (${currentIndex} * 50px)))`;
}

nextBtn.addEventListener('click', () => {
    if (currentIndex < totalProjects - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; 
    }
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalProjects - 1; 
    }
    updateSlider();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
});

// --- TOGGLE VIEWS LOGIC ---
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    // Select the specific buttons/triggers inside this card
    const caseStudyBtn = card.querySelector('.case-study-btn');
    const titleTrigger = card.querySelector('.title-trigger');
    
    // Updated variable to target the new single-image cover view
    const coverView = card.querySelector('.project-cover-view');
    const scrollView = card.querySelector('.project-scroll-view');

    // 1. Click "CASE STUDY" to show the scrollable image
    caseStudyBtn.addEventListener('click', () => {
        coverView.classList.remove('active');
        scrollView.classList.add('active');
        caseStudyBtn.classList.add('active');
    });

    // 2. Click the Project Title to return to the single cover image
    titleTrigger.addEventListener('click', () => {
        scrollView.classList.remove('active');
        coverView.classList.add('active');
        caseStudyBtn.classList.remove('active');
    });
});

// --- CONTACT FORM LOGIC ---
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevents the default page reload

    // UX: Give the user feedback that it's processing
    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;

    // Gather all the data from the form inputs
    const formData = new FormData(contactForm);
    
    // Web3Forms requires an access key to know where to route the email.
    // Replace the string below with your actual key in Step 3!
    formData.append("access_key", "cbc23cf2-dcb4-47a5-8203-b5326f7f03e0");

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            // Success state
            formStatus.textContent = "Message sent successfully! I'll be in touch soon.";
            formStatus.style.color = "#2B2B2B"; 
            formStatus.style.display = "block";
            contactForm.reset(); // Clears the form inputs
        } else {
            // API Error state
            formStatus.textContent = "Something went wrong. Please try again.";
            formStatus.style.color = "red";
            formStatus.style.display = "block";
        }
    } catch (error) {
        // Network Error state
        formStatus.textContent = "Network error. Please check your connection.";
        formStatus.style.color = "red";
        formStatus.style.display = "block";
    } finally {
        // Reset the button back to normal
        submitBtn.textContent = 'SEND';
        submitBtn.disabled = false;
        
        // Hide the status message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = "none";
        }, 5000);
    }
});

// --- HERO BLUR SPOTLIGHT LOGIC ---
const heroSection = document.querySelector('.hero');

// Function to calculate the exact pixel center of the section
function centerSpotlight() {
    const rect = heroSection.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Apply exact pixels instead of percentages
    heroSection.style.setProperty('--x', `${centerX}px`);
    heroSection.style.setProperty('--y', `${centerY}px`);
}

// 1. Center it perfectly the moment the page loads
centerSpotlight();

// 2. Recalculate the center if the user resizes their browser window
window.addEventListener('resize', centerSpotlight);

// 3. Track the mouse movement
heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    heroSection.style.setProperty('--x', `${x}px`);
    heroSection.style.setProperty('--y', `${y}px`);
});

// 4. Snap back to the exact pixel center when the mouse leaves the area
heroSection.addEventListener('mouseleave', centerSpotlight);