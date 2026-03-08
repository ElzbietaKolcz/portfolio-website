import { lazy, Suspense } from 'preact/compat';
import { useState } from 'react';
import styles from "./style";
import { LangContext } from "./LangContext";
import {
  Navbar,
  Home,
  About,
} from "./components";

const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function BackgroundDivider({ src, alt }) {
  return (
    <div
      data-dark="true"
      className={styles.bgAnimation}
      style={{ backgroundImage: `url("${src}")` }}
      role="img"
      aria-label={alt}
    />
  );
}


export default function App() {
  const [lang, setLang] = useState(() => document.documentElement.lang?.slice(0, 2) || "en");

  const setLanguage = (newLang) => {
    document.documentElement.lang = newLang;
    setLang(newLang);
  };

  return (
    <LangContext.Provider value={{ lang, setLang: setLanguage }}>
    <div className="w-full overflow-hidden text-black bg-white">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div  className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div
      
        className={`${styles.flexStart}`}
        id="home"
      >
        <div 
        className={`${styles.boxWidth}`}>
          
          <Home />
        </div>
      </div>

      <main role="main">
        <Suspense fallback={<div className={styles.loadingOverlay} style={{ backgroundImage: 'url(/images/logo_gif.gif)' }}></div>}>
          <BackgroundDivider src="/background/bgImage01.webp" alt="A woman working on a website design project in Figma." />

          <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <Projects />
            </div>
          </div>

          <BackgroundDivider src="/background/bgImage02.webp" alt="A woman drawing different versions of a page's appearance." />

          <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <About />
            </div>
          </div>

          <BackgroundDivider src="/background/bgImage03.webp" alt="A woman sitting at a computer analyzing graphic designs made on paper." />

          <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <Skills />
            </div>
          </div>

          <BackgroundDivider src="/background/bgImage04.webp" alt="Elegantly dressed woman holding a diary and a pen." />

          <div className="w-full">
            <Contact />
          </div>

          <div className="w-full">
            <Footer />
          </div>
          <div className="bg-[#45024B] p-2" />
        </Suspense>
      </main>
    </div>
    </LangContext.Provider>
  );
}
