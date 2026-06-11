import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

// Smoother replacement — simple scroll API
export const smoother = {
  paused: (_val: boolean) => {},
  scrollTop: (_val: number) => { window.scrollTo(0, _val); },
  scrollTo: (target: string | null, _smooth: boolean, _pos: string) => {
    if (!target) return;
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  },
};

const Navbar = () => {
  useEffect(() => {
    // Enable native smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth";

    // Scroll to top on load
    window.scrollTo(0, 0);

    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const el = e.currentTarget as HTMLAnchorElement;
          const section = el.getAttribute("data-href");
          if (section) {
            const target = document.querySelector(section);
            if (target) target.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });

    window.addEventListener("resize", () => {
      ScrollTrigger.refresh(true);
    });
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          <img src="/logo.jpg" alt="Logo" style={{ height: "40px", width: "auto", borderRadius: "50%" }} />
        </a>
        <a
          href="mailto:fadi.mirza7452@mail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          Fadi.mirza7452@mail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;