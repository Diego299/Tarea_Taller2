document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-comprar');
    const carrito = document.getElementById('lista-carrito');
    const total = document.getElementById('total');
    let carritoProductos = [];

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const item = e.target.parentElement;
            const producto = {
                nombre: item.querySelector('p').textContent,
                precio: parseFloat(item.querySelector('.precio').textContent.replace('$', '')),
                cantidad: 1
            };

            const productoExistente = carritoProductos.find(p => p.nombre === producto.nombre);
            if (productoExistente) {
                productoExistente.cantidad += 1;
            } else {
                carritoProductos.push(producto);
            }

            actualizarCarrito();
        });
    });

    function actualizarCarrito() {
        carrito.innerHTML = '';
        let totalPrecio = 0;

        carritoProductos.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('carrito-producto');
            div.innerHTML = `
                <p>${producto.nombre} x${producto.cantidad} - $${producto.precio * producto.cantidad}</p>
                <button class="btn-eliminar">Eliminar</button>
            `;
            carrito.appendChild(div);

            totalPrecio += producto.precio * producto.cantidad;

            div.querySelector('.btn-eliminar').addEventListener('click', () => {
                carritoProductos = carritoProductos.filter(p => p.nombre !== producto.nombre);
                actualizarCarrito();
            });
        });

        total.textContent = totalPrecio.toFixed(2);
    }
});
