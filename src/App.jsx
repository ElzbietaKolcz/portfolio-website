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

function App() {
  return (
    <div className=" w-full overflow-hidden text-black bg-while">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={` ${styles.flexStart}`}>
        <div
          className={`${styles.boxWidth}`}
          id="home"
        >
          <Home />
        </div>
      </div>

      <div className={`${styles.bgAnimation} bg-bgImage01`} />

      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Projects />
        </div>
      </div>

      <div className={`${styles.bgAnimation} bg-bgImage02`} />

      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <About />
        </div>
      </div>

      <div className={`${styles.bgAnimation} bg-bgImage03`} />

      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Skills />
        </div>
      </div>

      <div className={`${styles.bgAnimation} bg-bgImage04`} />

      <div className="w-full">
        <Contact />
      </div>

      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}

export default App;
