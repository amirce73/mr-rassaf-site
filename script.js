// تاریخ کنکور 1405 (تقریبی - معمولا در تیرماه برگزار می‌شود)
// توجه: این تاریخ ممکن است تغییر کند، پس در زمان مناسب آن را به روز کنید
const examDate = new Date('2026-07-02T08:00:00'); // 30 خرداد 1405 - ساعت 8 صبح

// عبارات انگیزشی برای نمایش
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

    // اگر زمان کنکور فرا رسیده باشد
    if (difference <= 0) {
        document.getElementById('countdown-days').textContent = '۰';
        document.getElementById('countdown-hours').textContent = '۰';
        document.getElementById('countdown-minutes').textContent = '۰';
        document.getElementById('countdown-seconds').textContent = '۰';
        document.getElementById('progress-bar').style.width = '100%';
        document.getElementById('progress-percentage').textContent = '100%';
        document.getElementById('motivation-text').textContent = 'کنکور به پایان رسیده است. بهترین نتایج را برای شما آرزومندیم!';
        return;
    }

    // محاسبه روز، ساعت، دقیقه و ثانیه باقی‌مانده
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // نمایش مقادیر در صفحه
    document.getElementById('countdown-days').textContent = days.toLocaleString('fa-IR');
    document.getElementById('countdown-hours').textContent = hours.toLocaleString('fa-IR');
    document.getElementById('countdown-minutes').textContent = minutes.toLocaleString('fa-IR');
    document.getElementById('countdown-seconds').textContent = seconds.toLocaleString('fa-IR');

    // محاسبه درصد پیشرفت (فرض می‌کنیم یک سال کامل تا کنکور زمان داریم)
    const startDate = new Date('2025-06-20T08:00:00'); // شروع فرضی یک سال قبل
    const totalTime = examDate - startDate;
    const elapsed = totalTime - difference;
    const progress = Math.min(100, Math.max(0, (elapsed / totalTime) * 100));

    document.getElementById('progress-bar').style.width = progress + '%';
    document.getElementById('progress-percentage').textContent = Math.round(progress) + '%';

    // تغییر عبارت انگیزشی هر 30 ثانیه
    if (seconds % 30 === 0) {
        const randomMotivation = motivations[Math.floor(Math.random() * motivations.length)];
        const motivationElement = document.getElementById('motivation-text');
        motivationElement.textContent = randomMotivation;

        // ریست و اجرای انیمیشن (اگر در CSS تعریف شده باشد)
        motivationElement.classList.remove('fade-text');
        void motivationElement.offsetWidth; // ترفند برای ریست انیمیشن
        motivationElement.classList.add('fade-text');
    }
}

// به روزرسانی شمارش معکوس هر ثانیه
setInterval(updateCountdown, 1000);
// اولین به روزرسانی بلافاصله پس از لود صفحه
updateCountdown();
const resumes = {
    rassaf: {
        title: 'مهندس مهدی رصاف — رزومه کامل',
        html: `
      <div class="resume-list">
        <div class="resume-item"><i class="fas fa-check-circle"></i>...</div>
        <!-- محتوای کامل رزومه مهندس رصاف -->
      </div>
    `
    },
    mazaheri: {
        title: 'دکتر علی مظاهری — رزومه کامل',
        html: `
      <div class="resume-list">
        <div class="resume-item"><i class="fas fa-check-circle"></i>...</div>
        <!-- محتوای کامل رزومه دکتر مظاهری -->
      </div>
    `
    }
};

const modal = document.getElementById('resumeModal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

function openModal(key) {
    const data = resumes[key];
    if (!data) return;
    modalTitle.textContent = data.title;
    modalContent.innerHTML = data.html;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
}

document.getElementById('btnContact').addEventListener('click', () => openModal('rassaf'));
document.getElementById('btnContact2').addEventListener('click', () => openModal('mazaheri'));
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});
