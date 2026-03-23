import App from "./App";
import "./index.css";
import { render } from 'preact'
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  once: true,
  disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768,
});

render(<App />, document.getElementById('app'))
