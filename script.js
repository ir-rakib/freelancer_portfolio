    // Typing Animation
    const typingElement = document.getElementById('typing');
    const titles = ['Web Developer', 'UI/UX Designer', 'Digital Craftsman', 'Problem Solver'];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
      const currentTitle = titles[titleIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentTitle.length) {
        setTimeout(() => isDeleting = true, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
      }

      setTimeout(typeWriter, isDeleting ? 50 : 150);
    }

    typeWriter();

    // Scroll Progress
    window.addEventListener('scroll', () => {
      const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      document.getElementById('progressBar').style.width = scrolled + '%';
    });

    // Theme Toggle
    function toggleTheme() {
      document.body.classList.toggle('light-mode');
      const themeIcon = document.getElementById('themeIcon');
      
      if (document.body.classList.contains('light-mode')) {
        themeIcon.className = 'fas fa-moon';
      } else {
        themeIcon.className = 'fas fa-sun';
      }
    }

    // Work Section Navigation
    let currentWorkIndex = 0;
    const workSlides = document.querySelectorAll('.work-slide');
    const totalWorkSlides = workSlides.length;
    const workContainer = document.getElementById('workSlides');
    const slidesToShow = 3; // Fixed to show max 3 work items

    function updateWorkSlides() {
      const slideWidth = 100 / slidesToShow;
      workContainer.style.transform = `translateX(-${currentWorkIndex * (100 / slidesToShow)}%)`;
      
      // Update active class for visible slides
      workSlides.forEach((slide, index) => {
        slide.classList.toggle('active', 
          index >= currentWorkIndex && index < currentWorkIndex + slidesToShow
        );
      });
    }

    document.getElementById('workNext').addEventListener('click', () => {
      if (currentWorkIndex < totalWorkSlides - slidesToShow) {
        currentWorkIndex++;
      } else {
        currentWorkIndex = 0; // Loop back to start
      }
      updateWorkSlides();
    });

    document.getElementById('workPrev').addEventListener('click', () => {
      if (currentWorkIndex > 0) {
        currentWorkIndex--;
      } else {
        currentWorkIndex = totalWorkSlides - slidesToShow; // Loop to end
      }
      updateWorkSlides();
    });

    // Initialize work slides on load
    window.addEventListener('load', updateWorkSlides);

    // Improved Testimonial Slider
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-item');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    let testimonialInterval;

    function showTestimonial(index) {
      testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active');
        if (i === index) {
          testimonial.classList.add('active');
        }
      });
      
      testimonialDots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
          dot.classList.add('active');
        }
      });
      
      currentTestimonial = index;
    }

    function startTestimonialInterval() {
      testimonialInterval = setInterval(() => {
        let nextIndex = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(nextIndex);
      }, 5000);
    }

    // Initialize testimonial slider
    showTestimonial(0);
    startTestimonialInterval();

    // Testimonial dot navigation
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        clearInterval(testimonialInterval);
        showTestimonial(index);
        startTestimonialInterval();
      });
    });

    // Animate skill bars when section comes into view
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillBars.forEach(bar => {
            const percentage = bar.getAttribute('data-percentage');
            bar.style.width = percentage + '%';
          });
        }
      });
    }, {threshold: 0.5});
    
    document.querySelectorAll('.skill-bar-container').forEach(container => {
      skillsObserver.observe(container);
    });

    // Animate skill circles when section comes into view
    const skillCircles = document.querySelectorAll('.progress-circle');
    const circlesObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillCircles.forEach(circle => {
            const percentage = circle.getAttribute('data-percentage');
            const dashOffset = 283 - (283 * percentage) / 100;
            circle.style.strokeDashoffset = dashOffset;
          });
        }
      });
    }, {threshold: 0.5});
    
    document.querySelectorAll('.skill-circle').forEach(circle => {
      circlesObserver.observe(circle);
    });

    // Form submission using Formspree
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      fetch(this.action, {
        method: 'POST',
        body: new FormData(this),
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          submitBtn.textContent = 'Message Sent!';
          submitBtn.style.background = '#10b981';
          this.reset();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        submitBtn.textContent = 'Error! Try Again';
        submitBtn.style.background = '#ef4444';
        console.error('Error:', error);
      })
      .finally(() => {
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
        }, 3000);
      });
    });

    // Floating Particles
    function createParticles() {
      const particlesContainer = document.getElementById('particles');
      const numParticles = 20;
      
      for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particlesContainer.appendChild(particle);
      }
    }

    createParticles();
    // update date and time in footer
        function updateDateTimeFooter() {
          const el = document.getElementById('datetimeFooter');
          const now = new Date();
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' };
          const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
          const offset = now.getTimezoneOffset() / -60;
          const tz = offset >= 0 ? `+${String(offset).padStart(2, '0')}` : `${offset}`;
          const date = now.toLocaleDateString('en-US', options);
          el.textContent = `${time} ${tz} on ${date}`;
        }
        updateDateTimeFooter();
        setInterval(updateDateTimeFooter, 1000);