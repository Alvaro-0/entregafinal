alert("bienvenido a la pagina");
let volver = true;
while (volver) {
  function Terminos() {
    const aceptar = confirm(
      "¿Estás de acuerdo con los términos y condiciones?"
    );
    if (aceptar) {
      alert("¡Gracias por aceptar los términos y condiciones!");
    } else {
      alert("Debes aceptar los términos y condiciones para continuar.");
      aceptar = false;
    }
  }
  Terminos();

  function Saludar() {
    const nombre = prompt("Ingrese su Nombre");
    const apellido = prompt("Ingrese su Apellido");
    alert(`Bienvenido ${nombre} ${apellido} `);
  }
  Saludar();

  const edad = parseInt(prompt("Cuantos años tiene"));

  if (edad >= 18) {
    alert("usted es mayor de edad por lo cual puede seguir en la pagina");
  } else {
    alert("usted es menor de edad ,no podra continuar en la pagina");
    edad=false
  }

  const articulos = [
    { nombre: "Camisa", precio: 1000 },
    { nombre: "Pantalón", precio: 2000 },
    { nombre: "Zapatos", precio: 3000 },
  ];

  const eleccion = prompt(
    "Elija un artículo:\n1. Camisa\n2. Pantalón\n3. Zapatos"
  );

  if (eleccion !== null) {
    const i = parseInt(eleccion) - 1;
    if (i >= 0 && i < articulos.length) {
      alert(
        "Has elegido " +
          articulos[i].nombre +
          " su precio es " +
          articulos[i].precio
      );
    } else {
      alert("La elección es inválida.");
    }

    if (volver) {
      confirm("usted puede volver a la pagina");
      volver = true;
    } else {
      confirm("usted no puede volver a la pagina");
    }
  }
}
