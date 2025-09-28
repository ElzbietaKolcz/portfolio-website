import { behanceFooter, gitHubFooter, linkedInFooter } from "../assets";

export default function Footer() {
  return (

    <div className="bg-primary-40 p-4 flex flex-row justify-between items-center">
      <p className="text-xs md:text-sm md:font-medium text-[#45024B]">
        {" "}
        © {new Date().getFullYear()} Copyright: Elżbieta Kołcz {" "}
      </p>
      <div className="flex space-x-2 ">
        <a
          href="https://www.behance.net/elbietakocz/"
          target="_blank"
          rel="noreferrer"
          id="behance-link"
          role="link"
          tabIndex="0"
          title="Open to Elzbieta Kolcz behance profile"
          aria-label="Link to Elzbieta Kolcz behance profile"
        >
          <img
            src={behanceFooter}
            alt="behance-logo"
          />
        </a>

        <a
          href="https://www.github.com/ElzbietaKolcz"
          target="_blank"
          rel="noreferrer"
          id="github-link"
          role="link"
          tabIndex="0"
          title="Open to Elzbieta Kolcz GitHub profile"
          aria-label="Link to Elzbieta Kolcz GitHub profile"
        >
          <img
            src={gitHubFooter}
            alt="gitHub-logo"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/elzbieta-kolcz"
          target="_blank"
          rel="noreferrer"
          id="linkedin-link"
          role="link"
          tabIndex="0"
          title="Open Elzbieta Kolcz LinkedIn profile"
          aria-label="Link to Elzbieta Kolcz LinkedIn profile"
        >
          <img
            src={linkedInFooter}
            alt="linkedIn-logo"
          />
        </a>
      </div>

    </div>
  );
}
