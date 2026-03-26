export default function About() {
  return (
    <div className="about-wrapper">
      
      {/* HERO */}
      <section className="about-hero">
        <div className="homeVisitor-eyebrow">ENTER THE DARK</div>

        <h1 className="about-title">
          ABOUT <span>NIGHTFALL</span>
        </h1>

        <p className="about-desc">
          Nightfall is not just a theme park — it is a descent into fear itself.
          Each zone is crafted to immerse visitors in psychological horror,
          supernatural encounters, and adrenaline-fueled experiences.
        </p>
      </section>

      {/* ABOUT CONTENT */}
      <section className="panel about-panel">
        <div className="panel-body">

          <div className="section-heading">OUR EXPERIENCE</div>

          <p className="about-text">
            From haunted forests to cosmic terror, Nightfall blends storytelling,
            design, and technology to create unforgettable attractions. Every
            detail is engineered to keep you on edge.
          </p>

          <p className="about-text">
            Whether you're exploring alone or with friends, expect the unexpected.
            Fear evolves here.
          </p>

        </div>
      </section>

      {/* CONTACT */}
      <section className="panel about-panel">
        <div className="panel-body">

          <div className="section-heading">CONTACT</div>

          <div className="info-row">

            <div className="info-card">
              <div className="info-card-icon">📧</div>
              <div className="info-card-label">EMAIL</div>
              <div className="info-card-sub">support@nightfallpark.com</div>
            </div>

            <div className="info-card">
              <div className="info-card-icon">📞</div>
              <div className="info-card-label">PHONE</div>
              <div className="info-card-sub">(123) 456-7890</div>
            </div>

            <div className="info-card">
              <div className="info-card-icon">📍</div>
              <div className="info-card-label">LOCATION</div>
              <div className="info-card-sub">Nightfall Park, USA</div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}