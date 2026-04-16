// ============================================
// EarnIt Website - Interactive Features
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation Scroll Effect ---
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // --- Mobile Nav Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        navToggle.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.classList.remove('active');
        });
    });

    // --- Animated Counter ---
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const start = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const ease = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(ease * target);

                if (target >= 1000000) {
                    counter.textContent = (current / 1000000).toFixed(1) + 'M+';
                } else if (target >= 1000) {
                    counter.textContent = (current / 1000).toFixed(0) + 'K+';
                } else {
                    counter.textContent = current.toLocaleString();
                }

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }

            requestAnimationFrame(update);
        });
    }

    // --- Intersection Observer for Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animateElements = document.querySelectorAll(
        '.feature-card, .step, .ai-feature, .family-card, .family-feature-card, .testimonial-card, .pricing-card'
    );

    animateElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.transitionDelay = `${index % 3 * 100}ms`;
        observer.observe(el);
    });

    // Trigger counter animation when hero stats come into view
    const heroStats = document.querySelector('.hero-stats');
    let countersAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // --- Pricing Toggle ---
    const pricingToggle = document.getElementById('pricingToggle');
    const monthlyLabel = document.getElementById('monthlyLabel');
    const annualLabel = document.getElementById('annualLabel');
    let isAnnual = false;

    pricingToggle.addEventListener('click', () => {
        isAnnual = !isAnnual;
        pricingToggle.classList.toggle('active', isAnnual);
        monthlyLabel.classList.toggle('active', !isAnnual);
        annualLabel.classList.toggle('active', isAnnual);

        // Update prices
        document.querySelectorAll('.price-amount[data-monthly]').forEach(el => {
            el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
        });

        document.querySelectorAll('.price-period[data-monthly]').forEach(el => {
            el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
        });
    });

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80;
                const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: position,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Phone Screen Animation (subtle float) ---
    const phoneMockups = document.querySelectorAll('.phone-mockup, .ai-phone');
    phoneMockups.forEach(phone => {
        let angle = 0;
        function floatAnimation() {
            angle += 0.015;
            const y = Math.sin(angle) * 8;
            const r = Math.sin(angle * 0.7) * 1;
            phone.style.transform = `translateY(${y}px) rotate(${r}deg)`;
            requestAnimationFrame(floatAnimation);
        }
        floatAnimation();
    });

    // --- Camera Rep Counter Animation ---
    const counterNumber = document.querySelector('.counter-number');
    if (counterNumber) {
        let rep = 0;
        const maxRep = 12;

        setInterval(() => {
            rep = (rep % maxRep) + 1;
            counterNumber.textContent = rep;
            counterNumber.style.transform = 'scale(1.15)';
            setTimeout(() => {
                counterNumber.style.transition = 'transform 0.3s ease';
                counterNumber.style.transform = 'scale(1)';
            }, 100);
        }, 2000);
    }

    // --- Streak Number Pulse ---
    const streakNumber = document.querySelector('.screen-streak-number');
    if (streakNumber) {
        setInterval(() => {
            streakNumber.style.transform = 'scale(1.08)';
            streakNumber.style.transition = 'transform 0.3s ease';
            setTimeout(() => {
                streakNumber.style.transform = 'scale(1)';
            }, 300);
        }, 4000);
    }

    // --- Workout Progress Bar Animation ---
    const workoutFill = document.querySelector('.workout-progress-fill');
    if (workoutFill) {
        let width = 66;
        let direction = 1;

        setInterval(() => {
            width += direction * 8;
            if (width >= 100) {
                width = 100;
                direction = -1;
                setTimeout(() => {
                    width = 0;
                    direction = 1;
                    workoutFill.style.width = '0%';
                }, 1000);
            }
            workoutFill.style.width = width + '%';
        }, 1500);
    }

    // --- Parallax on scroll for orbs ---
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        const orbs = document.querySelectorAll('.hero-gradient-orb');
        orbs.forEach((orb, i) => {
            const speed = (i + 1) * 0.03;
            orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // --- Exercise Video Play on Hover ---
    document.querySelectorAll('.exercise-card').forEach(card => {
        const video = card.querySelector('.exercise-video');
        if (!video) return;

        card.addEventListener('mouseenter', () => {
            video.play().catch(() => {});
        });

        card.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });

        // Touch: tap to toggle play
        card.addEventListener('click', () => {
            if (video.paused) {
                video.play().catch(() => {});
            } else {
                video.pause();
                video.currentTime = 0;
            }
        });
    });

});
