import React from "react";
import HeroSection from "../components/HeroSection";
import Feature from "../components/Feature";
import Gallery from "../components/Gallery";
import Subscribe from "../components/Subscribe";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <section>
        <HeroSection></HeroSection>
      </section>
      <section>
        <Feature></Feature>
      </section>
      <section>
        <Gallery></Gallery>
      </section>
      <section>
        <Subscribe></Subscribe>
      </section>
    </div>
  );
};

export default Home;
