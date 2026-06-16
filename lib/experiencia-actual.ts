import type { Experiencia } from "./types";

export const experienciaActual: Experiencia = {
  tag: "Experiencia en cartelera",
  nombre: "Destruir para crear. Caos en movimiento.",
  artista: "Inspirada en el universo de Marta Minujín",
  descripcion:
    "Una experiencia inmersiva donde el espectador deja de ser observador para convertirse en protagonista. Recorrés cinco fases que construyen un viaje progresivo a través del caos, el juego, la conexión colectiva y la expresión individual.\n\nCada intervención modifica el entorno, deja una huella y altera la experiencia de los siguientes participantes. La obra es colectiva, efímera y en permanente cambio.",
  datosClave: [
    { label: "Duración", valor: "2 horas" },
    { label: "Personas por sala", valor: "Máx. 12" },
    { label: "Modalidad", valor: "Recorrido guiado" },
    { label: "Reserva", valor: "Por horario" },
  ],
  fases: [
    {
      numero: 1,
      nombre: "Experiencia Icónica",
      concepto: "Conexión y pertenencia",
      eje: "Sentirse parte de una comunidad",
      descripcion:
        "Un espacio de intercambio colectivo. Entregás un objeto, pensamiento o frase simbólica y recibís otro dejado por alguien antes que vos. La instalación crece y se transforma con cada aporte.",
      indicacion:
        "Podés dejar lo que quieras. La obra crece con cada aporte.",
      imagen: "/experiencia-iconica.png",
    },
    {
      numero: 2,
      nombre: "El Big Bang Psicodélico",
      concepto: "Impacto y liberación",
      eje: "Romper lo establecido",
      descripcion:
        "Un escenario de obras en estado de colapso. No existe el orden ni la contemplación. La sala es una acumulación de objetos y estructuras esperando ser intervenidas, desplazadas o transformadas.",
      indicacion: "Usá ropa cómoda y dejá tu celular afuera.",
      imagen: "/bigbang-psicodelico.png",
    },
    {
      numero: 3,
      nombre: "Espacio Inflable / Lúdico",
      concepto: "Alegría y juego",
      eje: "Volver a la infancia",
      descripcion:
        "Una instalación de inflables de gran escala inspirada en el lenguaje pop y participativo. Módulos geométricos de colores saturados conforman un laberinto dinámico y no lineal.",
      indicacion: "Sacate los zapatos antes de entrar.",
      imagen: "/espacio-inflable.png",
    },
    {
      numero: 4,
      nombre: "Mapping Interactivo",
      concepto: "Fusión y transformación",
      eje: "Unirse en lo colectivo y lo digital",
      descripcion:
        "El espacio está completamente oscuro. Superficies de proyección envuelven al visitante. El movimiento del cuerpo activa y modifica las visuales en tiempo real.",
      indicacion:
        "Ingresá sin objetos en las manos. Todo es proyección.",
      imagen: "/mapping.png",
    },
    {
      numero: 5,
      nombre: "Intervención",
      concepto: "Creatividad y expresión",
      eje: "Dejar huella propia",
      descripcion:
        "Un gran lienzo tridimensional con paredes y volúmenes listos para ser intervenidos. La iluminación UV intensifica los colores flúo. Cada marca se superpone a las anteriores, construyendo una obra colectiva.",
      indicacion:
        "Usá el mameluco que te damos para proteger tu ropa.",
      imagen: "/intervencion.png",
    },
    {
      numero: 0,
      nombre: "Zona de descanso",
      concepto: "Pausa y sociabilización",
      eje: "Contraste intencional",
      descripcion:
        "Ubicada en el centro del recorrido. Un contraste intencional: mientras las fases estimulan, este espacio ofrece pausa. Agua, snacks, asientos cómodos y espacio para compartir lo vivido.",
      indicacion: "Acá no se interviene. Se descansa y se socializa.",
      esDescanso: true,
    },
  ],
};
