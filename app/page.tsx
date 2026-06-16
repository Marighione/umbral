import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import SobreUmbral from "@/components/sections/SobreUmbral";
import Experiencia from "@/components/sections/Experiencia";
import Reservas from "@/components/sections/Reservas";
import Membresia from "@/components/sections/Membresia";
import Instituciones from "@/components/sections/Instituciones";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SobreUmbral />
        <Experiencia />
        <Reservas />
        <Membresia />
        <Instituciones />
      </main>
      <Footer />
    </>
  );
}
