import anime from 'animejs';
import confetti from 'canvas-confetti';
import { 
  createIcons, 
  Monitor, 
  ExternalLink, 
  Github, 
  Download, 
  Terminal, 
  BookOpen, 
  Copy, 
  Sliders, 
  FileCode, 
  Tablet, 
  Check, 
  Square, 
  Zap, 
  SunMedium, 
  Layout, 
  Cable, 
  SlidersHorizontal, 
  ChevronDown 
} from 'lucide';

// Initialize Selected Lucide Icons for small bundle size
createIcons({
  icons: {
    Monitor,
    ExternalLink,
    Github,
    Download,
    Terminal,
    BookOpen,
    Copy,
    Sliders,
    FileCode,
    Tablet,
    Check,
    Square,
    Zap,
    SunMedium,
    Layout,
    Cable,
    SlidersHorizontal,
    ChevronDown
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // 1. Hero Entrance Animations with Anime.js
  const heroTL = anime.timeline({
    easing: 'easeOutExpo',
    duration: 1200
  });

  heroTL
    .add({
      targets: '.hero-orb, .hero-orb-2, .hero-orb-3',
      scale: [0.7, 1],
      opacity: [0, 1],
      duration: 1800,
      delay: anime.stagger(200)
    }, 0)
    .add({
      targets: '.hero-title',
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 1000
    }, 200)
    .add({
      targets: '.hero-subtitle',
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 900
    }, 400)
    .add({
      targets: '.hero-cta, .hero-code',
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 800,
      delay: anime.stagger(150)
    }, 600)
    .add({
      targets: '.hero-stage',
      scale: [0.94, 1],
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 1200,
      easing: 'spring(1, 80, 12, 0)'
    }, 800)
    .add({
      targets: '.stat-card',
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 700,
      delay: anime.stagger(100)
    }, 1000);

  // 2. Continuous Ambient Float for Background Orbs
  anime({
    targets: '.hero-orb',
    translateX: [-25, 25],
    translateY: [-20, 20],
    duration: 7000,
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutQuad'
  });

  anime({
    targets: '.hero-orb-2',
    translateX: [20, -20],
    translateY: [25, -25],
    duration: 9000,
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutQuad'
  });

  // 3. Interactive Resolution Switcher
  const resButtons = document.querySelectorAll('.res-btn');
  const tabletContent = document.getElementById('tabletContent');
  const liveResLabel = document.getElementById('liveResLabel');

  resButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      resButtons.forEach(b => {
        b.classList.remove('active', 'bg-cyan-500', 'text-black');
        b.classList.add('bg-white/5', 'text-slate-300');
      });
      btn.classList.add('active', 'bg-cyan-500', 'text-black');
      btn.classList.remove('bg-white/5', 'text-slate-300');

      const res = btn.getAttribute('data-res');
      const scale = parseFloat(btn.getAttribute('data-scale'));

      if (liveResLabel) {
        liveResLabel.textContent = `${res} HiDPI`;
      }

      if (tabletContent) {
        anime({
          targets: tabletContent,
          scale: scale,
          duration: 400,
          easing: 'spring(1, 80, 10, 0)'
        });
      }
    });
  });

  // 4. One-Click Copy Install Command with Confetti
  const copyBtn = document.getElementById('copyBtn');
  const copyText = document.getElementById('copyText');
  const installCmd = document.getElementById('installCmd');

  if (copyBtn && installCmd) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(installCmd.textContent.trim()).then(() => {
        if (copyText) copyText.textContent = 'Copied!';
        copyBtn.classList.add('bg-emerald-500', 'text-black');

        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#6366f1', '#10b981']
        });

        setTimeout(() => {
          if (copyText) copyText.textContent = 'Copy';
          copyBtn.classList.remove('bg-emerald-500', 'text-black');
        }, 2500);
      });
    });
  }

  // 5. Interactive Terminal Simulator
  const simButtons = document.querySelectorAll('.sim-btn');
  const termOutput = document.getElementById('termOutput');

  const commandLogs = {
    'e2t -r 1440': [
      '<span class="text-cyan-400">user@mac ~ %</span> <span class="text-white">e2t -r 1440</span>',
      '⚡ Initializing Extended Display Canvas: 1440x900 HiDPI...',
      '🔄 Restarting Sunshine streaming daemon (10-bit HEVC)...',
      '📐 Positioning DeskPad canvas at origin (-1440, 0)...',
      '🔌 Reversing ADB ports (47984, 47989, 47990, 48010)...',
      '✨ <span class="text-emerald-400 font-bold">Extended display active: 1440x900 HiDPI @ 120 FPS!</span>'
    ],
    'm2t': [
      '<span class="text-cyan-400">user@mac ~ %</span> <span class="text-white">m2t</span>',
      '⚡ Configuring Mirror Mode (Main Screen)...',
      '🔄 Restarting Sunshine daemon...',
      '🔌 Reversing ADB streaming ports & launching Moonlight...',
      '✨ <span class="text-emerald-400 font-bold">Mirror display active at 120 FPS!</span>'
    ],
    't2stop': [
      '<span class="text-cyan-400">user@mac ~ %</span> <span class="text-white">t2stop</span>',
      '🛑 Stopping stream and preserving workspace...',
      '⏸️  Pausing active media in Chrome / Arc...',
      '📱 Stopping Moonlight on tablet...',
      '☀️ Sunshine daemon stopped.',
      '✅ <span class="text-emerald-400 font-bold">Stream stopped successfully. DeskPad canvas preserved.</span>'
    ],
    'tab-ctl status': [
      '<span class="text-cyan-400">user@mac ~ %</span> <span class="text-white">tab-ctl status</span>',
      '=== AndroiDisplay Status ===',
      '☀️ Sunshine Service: <span class="text-emerald-400">RUNNING</span>',
      '🖥️  DeskPad App:      <span class="text-emerald-400">RUNNING (Virtual Display Canvas)</span>',
      '📱 Android Tablet:   <span class="text-cyan-400">CONNECTED (USB 3.2 Gen 2)</span>'
    ]
  };

  simButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      const lines = commandLogs[cmd] || [];

      if (termOutput) {
        termOutput.innerHTML = '';
        lines.forEach((line, index) => {
          setTimeout(() => {
            const p = document.createElement('p');
            p.innerHTML = line;
            p.classList.add('animate-fade-in');
            termOutput.appendChild(p);
            termOutput.scrollTop = termOutput.scrollHeight;
          }, index * 120);
        });
      }
    });
  });

  // 6. Interactive FAQ Accordion
  const faqButtons = document.querySelectorAll('.faq-btn');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isHidden = content.classList.contains('hidden');

      if (isHidden) {
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
        anime({
          targets: content,
          opacity: [0, 1],
          translateY: [-8, 0],
          duration: 300,
          easing: 'easeOutQuad'
        });
      } else {
        content.classList.add('hidden');
        if (icon) icon.style.transform = 'rotate(0deg)';
      }
    });
  });
});
