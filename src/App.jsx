import styles from "./style";
import {
  Navbar,
  Home,
  About,
  Projects,
  Skills,
  Contact,
  Footer,
} from "./components";


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
        <div
          data-dark="true"
          className={`${styles.bgAnimation} bg-bgImage01`}
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
          className={`${styles.bgAnimation} w-full  bg-cover bg-center bg-bgImage02`}
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
          className={`${styles.bgAnimation} bg-bgImage03`}
          role="img"
          aria-label="A woman sitting at a computer analyzing graphic designs made on paper."
        />

        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Skills />
          </div>
        </div>
      </main>

      <footer role="contentinfo">
        <div
          className={`${styles.bgAnimation} bg-bgImage04`}
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
      </footer>
    </div>
  );
}
