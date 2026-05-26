let avisos = JSON.parse(localStorage.getItem("avisos")) || seedAvisos;

const listaAvisos = document.getElementById("listaAvisos");
const busqueda = document.getElementById("busqueda");
const filtroCategoria = document.getElementById("filtroCategoria");
const filtroPrioridad = document.getElementById("filtroPrioridad");
const btnAgregar = document.getElementById("btnAgregar");
const mensaje = document.getElementById("mensaje");

function guardarLocal() {
  localStorage.setItem("avisos", JSON.stringify(avisos));
}

function generarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function obtenerClasePrioridad(prioridad) {
  if (prioridad === "Alta") return "alta";
  if (prioridad === "Media") return "media";
  return "baja";
}

function mostrarAvisos(lista) {
  listaAvisos.innerHTML = "";

  if (lista.length === 0) {
    listaAvisos.innerHTML = "<p>No hay avisos para mostrar.</p>";
    return;
  }

  const ordenados = [...lista].sort((a, b) =>
    a.titulo.localeCompare(b.titulo)
  );

  ordenados.forEach((aviso) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${aviso.titulo}</h3>
      <p>${aviso.descripcion}</p>
      <p><strong>Categoría:</strong> ${aviso.categoria}</p>
      <p class="${obtenerClasePrioridad(aviso.prioridad)}">
        <strong>Prioridad:</strong> ${aviso.prioridad}
      </p>
      <button onclick="mostrarDetalle('${aviso.id}')">Ver detalle</button>
      <button onclick="eliminarAviso('${aviso.id}')">Eliminar</button>
    `;

    listaAvisos.appendChild(card);
  });
}

function aplicarFiltros() {
  const texto = busqueda.value.toLowerCase().trim();
  const categoria = filtroCategoria.value;
  const prioridad = filtroPrioridad.value;

  const filtrados = avisos.filter((aviso) => {
    const coincideTexto =
      aviso.titulo.toLowerCase().includes(texto) ||
      aviso.descripcion.toLowerCase().includes(texto);

    const coincideCategoria =
      categoria === "Todas" || aviso.categoria === categoria;

    const coincidePrioridad =
      prioridad === "Todas" || aviso.prioridad === prioridad;

    return coincideTexto && coincideCategoria && coincidePrioridad;
  });

  mostrarAvisos(filtrados);
}

function validarAviso(titulo, descripcion) {
  if (titulo.trim().length < 5) {
    return "El título debe tener mínimo 5 caracteres";
  }

  if (descripcion.trim().length < 10) {
    return "La descripción debe tener mínimo 10 caracteres";
  }

  return "";
}

function agregarAviso() {
  const titulo = document.getElementById("titulo").value;
  const descripcion = document.getElementById("descripcion").value;
  const categoria = document.getElementById("categoria").value;
  const prioridad = document.getElementById("prioridad").value;

  mensaje.textContent = "";

  const error = validarAviso(titulo, descripcion);

  if (error) {
    mensaje.textContent = error;
    return;
  }

  const nuevoAviso = {
    id: generarId(),
    titulo: titulo.trim(),
    descripcion: descripcion.trim(),
    categoria,
    prioridad
  };

  avisos.push(nuevoAviso);
  guardarLocal();
  mensaje.textContent = "Aviso guardado correctamente";

  document.getElementById("titulo").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("categoria").value = "Académico";
  document.getElementById("prioridad").value = "Alta";

  aplicarFiltros();
}

function eliminarAviso(id) {
  avisos = avisos.filter((aviso) => aviso.id !== id);
  guardarLocal();
  aplicarFiltros();
}

function mostrarDetalle(id) {
  const aviso = avisos.find((aviso) => aviso.id === id);

  if (!aviso) return;

  alert(
    `Título: ${aviso.titulo}\n\nDescripción: ${aviso.descripcion}\n\nCategoría: ${aviso.categoria}\n\nPrioridad: ${aviso.prioridad}`
  );
}

btnAgregar.addEventListener("click", agregarAviso);
busqueda.addEventListener("input", aplicarFiltros);
filtroCategoria.addEventListener("change", aplicarFiltros);
filtroPrioridad.addEventListener("change", aplicarFiltros);

mostrarAvisos(avisos);