import { useEffect } from 'react';

export function Background() {
  useEffect(() => {
    const rand = (min:number, max:number) => Math.random() * (max - min) + min;
    const starsEl  = document.getElementById('stars')!;
    const cloudsEl = document.getElementById('clouds')!;

    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const x = rand(0,100), y = rand(0,100);
      star.style.left      = `${x}%`;
      star.style.top       = `${y}%`;
      star.style.width     = `${rand(1,3)}px`;
      star.style.height    = star.style.width;
      star.style.opacity   = `${rand(0.2,1)}`;
      star.style.animation = `twinkle ${rand(2,5)}s infinite alternate`;
      starsEl.appendChild(star);
    }

    for (let i = 0; i < 8; i++) {
      const cloud = document.createElement('div');
      cloud.className = 'cloud';
      const x = rand(0,100), y = rand(0,40);
      cloud.style.left    = `${x}%`;
      cloud.style.top     = `${y}%`;
      cloud.style.width   = `${rand(100,400)}px`;
      cloud.style.height  = `${rand(50,150)}px`;
      cloud.style.opacity = `${rand(0.1,0.4)}`;
      cloudsEl.appendChild(cloud);
    }
  }, []);
  return (
    <div className="background">
      <div className="stars"  id="stars"  />
      <div className="clouds" id="clouds" />
    </div>
  );
}
