import { email, cvImage, linkedIn } from "../assets";
import SocialButton from "./SocialButton";
import EmailButton from "./EmailButton";
import styles from "../style";

export default function Contact() {
  return (
    <section
      id="contact"
    >
      <div className="container mx-auto pb-11 md:pb-6 ">
        <div className="flex items-center justify-center ">
          <h1 className={`${styles.heading1}`}>Let&apos;s chat!</h1>
        </div>

        <div className="flex justify-center pb-10 md:pb-8 ">
          <p className="mx-10 md:mx-20 ">
            I am more than happy to take the time and discuss how we can
            collaborate. I speak English and Polish.{" "}
          </p>
        </div>

        <div className={`${styles.flexCenter} flex-col lg:flex-row gap-8 pb-2`}>
          <EmailButton
            icon={email}
            text="Send me an email"
            copyText="contact@elzbietakol.cz"
          />
          <SocialButton
            icon={linkedIn}
            text="Send me a message"
            link="https://www.linkedin.com/in/"
          />
          <SocialButton
            icon={cvImage}
            text="Review CV"
            link="/CV/Kolcz_CV.pdf"
          />
        </div>
      </div>
    </section>
  );
};
