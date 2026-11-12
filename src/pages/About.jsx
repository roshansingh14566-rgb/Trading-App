
export default function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <p className="eyebrow">OUR STORY</p>
        <h1>Building a simpler way to explore investing.</h1>
        <p>
          A student-built frontend project inspired by modern
          financial technology platforms.
        </p>
      </section>

      <section className="about-stats">
        <article>
          <h2>01</h2>
          <p>Simple design</p>
        </article>
        <article>
          <h2>02</h2>
          <p>User-focused experience</p>
        </article>
        <article>
          <h2>03</h2>
          <p>Modern technology</p>
        </article>
      </section>

      <section className="about-mission">
        <div>
          <p className="eyebrow">OUR MISSION</p>
          <h2>Technology should make complex things easier.</h2>
        </div>
        <p>
          This project demonstrates how React can be used to
          create responsive interfaces, reusable components
          and intuitive navigation. It is an educational
          frontend concept, not a real financial service.
        </p>
      </section>

      <section className="about-technology">
        <p className="eyebrow">BUILT WITH</p>
        <h2>Modern frontend technology.</h2>
        <div className="technology-list">
          <span>React</span>
          <span>JavaScript</span>
          <span>CSS3</span>
          <span>Vite</span>
          <span>React Router</span>
        </div>
      </section>
    </main>
  );
}
