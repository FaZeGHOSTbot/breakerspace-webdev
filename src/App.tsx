import { useState, useEffect } from 'react';
import { Youtube, Instagram, Github, Twitter, Moon, Sun } from 'lucide-react';

function App() {
  // SYSTEM DEFAULT THEME
  const getSystemPref = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : getSystemPref();
  });

  const [scrollY, setScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  // SCROLL DETECTION (hide header on scroll-down)
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      if (window.scrollY > lastScroll && window.scrollY > 80) {
        setShowHeader(false); // hide
      } else {
        setShowHeader(true); // show
      }
      setLastScroll(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  // APPLY THEME CHANGES TO LOCALSTORAGE
  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  // COLORS
  const lightBg = '#fafcfe';
  const lightText = '#112233';
  const darkBg = '#001122';
  const darkText = '#ddeeff';

  const bgColor = isDark ? darkBg : lightBg;
  const textColor = isDark ? darkText : lightText;
  const accentColor = isDark ? '#ddeeff' : '#112233';
  const mutedColor = '#667788';

  const logoSvg = isDark
    ? '/breakerspace-light.svg'
    : '/breakerspace-dark.svg';

  const parallaxOffset = scrollY * 0.3;

  return (
    <div
      className="min-h-screen transition-colors duration-700"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* THEME BUTTON */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 hover:scale-110"
        style={{
          backgroundColor: isDark ? '#223344' : '#eef7ff',
          color: accentColor,
        }}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-500">
        <div
          className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between"
          style={{
            transform: showHeader ? "translateY(0)" : "translateY(-100%)",
            opacity: 1,
            transition: "transform 0.4s ease",
          }}
        >
          <button
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="flex items-center gap-3 cursor-pointer"
          >
            <img src={logoSvg} alt="BreakerSpace" className="w-10 h-10" />
            <h1
              className="text-2xl tracking-tight"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 300,
              }}
            >
              BreakerSpace
            </h1>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative">
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* PARALLAX BG LOGO */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              transform: `translateY(${parallaxOffset}px) rotate(${scrollY * 0.05}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={logoSvg}
                alt=""
                className="w-[400px] h-[400px] md:w-[700px] md:h-[700px]"
              />
            </div>
          </div>

          {/* FOREGROUND CONTENT */}
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <div
              className="mb-12 inline-block"
              style={{
                transform: `scale(${Math.max(1 - scrollY / 1000, 0.8)})`,
                opacity: Math.max(1 - scrollY / 400, 0),
                transition: 'transform 0.1s ease-out',
              }}
            >
              <img
                src={logoSvg}
                alt="BreakerSpace"
                className="w-32 h-32 mx-auto"
              />
            </div>

            <h2
              className="text-5xl md:text-7xl mb-6 tracking-tight"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 300,
                opacity: Math.max(1 - scrollY / 300, 0),
              }}
            >
              Break it till you make it
            </h2>

            <p
              className="text-xl md:text-2xl mb-12"
              style={{
                color: mutedColor,
                opacity: Math.max(1 - scrollY / 250, 0),
              }}
            >
              Review. Play. Build.
            </p>

            {/* SOCIAL LINKS */}
            <div
              className="flex gap-6 justify-center"
              style={{
                opacity: Math.max(1 - scrollY / 200, 0),
              }}
            >
              <SocialLink href="https://www.youtube.com/@BreakerSpace" icon={Youtube} label="YouTube" isDark={isDark} />
              <SocialLink href="https://instagram.com/BreakerSpace" icon={Instagram} label="Instagram" isDark={isDark} />
              <SocialLink href="https://x.com/BreakerSpaceHQ" icon={Twitter} label="Twitter" isDark={isDark} />
              <SocialLink href="https://github.com/debloper" icon={Github} label="GitHub" isDark={isDark} />
            </div>
          </div>

          {/* SCROLL INDICATOR */}
          <div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            style={{
              opacity: Math.max(1 - scrollY / 100, 0),
            }}
          >
            <div
              className="w-6 h-10 border-2 rounded-full flex justify-center pt-2"
              style={{ borderColor: mutedColor }}
            >
              <div
                className="w-1.5 h-3 rounded-full animate-bounce"
                style={{ backgroundColor: mutedColor }}
              />
            </div>
          </div>
        </section>

        {/* CARD SECTION */}
        <section className="min-h-screen flex items-center justify-center px-6 py-24">
          <div className="max-w-6xl w-full">
            <div className="grid md:grid-cols-3 gap-8">
              <Card title="Review" description="In-depth analysis of the latest technology, hardware, and software." isDark={isDark} />
              <Card title="Play" description="Hands-on experimentation with cutting-edge tech and creative projects." isDark={isDark} />
              <Card title="Build" description="Creating and sharing innovative solutions, prototypes, and ideas." isDark={isDark} />
            </div>
          </div>
        </section>

        {/* OUTRO TEXT */}
        <section className="min-h-[50vh] flex items-center justify-center px-6 py-24">
          <div className="text-center max-w-3xl">
            <h3
              className="text-3xl md:text-5xl mb-6 tracking-tight"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}
            >
              Exploring the future, one break at a time
            </h3>
            <p className="text-lg" style={{ color: mutedColor }}>
              Join us on our journey through technology, innovation, and creativity.
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-12 px-6 text-center" style={{ color: mutedColor }}>
        <p className="text-sm">© 2025 BreakerSpace. All rights reserved.</p>
      </footer>
    </div>
  );
}

function SocialLink({ href, icon: Icon, label, isDark }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 rounded-full transition-all duration-300 hover:scale-110"
      style={{
        backgroundColor: isDark ? '#223344' : '#eef7ff',
        color: isDark ? '#ddeeff' : '#112233',
      }}
      aria-label={label}
    >
      <Icon size={24} />
    </a>
  );
}

function Card({ title, description, isDark }) {
  return (
    <div
      className="p-6 md:p-8 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-xl"
      style={{
        backgroundColor: isDark ? '#112233' : '#ffffff',
        border: `1px solid ${isDark ? '#223344' : '#ddeeff'}`,
      }}
    >
      <h3
        className="text-2xl mb-4 tracking-tight"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 300,
          color: isDark ? '#ddeeff' : '#112233',
        }}
      >
        {title}
      </h3>
      <p style={{ color: '#667788', lineHeight: '1.7' }}>{description}</p>
    </div>
  );
}

export default App;
