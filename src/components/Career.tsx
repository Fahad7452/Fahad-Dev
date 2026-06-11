import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Web Developer</h4>
                <h5>Gamica Cloud</h5>
                   <h3>Dec 2022 - May 2023</h3>
              </div>
           
            </div>
            <p>
              Built and maintained full-stack web applications using React.js
              and Node.js with clean and scalable architecture. Conducted code
              reviews to maintain high-quality standards and enforce best
              practices across the team. Mentored junior developers to strengthen
              team skills and foster a collaborative, growth-oriented
              environment.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>React.js Developer</h4>
                <h5>Entspos Developer</h5>
                              <h3>Aug 2023 - Jun 2024</h3>

              </div>
            </div>
            <p>
              Built scalable and maintainable front-end architectures using
              React.js and Next.js. Implemented authentication and authorization
              flows using NextAuth.js and JWT. Optimized performance by
              code-splitting, lazy loading, and using Next.js image optimization
              features. Collaborated with UX/UI designers to translate Figma
              designs into pixel-perfect React components. Implemented progressive
              web app (PWA) features for offline functionality and enhanced user
              experiences.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Full Stack Developer</h4>
                <h5>DevShine, Faisalabad, Pakistan</h5>
                              <h3>Sep 2024 - Present</h3>

              </div>
            </div>
            <p>
              Developed reusable React components and implemented server-side
              rendering (SSR) and static site generation (SSG) using Next.js for
              optimized performance. Managed state efficiently using Redux Toolkit
              and Context API for complex applications. Integrated RESTful APIs and
              GraphQL to fetch and display dynamic data. Optimized SEO by leveraging
              Next.js features like meta tags, dynamic routing, and pre-rendering.
              Implemented realtime features using WebSockets and Socket.IO for
              dynamic updates. Used TypeScript to enforce type safety and reduce
              runtime errors in React and Next.js projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
