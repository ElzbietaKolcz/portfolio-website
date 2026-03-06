import { lazy, Suspense } from 'preact/compat';
import styles from "./style";
import {
  Navbar,
  Home,
  About,
} from "./components";

const Projects = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./components/Projects')), 500)));
const Skills = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./components/Skills')), 500)));
const Contact = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./components/Contact')), 500)));
const Footer = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('./components/Footer')), 500)));


export default function App() {

  return (
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
          <div
            data-dark="true"
            className={`${styles.bgAnimation} bg-[url("/background/bgImage01.webp")]`}
            role="img"
            aria-label="A woman working on a website design project in Figma."
          />

          <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <Projects />
            </div>
          </div>

          <div
            data-dark="true"
            className={`${styles.bgAnimation} bg-[url("/background/bgImage02.webp")]`}
            role="img"
            aria-label="A woman drawing different versions of a page's appearance."
           
          />

          <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <About />
            </div>
          </div>

          <div
            data-dark="true"
            className={`${styles.bgAnimation} bg-[url("/background/bgImage03.webp")]`}
            role="img"
            aria-label="A woman sitting at a computer analyzing graphic designs made on paper."
          />

          <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <Skills />
            </div>
          </div>

          <div
            data-dark="true"
            className={`${styles.bgAnimation} bg-[url("/background/bgImage04.webp")]`}
            role="img"
            aria-label="Elegantly dressed woman holding a diary and a pen."
          />

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
  );
}
