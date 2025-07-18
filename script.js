// Navigation scroll effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// CTA button smooth scroll
document.querySelector('.cta-button').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections except hero
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Testimonials carousel
const testimonials = [
    "Very good delivery and response. Alex understood our requirements perfectly and delivered exactly what we needed.",
    "Alex delivered clean, efficient code on time and communicated proactively throughout the project.",
    "Outstanding work quality and fast turnaround. The AI solution exceeded our expectations completely."
];

let currentTestimonial = 0;
const testimonialText = document.getElementById('testimonial-text');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function updateTestimonial(index) {
    testimonialText.textContent = `"${testimonials[index]}"`;
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    currentTestimonial = index;
}

nextBtn.addEventListener('click', () => {
    const nextIndex = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial(nextIndex);
});

prevBtn.addEventListener('click', () => {
    const prevIndex = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    updateTestimonial(prevIndex);
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        updateTestimonial(index);
    });
});

// Modal functionality
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.getElementById('close-modal');
const contactForm = document.getElementById('contact-form');

openModalBtn.addEventListener('click', () => {
    modal.classList.add('open');
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('open');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('open');
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I\'ll get back to you soon.');
    modal.classList.remove('open');
    contactForm.reset();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
        modal.classList.remove('open');
    }
});

document.getElementById('contact-form').addEventListener('submit', async e => {
  e.preventDefault();

  const form = e.target;
  const payload = {
    fields: {
      Name: form.Name.value,
      Email: form.Email.value,
      Details: form.Details.value,
      // add other fields here as needed
    }
  };

  try {
    const resp = await fetch(
      'https://api.airtable.com/v0/appsbNsTNZIp4x3Yc/tblzAy8HApTLLlTpZ',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer patVQ7s1Hod0IhqL7'
        },
        body: JSON.stringify(payload)
      }
    );
    if (!resp.ok) throw new Error(`Airtable error: ${resp.status}`);
    alert('✅ Submitted successfully!');
    form.reset();
  } catch (err) {
    console.error(err);
    alert('❌ Submission failed. See console for details.');
  }
});
