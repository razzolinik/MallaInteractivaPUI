const estados = {};

const correlativas = {
  ingles2: { regular: ["ingles1"] },
  lab2: { regular: ["ingles1", "fund_prog", "lab1"] },
  prog1: { regular: ["fund_prog", "logica"] },
  bdd: { regular: ["prog1"] },
  lab3: { regular: ["ingles2", "lab2", "prog1"] },
  org: { regular: ["alg1", "prog1"], aprobado: ["logica"] },
  prog2: { regular: ["alg1", "prog1"], aprobado: ["prog1"] },
  arquitectura: { regular: ["org"], aprobado: ["logica"] },
  sistemas_info: { regular: ["bdd"], aprobado: ["prog1"] },
  lab4: { regular: ["bdd"], aprobado: ["ingles2"] },
  prog3: { regular: ["lab3", "prog2"], aprobado: ["prog1", "lab2"] },
  lab5: { regular: ["lab4"], aprobado: ["lab3"] },
  redes: { regular: ["arquitectura"], aprobado: ["lab3", "org"] },
  etica: { regular: ["sistemas_info", "prog3"], aprobado: ["prog2"] },
  sistemas_op: { regular: ["prog2", "arquitectura"], aprobado: ["org"] },
  config_soft: { regular: ["prog3", "lab5"], aprobado: ["prog2"] },
  lab6: { regular: ["lab5", "sistemas_op"], aprobado: ["prog3"] },
  practica: { regular: ["lab5", "redes", "etica", "sistemas_op"], aprobado: ["sistemas_info", "prog3"] },
  prog4: { regular: ["lab5", "sistemas_op"], aprobado: ["lab3", "prog3"] }
};

function guardarEstados() {
  localStorage.setItem("mallaEstados", JSON.stringify(estados));
}

function obtenerEstados() {
  const data = localStorage.getItem("mallaEstados");
  return data ? JSON.parse(data) : {};
}

function cambiarEstado(id) {
  const actual = estados[id] || "ninguno";
  const siguiente = actual === "ninguno" ? "regular" : actual === "regular" ? "aprobado" : "ninguno";

  estados[id] = siguiente;

  // Sincronizar álgebra anual
  if (id === "alg1") estados["alg2"] = siguiente;
  if (id === "alg2") estados["alg1"] = siguiente;

  guardarEstados();
  actualizarVisual();
  actualizarBloqueos();
  actualizarContador();
}


function actualizarVisual() {
  document.querySelectorAll(".asignatura").forEach(div => {
    const estado = estados[div.id] || "ninguno";
    div.classList.remove("regular", "aprobado");

    if (estado === "regular") {
      div.classList.add("regular");
    } else if (estado === "aprobado") {
      div.classList.add("aprobado");
    }
  });
}

function actualizarBloqueos() {
  const aprobadas = Object.entries(estados).filter(([_, estado]) => estado === "aprobado").map(([id]) => id);
  const regulares = Object.entries(estados).filter(([_, estado]) => estado === "regular" || estado === "aprobado").map(([id]) => id);

  document.querySelectorAll(".asignatura").forEach(div => {
    const id = div.id;
    const reglas = correlativas[id];

    if (estados[id] === "aprobado") {
      div.classList.remove("bloqueado");
      return;
    }

    if (!reglas) {
      // No tiene correlativas
      div.classList.remove("bloqueado");
      return;
    }

    const cumpleRegular = !reglas.regular || reglas.regular.every(r => regulares.includes(r));
    const cumpleAprobado = !reglas.aprobado || reglas.aprobado.every(r => aprobadas.includes(r));

    if (cumpleRegular && cumpleAprobado) {
      div.classList.remove("bloqueado");
    } else {
      div.classList.add("bloqueado");
    }
  });
}

function actualizarContador() {
  let regulares = 0;
  let aprobadas = 0;

  const yaContado = new Set(); // para evitar duplicados

  for (const [id, estado] of Object.entries(estados)) {
    if ((id === "alg2" && estados["alg1"] === estado) || (id === "alg1" && estados["alg2"] === estado)) {
      if (yaContado.has("alg")) continue;
      yaContado.add("alg");
    }

    if (estado === "regular") regulares++;
    if (estado === "aprobado") aprobadas++;
  }

  document.getElementById("contador").textContent = `Regulares: ${regulares} | Aprobadas: ${aprobadas}`;
}


function reiniciarProgreso() {
  if (confirm("¿Reiniciar el progreso?")) {
    localStorage.removeItem("mallaEstados");
    location.reload();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  Object.assign(estados, obtenerEstados());

  document.querySelectorAll(".asignatura").forEach(div => {
    div.addEventListener("click", () => cambiarEstado(div.id));
  });

  actualizarVisual();
  actualizarBloqueos();
  actualizarContador();
});
