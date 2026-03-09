import Navbar     from '@/components/Navbar';
import Hero       from '@/components/Hero';
import About      from '@/components/About';
import Skills     from '@/components/Skills';
import Projects   from '@/components/Projects';
import Footer     from '@/components/Footer';
import MouseGlow  from '@/components/MouseGlow';
import Particles  from '@/components/Particles';

export default function Home() {
  return (
    <>
      <MouseGlow />
      <Particles />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Footer />
    </>
  );
}
