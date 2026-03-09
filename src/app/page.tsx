import Hero from '../components/hero/Hero';
import About from '../components/about/About';
import Skills from '../components/skills/Skills';
import Education from '../components/education/Education';
import Projects from '../components/projects/Projects';
import Contact from '../components/contact/Contact';
import Footer from '../components/footer/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Education />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
