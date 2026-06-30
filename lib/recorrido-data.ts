export interface SalaImage {
  src: string;
  alt: string;
}

export interface Sala {
  id: string;
  kicker: string;
  title: string;
  description: string;
  tip: string;
  images: SalaImage[];
}

export const MAPA_RECORRIDO = "/mapa-recorrido.png";

export const SALAS: Sala[] = [
  {
    id: "experiencia-iconica",
    kicker: "01 / Experiencia icónica",
    title: "Experiencia Icónica",
    description:
      "Un espacio de intercambio colectivo donde cada visitante puede dejar un objeto, una frase, un recuerdo o una idea, y recibir otro elemento dejado por alguien antes. La instalación crece con cada aporte y se convierte en un registro vivo de la participación del público.",
    tip: "Podés dejar lo que quieras. La obra crece con cada aporte.",
    images: [
      { src: "/iconica-1.png", alt: "Experiencia Icónica — vista general" },
      { src: "/iconica-2.png", alt: "Experiencia Icónica — detalle de objetos" },
      { src: "/iconica-3.png", alt: "Experiencia Icónica — participantes" },
      { src: "/iconica-4.png", alt: "Experiencia Icónica — instalación completa" },
    ],
  },
  {
    id: "big-bang",
    kicker: "02 / El Big Bang Psicodélico",
    title: "El Big Bang Psicodélico",
    description:
      "Una sala de caos, color y liberación física. El visitante atraviesa una acumulación de objetos, estructuras blandas, luces y materiales intervenibles que pueden moverse, desarmarse o transformarse. Acá la obra no se contempla: se rompe, se altera y se activa con el cuerpo.",
    tip: "Usá ropa cómoda y dejá tu celular afuera.",
    images: [
      { src: "/bigbang-1.png", alt: "Big Bang Psicodélico — entrada" },
      { src: "/bigbang-2.png", alt: "Big Bang Psicodélico — estructuras" },
      { src: "/bigbang-3.png", alt: "Big Bang Psicodélico — colores" },
      { src: "/bigbang-4.png", alt: "Big Bang Psicodélico — interacción" },
    ],
  },
  {
    id: "espacio-inflable",
    kicker: "03 / Espacio Inflable / Lúdico",
    title: "Espacio Inflable / Lúdico",
    description:
      "Un laberinto de inflables de gran escala, colores saturados y superficies blandas que invita a jugar, empujar, deformar y explorar. No hay un único recorrido: cada movimiento modifica el espacio y afecta la experiencia de los demás participantes.",
    tip: "Sacate los zapatos antes de entrar.",
    images: [
      { src: "/inflable-1.jpg", alt: "Espacio Inflable — laberinto" },
      { src: "/inflable-2.jpg", alt: "Espacio Inflable — módulos" },
      { src: "/inflable-3.jpg", alt: "Espacio Inflable — participantes" },
      { src: "/inflable-4.jpg", alt: "Espacio Inflable — vista aérea" },
    ],
  },
  {
    id: "mapping",
    kicker: "04 / Mapping Interactivo",
    title: "Mapping Interactivo",
    description:
      "Un entorno oscuro e inmersivo donde el cuerpo se convierte en herramienta artística. Las proyecciones reaccionan al movimiento, la velocidad y la cercanía entre personas, generando manchas, trazos y composiciones visuales que cambian en tiempo real.",
    tip: "Movete: tus gestos generan imágenes y sonidos.",
    images: [
      { src: "/mapping-1.png", alt: "Mapping Interactivo — proyecciones" },
      { src: "/mapping-2.png", alt: "Mapping Interactivo — movimiento" },
      { src: "/mapping-3.png", alt: "Mapping Interactivo — trazos" },
      { src: "/mapping-4.png", alt: "Mapping Interactivo — inmersión" },
    ],
  },
  {
    id: "intervencion",
    kicker: "05 / Intervención",
    title: "Intervención",
    description:
      "Un gran lienzo tridimensional listo para ser intervenido. Paredes y volúmenes blancos se transforman con capas de pintura flúo, trazos y gestos acumulados. Cada participante deja una marca visible dentro de una obra colectiva, cambiante y compartida.",
    tip: "Usá mameluco y protegé tu ropa.",
    images: [
      { src: "/intervención-1-neon.png", alt: "Intervención — lienzo" },
      { src: "/intervención-2-neon.png", alt: "Intervención — pintura flúo" },
      { src: "/intervención-3-neon.png", alt: "Intervención — gestos" },
      { src: "/intervención-4-neon.png", alt: "Intervención — obra colectiva" },
    ],
  },
  {
    id: "descanso",
    kicker: "06 / Zona de descanso",
    title: "Zona de descanso",
    description:
      "Un espacio central de pausa, encuentro y regulación sensorial. Funciona como núcleo del recorrido, conectando las distintas salas y ofreciendo un momento para descansar, tomar agua, compartir lo vivido y prepararse para continuar la experiencia.",
    tip: "Acá no se interviene: se descansa, se conversa y se recupera energía.",
    images: [
      { src: "/descanso-1.jpg", alt: "Zona de descanso — espacio" },
      { src: "/descanso-2.jpg", alt: "Zona de descanso — asientos" },
      { src: "/descanso-3.jpg", alt: "Zona de descanso — encuentro" },
      { src: "/descanso-4.jpg", alt: "Zona de descanso — pausa" },
    ],
  },
];
