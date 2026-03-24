import { lazy, Suspense } from 'preact/compat';
import { useState, useEffect, useRef } from 'preact/hooks';
import { initScrollAnimations } from './utils/animations';
import styles from "./style";
import { LangContext } from "./LangContext";
import {
  Navbar,
  Home,
} from "./components";

const About = lazy(() => import('./components/About'));
import Preloader from "./components/Preloader";

const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function BackgroundDivider({ src, alt }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-dark="true"
      className={styles.bgAnimation}
      style={loaded ? { backgroundImage: `url("${src}")` } : undefined}
      role="img"
      aria-label={alt}
    />
  );
}


export default function App() {
  const [lang, setLang] = useState(() => document.documentElement.lang?.slice(0, 2) || "en");

  useEffect(() => {
    // Remove static hero placeholder now that React has rendered
    document.getElementById('static-hero')?.remove();

    initScrollAnimations();
  }, []);

  const setLanguage = (newLang) => {
    document.documentElement.lang = newLang;
    setLang(newLang);
  };

  return (
    <LangContext.Provider value={{ lang, setLang: setLanguage }}>
    <div className="w-full overflow-hidden text-black bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:rounded focus:shadow-lg focus:text-primary-100"
      >
        Skip to main content
      </a>
      <Preloader />
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <main id="main-content" role="main">
        <div className={`${styles.flexStart} mb-20`}>
          <div className={`${styles.boxWidth}`}>
            <Home />
          </div>
        </div>

        <Suspense fallback={
          <div
            className={styles.loadingOverlay}
            role="status"
            aria-label="Loading content, please wait"
            aria-live="polite"
          />
        }>
          <BackgroundDivider src="/background/bgImage01.webp" alt="A woman working on a website design project in Figma." />

          <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <About />
            </div>
          </div>

          <BackgroundDivider src="/background/bgImage02.webp" alt="A woman drawing different versions of a page's appearance." />

          <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <Projects />
            </div>
          </div>

          <BackgroundDivider src="/background/bgImage03.webp" alt="A woman sitting at a computer analyzing graphic designs made on paper." />

          <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <Skills />
            </div>
          </div>

          <BackgroundDivider src="/background/bgImage04.webp" alt="Elegantly dressed woman holding a diary and a pen." />

          <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <Contact />
            </div>
          </div>

          <div className="w-full">
            <Footer />
          </div>
        </Suspense>
      </main>
    </div>
    </LangContext.Provider>
  );
}
