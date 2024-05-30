document.addEventListener('DOMContentLoaded', () => {
    const articulosContainer = document.getElementById('articulos-container');
    const listaCarrito = document.getElementById('lista-carrito');
    const totalElement = document.getElementById('total');
    const btnVaciarCarrito = document.getElementById('btnVaciarCarrito');
    const btnComprar = document.getElementById('btnComprar'); 


    // obtener los artículos desde un archivo JSON
    fetch('./productos.json')
        .then(response => response.json())
        .then(articulos => {
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
                    Swal.fire({
                        title: '¡Añadido!',
                        text: `${articulo.nombre} ha sido añadido al carrito.`,
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                }
            };
        })
        .catch(error => console.error('Error al cargar los artículos:', error));


    // Función para obtener el carrito del localStorage
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
        Swal.fire({
            title: 'Carrito vaciado',
            text: 'El carrito ha sido vaciado.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    }); 

    
    // Comprar los artículos del carrito
    btnComprar.addEventListener('click', () => {
        let carrito = obtenerCarritoLocalStorage();
        if (carrito.length > 0) {
            localStorage.removeItem('carrito');
            actualizarCarrito();
            Swal.fire({
                title: 'Compra realizada',
                text: '¡Gracias por tu compra! Los productos han sido comprados.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        } else {
            Swal.fire({
                title: 'Carrito vacío',
                text: 'No hay productos en el carrito para comprar.',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
        }
    });

    
    // Actualizar el carrito al cargar la página
    actualizarCarrito();
});