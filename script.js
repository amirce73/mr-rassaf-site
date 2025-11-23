// Consolidated frontend behavior for index.html
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonials_prev');
    const nextBtn = document.querySelector('.testimonials_next');
    let currentSlide = 0;
    const totalSlides = slides.length;

    // تابع نمایش اسلاید
    function showSlide(index) {
        // حذف کلاس active از همه اسلایدها و نقاط
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // تنظیم اسلاید فعلی
        currentSlide = (index + totalSlides) % totalSlides;

        // اضافه کردن کلاس active به اسلاید و نقطه مربوطه
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // رویداد کلیک برای دکمه قبلی
    prevBtn.addEventListener('click', function() {
        showSlide(currentSlide - 1);
        // افکت کلیک
        this.classList.add('clicked');
        setTimeout(() => this.classList.remove('clicked'), 350);
    });

    // رویداد کلیک برای دکمه بعدی
    nextBtn.addEventListener('click', function() {
        showSlide(currentSlide + 1);
        // افکت کلیک
        this.classList.add('clicked');
        setTimeout(() => this.classList.remove('clicked'), 350);
    });

    // رویداد کلیک برای نقاط
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });

    // // اسلاید خودکار (اختیاری)
    // let slideInterval = setInterval(() => {
    //     showSlide(currentSlide + 1);
    // }, 5000);

    // // توقف اسلاید خودکار هنگام هاور
    const sliderWrapper = document.querySelector('.slider-wrapper');
    // sliderWrapper.addEventListener('mouseenter', () => {
    //     clearInterval(slideInterval);
    // });

    // sliderWrapper.addEventListener('mouseleave', () => {
    //     slideInterval = setInterval(() => {
    //         showSlide(currentSlide + 1);
    //     }, 5000);
    // });

    // پشتیبانی از سوایپ برای موبایل
    let startX = 0;
    let endX = 0;

    sliderWrapper.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    sliderWrapper.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const diff = startX - endX;
        if (Math.abs(diff) > 50) { // حداقل فاصله برای تشخیص سوایپ
            if (diff > 0) {
                showSlide(currentSlide + 1); // سوایپ به چپ - اسلاید بعدی
            } else {
                showSlide(currentSlide - 1); // سوایپ به راست - اسلاید قبلی
            }
        }
    }

    /* ====== Counters (accepts cards) ====== */
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target') || 0;
            const count = +counter.innerText.replace(/\D/g, '') || 0;
            const speed = 40;
            const increment = Math.max(1, Math.floor(target / 100));

            if (count < target) {
                counter.innerText = Math.min(target, count + increment);
                setTimeout(updateCount, speed);
            } else {
                counter.innerText = target.toLocaleString('fa-IR');
            }
        };
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.disconnect();
            }
        });
        observer.observe(counter);
    });

    // شمارنده‌ی نرم و روان برای هر عدد
    // const counters = document.querySelectorAll('.counter');
    // counters.forEach(counter => {
    //     const updateCount = () => {
    //         const target = +counter.getAttribute('data-target');
    //         const count = +counter.innerText;
    //         const speed = 40; // عدد کمتر = سرعت بیشتر
    //         const increment = target / 100;
    //
    //         if (count < target) {
    //             counter.innerText = Math.ceil(count + increment);
    //             setTimeout(updateCount, speed);
    //         } else {
    //             counter.innerText = target.toLocaleString('fa-IR');
    //         }
    //     };
    //     const observer = new IntersectionObserver(entries => {
    //         if (entries[0].isIntersecting) {
    //             updateCount();
    //             observer.disconnect();
    //         }
    //     });
    //     observer.observe(counter);
    // });
    /* ====== Countdown ====== */
    const examDate = new Date('2026-07-02T08:00:00');
    const motivations = [
        "امروز بهترین روز برای شروع است!",
        "هر روز یک قدم به موفقیت نزدیک‌تر می‌شوید.",
        "ثبات و پایداری در مطالعه، کلید موفقیت است.",
        "به خودتان ایمان داشته باشید، شما می‌توانید!",
        "هر ساعت مطالعه ارزشمند، نتیجه‌ای درخشان خواهد داشت.",
        "اشتیاق و پشتکار شما را به هدف می‌رساند.",
        "کنکور یک مسابقه نیست، یک سفر است که شما برنده آن خواهید بود.",
        "با برنامه‌ریزی مناسب، رسیدن به هدف قطعی است.",
        "مهندس رصاف و دکتر مظاهری در این مسیر همراه شما هستند.",
        "موفقیت در کنکور، آغاز راه موفقیت‌های بزرگتر است."
    ];

    function updateCountdown() {
        const now = new Date();
        const difference = examDate - now;
        const daysEl = document.getElementById('countdown-days');
        const hoursEl = document.getElementById('countdown-hours');
        const minutesEl = document.getElementById('countdown-minutes');
        const secondsEl = document.getElementById('countdown-seconds');
        const progressBar = document.getElementById('progress-bar');
        const progressPct = document.getElementById('progress-percentage');
        const motivationEl = document.getElementById('motivation-text');

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        if (difference <= 0) {
            daysEl.textContent = '۰'; hoursEl.textContent = '۰'; minutesEl.textContent = '۰'; secondsEl.textContent = '۰';
            if (progressBar) progressBar.style.width = '100%';
            if (progressPct) progressPct.textContent = '100%';
            if (motivationEl) motivationEl.textContent = 'کنکور به پایان رسیده است. بهترین نتایج را برای شما آرزومندیم!';
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysEl.textContent = days.toLocaleString('fa-IR');
        hoursEl.textContent = hours.toLocaleString('fa-IR');
        minutesEl.textContent = minutes.toLocaleString('fa-IR');
        secondsEl.textContent = seconds.toLocaleString('fa-IR');

        const startDate = new Date('2025-06-20T08:00:00');
        const totalTime = examDate - startDate;
        const elapsed = totalTime - difference;
        const progress = Math.min(100, Math.max(0, (elapsed / totalTime) * 100));
        if (progressBar) progressBar.style.width = progress + '%';
        if (progressPct) progressPct.textContent = Math.round(progress) + '%';

        if (motivationEl && (seconds % 30 === 0)) {
            const randomMotivation = motivations[Math.floor(Math.random() * motivations.length)];
            motivationEl.textContent = randomMotivation;
            motivationEl.classList.remove('fade-text');
            void motivationEl.offsetWidth;
            motivationEl.classList.add('fade-text');
        }
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();

    /* ====== Modal resumes ====== */
    const resumes = {
        rassaf: {
            title: 'مهندس مهدی رصاف — رزومه کامل',
            html: `

        <div class="resume-list">
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>فارغ‌التحصیل کارشناسی ارشد مهندسی مکانیک</div></div>
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>عضو سابق بنیاد ملی نخبگان</div></div>
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>عضو سابق خانه ریاضیات اصفهان</div></div>
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>مشاور رتبه های ۹، ۲۲، ۳۴، ۳۸، ۳۹، ۴۹، ۵۲، ۷۷، دوتا ۷۸، ۸۳ و بیش از ۵۰۰ قبولی عالی‌رتبه دیگر</div></div>
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>مخترع بیش از 2 اختراع ثبت‌شده در اداره ثبت اختراعات ایران</div></div>
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>نویسنده بیش از ده مقالهٔ تخصصی مهندسی مکانیک در ژورنال‌های داخلی و خارجی</div></div>

          <div style="height:8px"></div>

          <div><strong>دستاوردها :</strong></div>
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>اولین و باسابقه ترین مربی انگیزشی و لایف کوچ در اصفهان</div></div>
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>مشاور صدها دانش آموز سمپاد مدارس اژه‌ای و فرزانگان</div></div>
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>برگزار کننده بزرگترین همایش مشاوره کنکور در اصفهان</div></div>
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>مؤسس اولین پانسیون مطالعاتی کنکور در اصفهان</div></div>
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>بنیان گزار مجهزترین پانسیون مطالعاتی کنکور حال حاضر اصفهان</div></div>
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>طراح روش های مطالعاتی دروس اختصاصی و عمومی کنکور</div></div>
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>طراح و مجری برگزاری کارگاههای روش آزمون دادن</div></div>
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>ارائه دهنده جامع ترین فرم تحلیل آزمونهای آزمایشی</div></div>
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>برگزار کننده بزرگترین اردوهای مطالعاتی نوروز در اصفهان</div></div>
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>بیش از ۶ سال سابقه درخشان در مشاوره‌ی رتبه های برتر اصفهان و ایران</div></div>

          <div style="height:12px"></div>

          <div><strong>تماس و مشاوره:</strong></div>

          <div style="height:5px"></div>


          <a href="https://instagram.com/mehdirasaf" target="_blank" class="instagram-icon">
            <i class="fa-brands fa-instagram" aria-hidden="true"></i>
            <div>mehdirasaf@</div>
          </a>
        </div>
      `
        },
        mazaheri: {
            title: 'دکتر علی مظاهری — رزومه کامل',
            html: `
        <div class="resume-list">
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>دکتری مهندسی مکانیک ساخت و تولید</div></div>
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>بازرس مؤسسه قلمچی سال‌های ۱۳۹۰ تا ۱۳۹۲</div></div>
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>مدیر گروه کارشناسی ارشد قلمچی سال‌های ۱۳۹۲ تا ۱۳۹۳</div></div>
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>مدیر حوزه کارشناسی قلمچی سال‌های ۱۳۹۳ تا ۱۳۹۵</div></div>
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>مشاور رتبه های ۷، ۹، ۱۶، ۲۲، ۲۷، ۳۴، ۳۹، ۴۹، دوتا ۵۲، ۷۷، دوتا ۷۸، ۸۳ و ۸۸ و بیش از ۵۰۰ قبولی عالی‌رتبه دیگر</div></div>

          <div style="height:8px"></div>

          <div><strong>دستاوردها:</strong></div>
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>مشاور صدها دانش آموز سمپاد مدارس اژه‌ای و فرزانگان</div></div>
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>برگزار کننده بزرگترین همایش مشاوره کنکور در اصفهان</div></div>
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>مؤسس اولین پانسیون مطالعاتی کنکور در اصفهان</div></div>
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>بنیان گزار مجهزترین پانسیون مطالعاتی کنکور حال حاضر اصفهان</div></div>
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>برگزار کننده بزرگترین اردوهای مطالعاتی نوروز در اصفهان</div></div>
          <div class="resume-item"><i class="fas fa-check-circle" aria-hidden="true"></i><div>بیش از ۱۰ سال سابقه درخشان در مشاوره‌ی رتبه های برتر اصفهان و ایران</div></div>

          <div style="height:12px"></div>

          <div><strong>تماس و مشاوره:</strong></div>

          <div style="height:5px"></div>


          <a href="https://instagram.com/Dr_alimazaheri" target="_blank" class="instagram-icon">
            <i class="fa-brands fa-instagram" aria-hidden="true"></i>
            <div>Dr_alimazaheri@</div>
          </a>
        </div>
      `
        }
    };

    const modal = document.getElementById('resumeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.getElementById('modalClose');

    function openModal(key, triggerEl) {
        const data = resumes[key];
        if (!data) return;
        modalTitle.textContent = data.title;
        modalContent.innerHTML = data.html;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        setTimeout(() => modalContent.focus(), 60);
        modal._trigger = triggerEl;
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        if (modal && modal._trigger) modal._trigger.focus();
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }

    const btn1 = document.getElementById('btnContact');
    const btn2 = document.getElementById('btnContact2');
    if (btn1) btn1.addEventListener('click', (e) => openModal('rassaf', e.currentTarget));
    if (btn2) btn2.addEventListener('click', (e) => openModal('mazaheri', e.currentTarget));
    if (modalClose) modalClose.addEventListener('click', closeModal);
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
    if (modal) modal.addEventListener('click', (ev) => { if (ev.target === modal) closeModal(); });

    /* ====== Click animation + redirect helpers ====== */
    function addClickAnimationAndRedirect(button, url) {
        if (!button) return;
        button.addEventListener('click', function (e) {
            e.preventDefault();
            button.classList.add('clicked');
            setTimeout(() => {
                if (typeof url === 'string' && url.startsWith('#')) {
                    const target = document.querySelector(url);
                    if (target) {
                        target.scrollIntoView({behavior: 'smooth', block: 'start'});
                        history.replaceState(null, '', url);
                    } else {
                        window.location.href = url;
                    }
                } else {
                    window.location.href = url;
                }
            }, 350);
        });
    }

    addClickAnimationAndRedirect(document.getElementById('btnRegister'), 'register.html');
    addClickAnimationAndRedirect(document.getElementById('btnLogin'), 'login.html');
    addClickAnimationAndRedirect(document.getElementById('btnRegisterNav'), 'register.html');
    addClickAnimationAndRedirect(document.getElementById('btnLoginNav'), 'login.html');

    /* ====== Smooth scroll for nav links ====== */
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            const hash = this.getAttribute('href');
            const target = document.querySelector(hash);
            if (target) target.scrollIntoView({behavior: 'smooth', block: 'start'});
            history.replaceState(null, '', hash);
        });
    });

    /* ====== Contact form handling (fallback to localStorage) ====== */
    (function () {
        const form = document.getElementById('contactForm');
        if (!form) return;
        const successBox = document.getElementById('formSuccess');
        const errorBox = document.getElementById('formError');
        const btn = document.getElementById('btnSendContact');

        function showSuccess() {
            if (errorBox) errorBox.style.display = 'none';
            if (successBox) successBox.style.display = 'block';
            if (btn) { btn.disabled = true; btn.classList.add('opacity-70'); }
            setTimeout(() => {
                if (successBox) successBox.style.display = 'none';
                if (btn) { btn.disabled = false; btn.classList.remove('opacity-70'); }
                form.reset();
            }, 4500);
        }

        function showError() {
            if (successBox) successBox.style.display = 'none';
            if (errorBox) errorBox.style.display = 'block';
            setTimeout(() => { if (errorBox) errorBox.style.display = 'none'; }, 5000);
        }

        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const name = form.name?.value.trim();
            const phone = form.phone?.value.trim();
            const email = form.email?.value.trim();
            const message = form.message?.value.trim();
            if (!name || !phone || !message) { showError(); return; }
            const payload = {name, phone, email, message, createdAt: new Date().toISOString()};
            try {
                const res = await fetch('/api/contact', {
                    method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)
                });
                if (res.ok) { showSuccess(); return; }
                throw new Error('server error');
            } catch (err) {
                try {
                    const prev = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
                    prev.push(payload);
                    localStorage.setItem('contact_submissions', JSON.stringify(prev));
                    showSuccess();
                } catch (e) { console.error(e); showError(); }
            }
        });
    })();

});
// document.addEventListener("DOMContentLoaded", () => {
//     const testimonialSlider = document.querySelector(".testimonials-section");
//     const slides = testimonialSlider.querySelectorAll(".slide");
//     const prevBtn = testimonialSlider.querySelector(".prev");
//     const nextBtn = testimonialSlider.querySelector(".next");
//
//     let currentIndex = 0;
//
//     function showSlide(index) {
//         // نمایش اسلاید مناسب
//         slides.forEach((slide, i) => {
//             slide.classList.toggle("active", i === index);
//         });
//     }
//
//     function nextSlide() {
//         currentIndex = (currentIndex + 1) % slides.length;
//         showSlide(currentIndex);
//     }
//
//     function prevSlide() {
//         currentIndex = (currentIndex - 1 + slides.length) % slides.length;
//         showSlide(currentIndex);
//     }
//
//     nextBtn.addEventListener("click", nextSlide);
//     prevBtn.addEventListener("click", prevSlide);
// });
