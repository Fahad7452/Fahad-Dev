import { useEffect } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  technologies: string;
  image: string;
  link?: string;
}

const projects: Project[] = [
  {
    title: "Mood Refresh",
    description:
      "AI-powered interior design SaaS with conversational quiz and curated mood boards",
    technologies:
      "Next.js 15, React 19, TypeScript, Tailwind CSS, Medusa V2, PostgreSQL, Stripe, Framer Motion, Docker",
    image: "/projects/moodrefresh.png",
    link: "https://moodrefresh.com",
  },
  {
    title: "BrandsAPI",
    description:
      "High-performance Brand Data API platform for retrieving complete brand assets and metadata",
    technologies:
      "Next.js, TypeScript, Tailwind CSS, MongoDB, Prisma, Firebase, Stripe, Shadcn",
    image: "/projects/brand-api.png",
    link: "https://www.brandsapi.com",
  },
  {
    title: "Slasher",
    description:
      "Horror social media platform with real-time messaging and user relationships",
    technologies:
      "React Native, TypeScript, NestJS, Socket.IO, MongoDB, AWS EC2, Docker",
    image: "/projects/slasher.png",
    link: "",
  },
  {
    title: "PasswordPact / 911Vault",
    description:
      "Secure web and mobile app for encrypted file sharing and digital legacy planning",
    technologies:
      "Next.js, React, TypeScript, Firebase, MongoDB, Django-Python, AWS, Stripe, Tailwind CSS",
    image: "/projects/passwordpact.png",
    link: "https://passwordpact.com",
  },
  {
    title: "Gullabs",
    description:
      "AI-powered ad generation platform for creating UGC video ads and campaigns",
    technologies:
      "Next.js, React, TypeScript, Node.js, MongoDB, Shopify, Firebase, Algolia",
    image: "/projects/gullabs.png",
    link: "https://www.gullabs.com",
  },
  {
    title: "Cover Up Online",
    description:
      "Global e-commerce platform with admin dashboard and ERP integration",
    technologies:
      "Next.js 14, React 18, Firebase, Firestore, Algolia, Odoo ERP",
    image: "/projects/coverup.png",
    link: "https://coveruponline.com",
  },
  {
    title: "DevicePin",
    description:
      "Full-stack platform for AI-powered software, web, and mobile solutions",
    technologies: "Next.js, TypeScript, Node.js, MongoDB, AWS",
    image: "/projects/deveicepin.png",
    link: "https://devicepin.com",
  },
];

const Work = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      const workFlex = document.querySelector(".work-flex") as HTMLElement;
      const workBoxes = document.querySelectorAll(".work-box");

      if (!workFlex || workBoxes.length === 0) return;

      let totalWidth = 0;
      workBoxes.forEach((box) => {
        totalWidth += (box as HTMLElement).offsetWidth;
      });

      const viewportWidth =
        workFlex.parentElement?.offsetWidth || window.innerWidth;
      const scrollDistance = totalWidth - viewportWidth;

      console.log(
        "Total Width:",
        totalWidth,
        "Viewport:",
        viewportWidth,
        "Scroll Distance:",
        scrollDistance,
      );

      ScrollTrigger.getById("work-scroll")?.kill();

      gsap.to(".work-flex", {
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: `+=${scrollDistance}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          id: "work-scroll",
        },
        x: -scrollDistance,
        ease: "none",
      });
    }, 500);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getById("work-scroll")?.kill();
    };
  }, []);

  return (
    <>
      <span className="fahad"> My Work</span>
      <div className="work-section" id="work">
        <div className="work-container section-container">
          <h2>
            My <span>Work</span>
          </h2>
          <div className="work-flex">
            {projects.map((project, index) => (
              <div className="work-box" key={index}>
                <div className="work-info">
                  <div className="work-title">
                    <h3>{String(index + 1).padStart(2, "0")}</h3>
                    <div>
                      <h5
                        style={{ margin: 0, fontSize: "14px", fontWeight: 400 }}
                      >
                        {project.title}
                      </h5>
                    </div>
                  </div>
                  <p style={{ marginTop: "10px", marginBottom: "8px" }}>
                    {project.description}
                  </p>
                  <h4>Technologies</h4>
                  <p>{project.technologies}</p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        marginTop: "10px",
                        color: "var(--accentColor)",
                        textDecoration: "none",
                        fontSize: "14px",
                      }}
                    >
                      View Project →
                    </a>
                  )}
                </div>
                <WorkImage image={project.image} alt={project.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Work;
