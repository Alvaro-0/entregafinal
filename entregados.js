document.addEventListener('DOMContentLoaded', () => {
    const articulos = [
        { nombre: "Camisa", precio: 1000, id: 1, imagen: "./img/camisa.jpg" },
        { nombre: "Pantalón", precio: 2000, id: 2, imagen: "./img/pantalon.jpg" },
        { nombre: "Zapatos", precio: 3000, id: 3, imagen: "./img/zapatos.jpg" },
    ];

    const articulosContainer = document.getElementById('articulos-container');
    const listaCarrito = document.getElementById('lista-carrito');
    const totalElement = document.getElementById('total');
    const btnVaciarCarrito = document.getElementById('btnVaciarCarrito');

    // Mostrar los artículos en la página
    articulos.forEach(articulo => {
        const articuloDiv = document.createElement('div');
        articuloDiv.innerHTML = `
            <img src="${articulo.imagen}" alt="${articulo.nombre}">
            <h2>${articulo.nombre}</h2>
            <p>$${articulo.precio}</p>
            <button onclick="agregarAlCarrito(${articulo.id})">Agregar</button>
        `;
        articulosContainer.appendChild(articuloDiv);
    });

    // Función para agregar un artículo al carrito
    window.agregarAlCarrito = function(id) {
        const articulo = articulos.find(item => item.id === id);
        if (articulo) {
            let carrito = obtenerCarritoLocalStorage();
            carrito.push(articulo);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarrito();
        }
    };

    // Función para  el carrito del localStorage
    function obtenerCarritoLocalStorage() {
        return JSON.parse(localStorage.getItem('carrito')) || [];
    }

    // Función para actualizar el carrito en la página
    function actualizarCarrito() {
        let carrito = obtenerCarritoLocalStorage();
        let total = 0;
        listaCarrito.innerHTML = '';

        carrito.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.nombre} - $${item.precio}`;
            listaCarrito.appendChild(li);
            total += item.precio;
        });

        totalElement.textContent = `$${total}`;
    }

    // Vaciar el carrito
    btnVaciarCarrito.addEventListener('click', () => {
        localStorage.removeItem('carrito');
        actualizarCarrito();
    });

    // Actualizar el carrito al cargar la página
    actualizarCarrito();
});
