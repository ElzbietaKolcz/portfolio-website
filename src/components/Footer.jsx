import { behanceFooter, gitHubFooter, linkedInFooter } from "../assets";

export default function Footer() {
  return (
    <footer>
      <div className="bg-gray-300 p-4 flex flex-row justify-between items-center">
        <p className="text-xs">© 2023 Copyright: Elżbieta Kołcz</p>
        <div className="flex space-x-2">
          <a
            href="https://www.behance.net/elbietakocz/"
            target="_blank"
            rel="noreferrer"
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
          >
            <img
              src={linkedInFooter}
              alt="linkedIn-logo"
            />
          </a>
        </div>
      </div>
      <div className="bg-[#464751] p-2" />
    </footer>
  );
}
