import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

type Link = {
  text: string;
  url: string;
};

const links: Link[] = [];

interface Icon {
  icon: JSX.Element;
  url: string;
}

const icons: Icon[] = [
  {
    icon: <InstagramLogoIcon />,
    url: "https://www.instagram.com/my_kaizen_life/",
  },
  { icon: <TwitterLogoIcon />, url: "https://x.com/mykaizen_life" },
];

export function Footer() {
  return (
    <footer className="px-5 lg:px-10 p-5 max-w-7xl mx-auto">
      <div className="flex  gap-y-5 flex-row  items-center justify-between w-full gap-x-5">
        <div className="flex items-center gap-x-2">
          <img
            className="w-8 h-8 rounded-full"
            src="/kaizen-logo.svg"
            alt="magicui-logo"
          />
          <h2 className="font-bold text-neutral-900 dark:text-white">
            My Kaizen
          </h2>
        </div>

        <ul className="flex items-center justify-center gap-x-5">
          {links.map((link, index) => (
            <li
              key={index}
              className="text-[15px]/normal font-medium text-neutral-400 transition-all duration-100 ease-linear hover:text-neutral-900 hover:underline hover:underline-offset-4 dark:font-medium dark:text-neutral-400 hover:dark:text-neutral-100"
            >
              <a href={link.url}>{link.text}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-x-4">
          {icons.map((icon, index) => (
            <a
              key={index}
              href={icon.url}
              target="_blank"
              className="text-neutral-500 hover:text-neutral-900 hover:dark:text-white text-xl"
            >
              {icon.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
