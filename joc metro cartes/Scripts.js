



// Definición de líneas y estaciones

const stations = {
  L1: [
    "Hospital de Bellvitge", "Bellvitge", "L’Hospitalet-Av. Carrilet", "Rambla Just Oliveras", "Can Serra", "Florida", "Torrassa",
    "Santa Eulàlia", "Mercat Nou", "Plaça de Sants", "Hostafrancs", "Barcelona - Plaça Espanya", "Rocafort", "Urgell", "Universitat",
    "Barcelona - Plaça Catalunya", "Urquinaona", "Arc de Triomf", "Marina", "Glòries", "Clot", "Navas", "La Sagrera", "Fabra i Puig",
    "Sant Andreu", "Torras i Bages", "Trinitat Vella", "Baró de Viver", "Santa Coloma", "Fondo"
  ],
  L2: [
    "Paral·lel", "Sant Antoni", "Universitat", "Passeig de Gràcia", "Tetuan", "Sagrada Família", "Monumental",
    "Encants", "Clot", "Bac de Roda", "Sant Martí", "La Pau", "Verneda", "Artigues | Sant Adrià", "Sant Roc",
    "Gorg", "Badalona Pompeu Fabra"
  ],
  L3: [
    "Zona Universitària", "Palau Reial", "Maria Cristina", "Les Corts", "Plaça del Centre", "Sants Estació",
    "Barcelona - Plaça Espanya", "Poble Sec", "Paral·lel", "Drassanes", "Liceu", "Barcelona - Plaça Catalunya", "Passeig de Gràcia", "Diagonal / Provença",
    "Fontana", "Lesseps", "Vallcarca", "Penitents", "Vall d’Hebron", "Montbau", "Mundet", "Valldaura", "Canyelles",
    "Trinitat Nova"
  ],
  L4: [
    "Trinitat Nova", "Via Júlia", "Llucmajor", "Maragall", "Guinardó | Hospital de Sant Pau", "Alfons X", "Joanic",
    "Verdaguer", "Girona", "Passeig de Gràcia", "Urquinaona", "Jaume I", "Barceloneta", "Ciutadella | Vila Olímpica",
    "Bogatell", "Llacuna", "Poblenou", "Selva de Mar", "El Maresme | Fòrum", "Besòs Mar", "Besòs", "La Pau"
  ],
  L5: [
    "Cornellà Centre", "Gavarra", "Sant Ildefons", "Can Boixeres", "Can Vidalet", "Pubilla Cases", "Ernest Lluch",
    "Collblanc", "Badal", "Plaça de Sants", "Sants Estació", "Entença", "Hospital Clínic", "Diagonal / Provença", "Verdaguer",
    "Sagrada Família", "Sant Pau | Dos de Maig", "Camp de l’Arpa", "La Sagrera", "Congrés", "Maragall", "Virrei Amat",
    "Vilapicina", "Horta", "El Carmel", "El Coll | La Teixonera", "Vall d’Hebron"
      ],
  L6: [
    "Barcelona - Plaça Catalunya", "Diagonal / Provença", "Gràcia", "Sant Gervasi / Plaça Molina", "Muntaner", "La Bonanova", "Les Tres Torres",
    "Sarrià"
  ],
  L7: [
    "Barcelona - Plaça Catalunya", "Diagonal / Provença", "Gràcia", "Sant Gervasi / Plaça Molina", "Pàdua", "El Putxet", "Av. Tibidabo"
  ],
  L8: [
    "Barcelona - Plaça Espanya", "Magòria La Campana", "Ildefons Cerdà", "Europa | Fira", "Gornal", "Sant Josep", "L’Hospitalet-Av. Carrilet",
    "Almeda", "Cornellà Riera", "Sant Boi", "Molí Nou-Ciutat Cooperativa"
  ],

  L9: [
    "Can Zam", "Singuerlín", "Església Major", "Fondo", "Santa Rosa", "Can Peixauet", "Bon Pastor", "Onze de Setembre", "La Sagrera - TAV",
    "La Sagrera", "Plaça de Maragall", "Guinardó | Hospital de Sant Pau", "Sanllehy", "Lesseps", "El Putxet", "Mandri", "Sarrià",
     "Manuel Girona", "Campus Nord", "Zona Universitària", "Camp Nou", "Collblanc", "Torrassa", "Can Tries | Gornal", "Europa | Fira",
      "Fira", "Parc Logístic", "Mercabarna", "Les Moreres", "El Prat Estació", "Cèntric", "Parc Nou", "Mas Blau",
        "Aeroport T2", "Aeroport T1"
  ],
  L10: [
    "Gorg", "La Salut", "Llefià", "Bon Pastor", "Onze de Setembre", "La Sagrera - TAV", "La Sagrera", "Plaça de Maragall", "Guinardó | Hospital de Sant Pau",
    "Sanllehy", "Lesseps", "El Putxet", "Mandri", "Sarrià", "Manuel Girona", "Campus Nord", "Zona Universitària", "Camp Nou", "Collblanc",
    "Torrassa", "Can Tries | Gornal", "Provençana", "Ciutat de la Justicia", "Foneria", "Foc","Motors", "Zona Franca", "Port Comercial | La Factoria", 
    "Ecoparc", "ZAL | Riu Vell","Pratenc"
  ],
  L11: [
   "Trinitat Nova", "Casa de l'Aigua", "Torre Baró | Vallbona", "Ciutat Meridiana", "Can Cuiàs"
  ],
   L12: [
   "Sarrià", "Reina Elisenda"
  ],

};


// Cálculo de adyacencias 

const adyacentes = new Map(); // clave: estación, valor: Set de vecinos
function addEdge(a, b) {
  if (!adyacentes.has(a)) adyacentes.set(a, new Set());
  if (!adyacentes.has(b)) adyacentes.set(b, new Set());
  adyacentes.get(a).add(b);
  adyacentes.get(b).add(a); // conexión bidireccional
}

for (const estaciones of Object.values(stations)) {
  for (let i = 0; i < estaciones.length - 1; i++) {
    const actual = estaciones[i];
    const siguiente = estaciones[i + 1];
    addEdge(actual, siguiente);
  }
}

// Variables globales
let shuffledStations = [];
let stationsLeft = [];
let selectedStations = [];
let player1cardsToevaluate = [];

// Nova partida
function newGame() {
    // Oculta el modal de bienvenida si existe
    const welcomeModal = document.getElementById("welcomeModal");
    if (welcomeModal) welcomeModal.style.display = "none";

    // Vacía los cardFrames de ambos contenedores
    document.querySelectorAll("#containerCardsToSelect .cardFrame, #containerCardsToMakeTrips .cardFrame").forEach(frame => {
        frame.innerHTML = "";
    });

    // Vacía las variables globales
    shuffledStations = [];
    stationsLeft = [];
    selectedStations = [];
    player1cardsToevaluate = [];
    trayectosCanjeados = [];
    window.trayectosCanjeados = []; // Asegura que también se resetea el global

    // Oculta el modal de fin de partida si existe
    const modalFin = document.getElementById("modalFinPartida");
    if (modalFin) modalFin.remove();

    // Reinicia el contador si existe
    const contador = document.getElementById("contadorTiempo");
    if (contador) contador.textContent = "";

    // Reinicia el contenido de los botones de canjeo si existe
const exchangeTripsModal = document.getElementById("exchangeTripsModal");
if (exchangeTripsModal) {
    // Elimina solo los botones, pero mantiene el h1
    Array.from(exchangeTripsModal.children).forEach(child => {
        if (child.tagName === "BUTTON") child.remove();
    });
}

    // Mezcla y selecciona estaciones
    shuffleStations();
    newCardsToSelect();
    createCards(selectedStations, 'containerCardsToSelect');
    iniciarCuentaAtras();
}

// Mezcla las estaciones
function shuffleStations() {
    // Junta todas las estaciones de todas las líneas en un solo array y elimina duplicados
    const todasEstaciones = Array.from(new Set([
        ...stations.L1,
        ...stations.L2,
        ...stations.L3,
        ...stations.L4,
        ...stations.L5,
        ...stations.L6,
        ...stations.L7,
        ...stations.L8,
        ...stations.L9,
        ...stations.L10,
        ...stations.L11,
        ...stations.L12
    ]));

    // Mezcla el array (Fisher-Yates shuffle)
    shuffledStations = todasEstaciones.slice();
    for (let i = shuffledStations.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledStations[i], shuffledStations[j]] = [shuffledStations[j], shuffledStations[i]];
    }
    console.log("Estacions barrejades:");
    stationsLeft = shuffledStations;





}

// Selecciona estaciones a seleccionar
function newCardsToSelect() {
     // Toma las 5 primeras estaciones de stationsLeft
    selectedStations = stationsLeft.slice(0, 5);
    // Elimina esas 5 estaciones de stationsLeft
    stationsLeft = stationsLeft.slice(5);
    console.log("Estaciones seleccionadas:", selectedStations);
    console.log("Estaciones restantes:", stationsLeft);
}

// Crear tarjetas
function createCards(list, containerId) {
    // Obtiene el contenedor
    let container = document.getElementById(containerId);
    if (!container) {
        container = document.createElement("div");
        container.id = "containerCard";
        document.body.appendChild(container);
    }
    // container.innerHTML = ""; // Limpia el contenedor


    // Limpia los cardFrames existentes
    const frames = container.querySelectorAll(".cardFrame");
    frames.forEach(frame => frame.innerHTML = "");

    // Añade cada cardDiv dentro de su cardFrame
    list.forEach((estacion, idx) => {
        if (frames[idx]) {
            const cardDiv = document.createElement("div");
            cardDiv.className = "card";

            // Nombre de la estación
            const h1 = document.createElement("h1");
            h1.className = "stationName";
            h1.textContent = estacion;
            cardDiv.appendChild(h1);

            // Busca a qué líneas pertenece la estación
            let lineasEstacion = [];
            for (const [linea, estaciones] of Object.entries(stations)) {
                if (estaciones.includes(estacion)) {
                    lineasEstacion.push(linea);
                }
            }

            // Añade un H2 por cada línea y su color
            lineasEstacion.forEach(linea => {
                const h2 = document.createElement("h2");
                h2.className = `lineText linea${linea.slice(1)}`;
                h2.textContent = linea;
                cardDiv.appendChild(h2);
            });

            // Inserta el cardDiv en el cardFrame correspondiente
            frames[idx].appendChild(cardDiv);
        }
    });
    

    // Activa el intercambio después de crear las tarjetas
    cardExchange();
}


// Intercambio de tarjetas
function cardExchange() {
    let firstSelection = null;
    let firstContainer = null;
    let firstIndex = null;

    document.querySelectorAll("#containerCardsToSelect .cardFrame, #containerCardsToMakeTrips .cardFrame").forEach((frame) => {
        frame.onclick = function () {
            const containerId = frame.parentElement.id;
            const index = Array.from(frame.parentElement.children).indexOf(frame);

            if (firstSelection === null) {
                firstSelection = frame;
                firstContainer = containerId;
                firstIndex = index;
                frame.classList.add("selectedCardFrame");
            } else if (firstSelection !== frame) {
                const secondContainer = containerId;
                const secondIndex = index;

                // Intercambia los cardDiv entre los frames
                const card1 = firstSelection.firstChild;
                const card2 = frame.firstChild;

                // Elimina clases de color y trayecto antes de mover
                function limpiarClases(card) {
                    if (!card) return;
                    card.className = card.className
                        .split(' ')
                        .filter(c => !c.startsWith('linea') && !c.startsWith('cardsAdyacentes'))
                        .join(' ');
                }
                limpiarClases(card1);
                limpiarClases(card2);

                firstSelection.innerHTML = "";
                frame.innerHTML = "";

                if (card2) firstSelection.appendChild(card2);
                if (card1) frame.appendChild(card1);

                // Actualiza los arrays según el contenedor
                if (firstContainer === "containerCardsToSelect") {
                    if (firstSelection.firstChild && firstSelection.firstChild.querySelector(".stationName")) {
                        selectedStations[firstIndex] = firstSelection.firstChild.querySelector(".stationName").textContent;
                    } else {
                        selectedStations[firstIndex] = null;
                    }
                }
                if (secondContainer === "containerCardsToSelect") {
                    if (frame.firstChild && frame.firstChild.querySelector(".stationName")) {
                        selectedStations[secondIndex] = frame.firstChild.querySelector(".stationName").textContent;
                    } else {
                        selectedStations[secondIndex] = null;
                    }
                }
                if (firstContainer === "containerCardsToMakeTrips") {
                    if (firstSelection.firstChild && firstSelection.firstChild.querySelector(".stationName")) {
                        player1cardsToevaluate[firstIndex] = firstSelection.firstChild.querySelector(".stationName").textContent;
                    } else {
                        player1cardsToevaluate[firstIndex] = null;
                    }
                }
                if (secondContainer === "containerCardsToMakeTrips") {
                    if (frame.firstChild && frame.firstChild.querySelector(".stationName")) {
                        player1cardsToevaluate[secondIndex] = frame.firstChild.querySelector(".stationName").textContent;
                    } else {
                        player1cardsToevaluate[secondIndex] = null;
                    }
                }

                console.log("selectedStations:", selectedStations);
                console.log("player1cardsToevaluate:", player1cardsToevaluate);

                firstSelection.classList.remove("selectedCardFrame");
                firstSelection = null;
                firstContainer = null;
                firstIndex = null;

                // Vuelve a evaluar el trayecto tras el intercambio
                evaluarTrayecto(player1cardsToevaluate);
                canjearViajes();
            }
        };
    });
}

            
 
// Evaluar trayecto
function evaluarTrayecto(mano) {
    // Filtra elementos válidos (no null, no undefined, no vacío)
    const manoValida = mano.filter(e => e && e !== null && e !== undefined && e !== "");

    let trayectos = [];
    let actualTrayecto = [manoValida[0]];
    let actualLen = 1;

    for (let i = 0; i < manoValida.length - 1; i++) {
        const a = manoValida[i];
        const b = manoValida[i + 1];

        if (adyacentes.get(a)?.has(b)) {
            actualTrayecto.push(b);
            actualLen++;
        } else {
            trayectos.push({ estaciones: actualTrayecto.slice(), longitud: actualLen });
            actualTrayecto = [b];
            actualLen = 1;
        }
    }
    trayectos.push({ estaciones: actualTrayecto.slice(), longitud: actualLen });

    const maxLen = Math.max(...trayectos.map(t => t.longitud));
    const totalTrayectos = trayectos.length;
    const longitudes = trayectos.map(t => t.longitud);

    // document.getElementById("resultadoEvaluacion").innerHTML =
    //     "Longitud del trayecto más largo: " + maxLen +
    //     "<br>Número de trayectos: " + totalTrayectos +
    //     "<br>Longitudes de todos los trayectos: " + longitudes.join(", ");

    // Elimina las clases sólo de las cartas en containerCardsToMakeTrips
    const tripCards = Array.from(document.querySelectorAll("#containerCardsToMakeTrips .card"))
        .filter(card => card.querySelector(".stationName") && card.querySelector(".stationName").textContent);

    tripCards.forEach(card => {
        for (let i = 1; i <= 10; i++) {
            card.classList.remove(`cardsAdyacentes${i}`);
        }
        card.classList.remove("cardsAdyacentes");
    });

    // Aplica las clases sólo a las cartas válidas del contenedor de trayectos
    let idx = 0;
    let trayectoNum = 1;
    trayectos.forEach(trayecto => {
        if (trayecto.longitud > 1) {
            const clase = `cardsAdyacentes${trayectoNum <= 10 ? trayectoNum : 10}`;
            for (let i = 0; i < trayecto.longitud; i++) {
                const card = tripCards[idx + i];
                if (card) card.classList.add(clase);
            }
            trayectoNum++;
        }
        idx += trayecto.longitud;
    });

    console.log("Longitud del trayecto más largo:", maxLen);
    console.log("Número de trayectos:", totalTrayectos);
    console.log("Longitudes de todos los trayectos:", longitudes);
    console.log("Trayectos:", trayectos);

    return maxLen;
}


//Pedir nuevas cartas
function moreCards() {
    // Filtra los elementos no nulos de selectedStations
    const estacionesValidas = selectedStations.filter(e => e !== null && e !== undefined);

    // Añade los elementos restantes de selectedStations al final de stationsLeft
    stationsLeft = stationsLeft.concat(estacionesValidas);

    console.log("Estaciones restantes:", stationsLeft);
    
    // Vacía selectedStations
    selectedStations = [];
    console.log("Estaciones sel:", selectedStations);

    // Ejecuta la función para seleccionar nuevas estaciones
    newCardsToSelect();
    // Ejecuta la función para crear nuevas cartas
    createCards(selectedStations, 'containerCardsToSelect');

}

function showMap() {
    // Si el modal ya existe, solo lo muestra
    let modal = document.getElementById("modalMapa");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "modalMapa";
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100vw";
        modal.style.height = "100vh";
        modal.style.background = "rgba(0,0,0,0.8)";
        modal.style.display = "flex";
        modal.style.flexDirection = "column";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";
        modal.style.zIndex = "9999";

        // Imagen del mapa
        const img = document.createElement("img");
        img.src = "media/Map.jpg";
        img.alt = "Mapa Metro";
        img.style.maxWidth = "95vw";
        img.style.maxHeight = "100vh";
        img.style.border = "5px solid white";
        img.style.borderRadius = "10px";
        modal.appendChild(img);

        // Botón para cerrar el modal
        const closeBtn = document.createElement("button");
        closeBtn.textContent = "Tancar";
        closeBtn.style.marginTop = "10px";
        closeBtn.style.fontSize = "1.2rem";
        closeBtn.style.padding = "15px";
        closeBtn.onclick = function () {
            modal.remove();
        };
        modal.appendChild(closeBtn);

        document.body.appendChild(modal);
    } else {
        modal.style.display = "flex";
    }
}


// Array global para guardar los trayectos canjeados
let trayectosCanjeados = [];
function canjearViajes() {
    // Busca el contenedor para los botones de canjeo
    let botonesDiv = document.getElementById("exchangeTripsModal");
    if (!botonesDiv) {
        botonesDiv = document.createElement("div");
        botonesDiv.id = "exchangeTripsModal";
        document.body.appendChild(botonesDiv);
    }
    // Limpia los botones previos
    botonesDiv.innerHTML = "<h1>Viatges</h1>";

    // Filtra elementos válidos
    const manoValida = player1cardsToevaluate.filter(e => e && e !== null && e !== undefined && e !== "");

    // Detecta trayectos
    let trayectos = [];
    let actualTrayecto = [manoValida[0]];
    let actualLen = 1;
    for (let i = 0; i < manoValida.length - 1; i++) {
        const a = manoValida[i];
        const b = manoValida[i + 1];
        if (adyacentes.get(a)?.has(b)) {
            actualTrayecto.push(b);
            actualLen++;
        } else {
            trayectos.push({ estaciones: actualTrayecto.slice(), longitud: actualLen, inicio: i + 1 - actualLen });
            actualTrayecto = [b];
            actualLen = 1;
        }
    }
    trayectos.push({ estaciones: actualTrayecto.slice(), longitud: actualLen, inicio: manoValida.length - actualLen });

    // Crea un botón para cada trayecto de más de 1 estación
    let trayectoNum = 1;
    trayectos.forEach((trayecto, idx) => {
        if (trayecto.longitud > 1) {
            const btn = document.createElement("button");
            btn.textContent = `Canjear trayecto ${trayectoNum}`;
            btn.className = `cardsAdyacentes${trayectoNum <= 10 ? trayectoNum : 10}`;
            botonesDiv.appendChild(btn);

            btn.onclick = function () {
                // Guarda el trayecto canjeado con estaciones y longitud
                if (!window.trayectosCanjeados) window.trayectosCanjeados = [];
                window.trayectosCanjeados.push({
                    estaciones: trayecto.estaciones.slice(),
                    longitud: trayecto.longitud
                });

                // Elimina las cartas del trayecto en el DOM
                const tripCards = Array.from(document.querySelectorAll("#containerCardsToMakeTrips .card"))
                    .filter(card => card.querySelector(".stationName") && card.querySelector(".stationName").textContent);

                for (let i = trayecto.inicio; i < trayecto.inicio + trayecto.longitud; i++) {
                    if (tripCards[i]) {
                        tripCards[i].parentElement.innerHTML = ""; // Elimina el card del cardFrame
                    }
                }

                // Elimina los elementos del array player1cardsToevaluate
                player1cardsToevaluate.splice(trayecto.inicio, trayecto.longitud);

                // Vuelve a evaluar trayecto y botones
                evaluarTrayecto(player1cardsToevaluate);
                canjearViajes();

                // Muestra en consola los trayectos canjeados
                console.log("Trayectos canjeados:", window.trayectosCanjeados);
            };
            trayectoNum++;
        }
    });
}


function iniciarCuentaAtras() {
    // Elimina el contador previo si existe
    let contador = document.getElementById("contadorTiempo");
    if (!contador) {
        contador = document.createElement("div");
        contador.id = "contadorTiempo";
        contador.style.fontSize = "2rem";
        contador.style.textAlign = "center";
        contador.style.margin = "20px";
        document.body.insertBefore(contador, document.getElementById("containerCardsToSelect"));
    }

    let tiempoRestante = 300; // 2 minutos en segundos

    function actualizarContador() {
        const minutos = Math.floor(tiempoRestante / 60);
        const segundos = tiempoRestante % 60;
        contador.textContent = `Tiempo restante: ${minutos}:${segundos.toString().padStart(2, '0')}`;
    }

    actualizarContador();

    // Limpia cualquier intervalo anterior
    if (window.intervaloCuentaAtras) clearInterval(window.intervaloCuentaAtras);

    window.intervaloCuentaAtras = setInterval(() => {
        tiempoRestante--;
        actualizarContador();
        if (tiempoRestante <= 0) {
            clearInterval(window.intervaloCuentaAtras);
            contador.textContent = "¡Tiempo terminado!";
            mostrarModalFinPartida();
        }
    }, 1000);

}

// Calcular puntuación total
function calcularPuntuacio() {
    // Array de puntuacions segons longitud
    const puntuacions = {
        2: 20,
        3: 40,
        4: 60,
        5: 100,
        6: 150,
        7: 225,
        8: 325,
        9: 450,
        10: 650
    };

    let total = 0;
    // Suma la puntuació de cada trajecte bescanviat
    if (window.trayectosCanjeados) {
        window.trayectosCanjeados.forEach(trayecto => {
            const valor = puntuacions[trayecto.longitud] || 0;
            total += valor;
        });
    }
    return total;
}

// Modifica mostrarModalFinPartida per mostrar la puntuació
function mostrarModalFinPartida() {
    let modal = document.getElementById("modalFinPartida");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "modalFinPartida";
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100vw";
        modal.style.height = "100vh";
        modal.style.background = "rgba(0,0,0,0.7)";
        modal.style.display = "flex";
        modal.style.flexDirection = "column";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";
        modal.style.zIndex = "9999";

        const mensaje = document.createElement("h1");
        mensaje.textContent = "¡Tiempo terminado!";
        mensaje.style.color = "white";
        modal.appendChild(mensaje);

        // Mostra la puntuació
        const puntuacio = document.createElement("h2");
        puntuacio.textContent = `Puntuació final: ${calcularPuntuacio()}`;
        puntuacio.style.color = "yellow";
        modal.appendChild(puntuacio);

        const boton = document.createElement("button");
        boton.textContent = "Nova partida";
        boton.style.fontSize = "1.5rem";
        boton.style.padding = "20px";
        boton.onclick = function () {
            modal.remove();
            newGame();
        };
        modal.appendChild(boton);

        document.body.appendChild(modal);
    } else {
        // Actualitza la puntuació si el modal ja existeix
        const puntuacio = modal.querySelector("h2");
        if (puntuacio) {
            puntuacio.textContent = `Puntuació final: ${calcularPuntuacio()}`;
        }
        modal.style.display = "flex";
    }
}