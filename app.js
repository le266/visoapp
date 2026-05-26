let avisos = JSON.parse(
  localStorage.getItem("avisos")
) || [];

const listaAvisos =
document.getElementById("listaAvisos");

const busqueda =
document.getElementById("busqueda");

const filtroCategoria =
document.getElementById("filtroCategoria");

const filtroPrioridad =
document.getElementById("filtroPrioridad");

const btnAgregar =
document.getElementById("btnAgregar");

const mensaje =
document.getElementById("mensaje");

function guardarLocal(){

  localStorage.setItem(
    "avisos",
    JSON.stringify(avisos)
  );

}

function mostrarAvisos(lista){

  listaAvisos.innerHTML = "";

  lista.forEach((aviso, index) => {

    const card = document.createElement("div");

    card.classList.add("card");

    let clasePrioridad = "";

    if(aviso.prioridad === "Alta"){

      clasePrioridad = "alta";

    }

    else if(aviso.prioridad === "Media"){

      clasePrioridad = "media";

    }

    else{

      clasePrioridad = "baja";

    }

    card.innerHTML = `

      <h3>${aviso.titulo}</h3>

      <p>${aviso.descripcion}</p>

      <p>

        <strong>Categoría:</strong>

        ${aviso.categoria}

      </p>

      <p class="${clasePrioridad}">

        <strong>Prioridad:</strong>

        ${aviso.prioridad}

      </p>

      <button onclick="eliminarAviso(${index})">

        Eliminar

      </button>

    `;

    listaAvisos.appendChild(card);

  });

}

mostrarAvisos(avisos);

busqueda.addEventListener("change", () => {

  const prioridad = busqueda.value;

  if(prioridad === ""){

    mostrarAvisos(avisos);

  }

  else{

    const filtrados = avisos.filter(aviso =>

      aviso.prioridad === prioridad

    );

    mostrarAvisos(filtrados);

  }

});

filtroCategoria.addEventListener(
  "change",
  filtrarAvisos
);

filtroPrioridad.addEventListener(
  "change",
  filtrarAvisos
);

function filtrarAvisos(){

  const categoria =
  filtroCategoria.value;

  const prioridad =
  filtroPrioridad.value;

  let filtrados = avisos;

  if(categoria !== "Todas"){

    filtrados = filtrados.filter(aviso =>

      aviso.categoria === categoria

    );

  }

  if(prioridad !== "Todas"){

    filtrados = filtrados.filter(aviso =>

      aviso.prioridad === prioridad

    );

  }

  mostrarAvisos(filtrados);

}

btnAgregar.addEventListener("click", () => {

  const titulo =
  document.getElementById("titulo").value;

  const descripcion =
  document.getElementById("descripcion").value;

  const categoria =
  document.getElementById("categoria").value;

  const prioridad =
  document.getElementById("prioridad").value;

  mensaje.textContent = "";

  if(titulo.length < 5){

    mensaje.textContent =
    "El título debe tener mínimo 5 caracteres";

    return;

  }

  if(descripcion.length < 10){

    mensaje.textContent =
    "La descripción debe tener mínimo 10 caracteres";

    return;

  }

  const nuevoAviso = {

    titulo,
    descripcion,
    categoria,
    prioridad

  };

  avisos.push(nuevoAviso);

  guardarLocal();

  mostrarAvisos(avisos);

  document.getElementById("titulo").value = "";

  document.getElementById("descripcion").value = "";

});

function eliminarAviso(index){

  avisos.splice(index, 1);

  guardarLocal();

  mostrarAvisos(avisos);

}
// Proyecto AVISOSAP - Aplicaciones Móviles 2026
