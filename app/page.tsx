import Image from "next/image";
import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import SobreUmbral from "@/components/sections/SobreUmbral";
import Experiencia from "@/components/sections/Experiencia";
import Recorrido from "@/components/sections/Recorrido";
import Reservas from "@/components/sections/Reservas";
import Membresia from "@/components/sections/Membresia";
import Instituciones from "@/components/sections/Instituciones";
import Footer from "@/components/layout/Footer";

function TriangleDivider() {
  return (
    <div className="relative w-full py-4 select-none" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-bg-alt pointer-events-none" />
      <Image
        src="/recurso-1.2.png"
        alt=""
        width={1920}
        height={80}
        className="relative w-full h-auto object-cover opacity-50 blur-[0.5px]"
        draggable={false}
      />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SobreUmbral />
        <Experiencia />
        <Recorrido />
        <Reservas />
        <Membresia />
        <TriangleDivider />
        <Instituciones />
      </main>
      <Footer />
    </>
  );
}
