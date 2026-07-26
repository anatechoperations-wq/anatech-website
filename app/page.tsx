import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import WhyChoose from "@/components/WhyChoose";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Industries />
        <WhyChoose />
        <Contact />
      </main>

      <Footer />
    </>
  );
}