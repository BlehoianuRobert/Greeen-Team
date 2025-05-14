// background.js

// Helper to get a random number in [min, max)
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

// Create `count` stars inside #stars
function createStars(count = 150) {
  const container = document.getElementById('stars');
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';

    const x = rand(0, 100), y = rand(0, 100);
    const size = rand(0.5, 3);
    const opacity = rand(0.2, 0.9);
    const duration = rand(2, 6);
    const delay = rand(0, 5);

    star.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      opacity: ${opacity};
      animation: twinkle ${duration}s infinite alternate;
      animation-delay: ${delay}s;
    `;

    container.appendChild(star);
  }
}

// Create `count` clouds inside #clouds
function createClouds(count = 12) {
  const container = document.getElementById('clouds');
  for (let i = 0; i < count; i++) {
    const cloud = document.createElement('div');
    cloud.className = 'cloud';

    const x = rand(0, 100), y = rand(0, 100);
    const width = rand(100, 400), height = rand(50, 150);
    const opacity = rand(0.05, 0.25);

    cloud.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      width: ${width}px;
      height: ${height}px;
      opacity: ${opacity};
    `;

    container.appendChild(cloud);
  }
}

// Attach focus/blur listeners to inputs for a little highlight
function wireInputFocus() {
  const inputs = document.querySelectorAll('.input-field');
  inputs.forEach(input => {
    const wrapper = input.parentElement; // .input-group
    input.addEventListener('focus', () => {
      wrapper!.classList.add('focused');
    });
    input.addEventListener('blur', () => {
      if (!input.value) {
        wrapper!.classList.remove('focused');
      }
    });
  });
}

// Handle login button loading state
function wireLoginButton() {
  const loginBtn = document.querySelector('.login-btn') as HTMLButtonElement;
  const formContainer = document.querySelector('.login-container')!;
  if (!loginBtn) return;

  loginBtn.addEventListener('click', e => {
    e.preventDefault();
    loginBtn.textContent = 'Se conectează...';
    formContainer.classList.add('loading');

    setTimeout(() => {
      loginBtn.textContent = 'Conectare';
      formContainer.classList.remove('loading');
    }, 2000);
  });
}

// On window load, inject background div, then initialize everything
window.addEventListener('load', () => {
  // 1. Inject background element with its containers
  const bg = document.createElement('div');
  bg.className = 'background';
  bg.innerHTML = `
    <div class="stars" id="stars"></div>
    <div class="clouds" id="clouds"></div>
  `;
  document.body.prepend(bg);

  // 2. Generate stars and clouds
  createStars();
  createClouds();

  // 3. Wire up form interactions
  wireInputFocus();
  wireLoginButton();
});
