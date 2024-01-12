window.onload = () =>{

    //Menú desplegable del perfil//
    let botonUsuario = document.querySelector(".boton_usuario");
    let desplegablePerfil = document.querySelector(".desplegable_perfil");

    desplegablePerfil.style.display = "none";

    botonUsuario.addEventListener("click", function () {
        if (desplegablePerfil.style.display === "none") {
        desplegablePerfil.style.display = "flex";
        } else {
        desplegablePerfil.style.display = "none";
        }
    });


    // Cesta //
    // Cesta //
    let botonCesta = document.querySelector(".boton_cesta");
    let areaCesta = document.querySelector(".area_cesta");
    let closeButton = document.querySelector("#botonCerrarCesta");

    areaCesta.style.display = "none";

    // Evento para abrir/cerrar la cesta al hacer clic en el botón
    botonCesta.addEventListener("click", function (event) {
        event.stopPropagation();
        if (areaCesta.style.display === "none") {
            areaCesta.style.display = "flex";
        } else {
            areaCesta.style.display = "none";
        }
    });

    // Evento para cerrar la cesta al hacer clic en el área de la cesta
    areaCesta.addEventListener("click", function (event) {
        event.stopPropagation();
        
        // Verifica si el objetivo del clic es el icono de cerrar
        if (!event.target.classList.contains("iconoCerrarCesta")) {
            // Cierra la cesta solo si no se hizo clic en el icono de cerrar
            areaCesta.style.display = "none";
        }
    });

    // Evento para cerrar la cesta al hacer clic en el botón de cerrar
    closeButton.addEventListener("click", function (event) {
        event.stopPropagation();
        areaCesta.style.display = "none";
    });

    //Galería de Ofertas//
    let cambioimagen = (item) => {
        let imagengrande = document.querySelector("#imagen_galeria");
        imagengrande.src = item.src;
        imagengrande.alt = item.alt;

        miniaturas.forEach(elem =>{
            elem.classList.remove("active");
        })
        item.classList.add("active");
    };


    document.querySelectorAll('.mini').forEach(item => {
        item.addEventListener('click', event => {
            console.log(item.dataset.num);
            imgActual = item.dataset.num;

            if(event.key =="Enter"){
                imgActual(item.dataset.num);
            }
        cambioimagen(item);
        });
    });

    let imgActual = 0;
    let miniaturas = document.querySelectorAll('.mini');
    console.log(miniaturas[0]);

    let botonIzq = document.querySelector("#boton_izq");

    botonIzq.addEventListener("click",()=>{
        imgActual == 0 ? imgActual = 4: imgActual--;
        cambioimagen(miniaturas[imgActual]);
    });

    let botonDcha = document.querySelector("#boton_dcha");

    botonDcha.addEventListener("click",()=>{
        imgActual == 4 ? imgActual = 0: imgActual++;
        cambioimagen(miniaturas[imgActual]);
    });


    //ventana detalles//
    const botonesDetalles = document.querySelectorAll(".boton_detalles");
    const cerrarDetalleModalBtn = document.getElementById("cerrarDetalleModalBtn");

    botonesDetalles.forEach(boton => {
        boton.addEventListener("click", function () {
            const cajaProducto = boton.closest(".caja_producto");
            const nombre = cajaProducto.querySelector(".nombre_productos").textContent;
            const info = cajaProducto.querySelector(".descripcion").textContent;
            const precio = cajaProducto.querySelector(".precio").textContent;
            const imagen = cajaProducto.querySelector(".img_producto").src;

            abrirDetalleModal(nombre, info, precio, imagen);
        });
    });

    cerrarDetalleModalBtn.addEventListener("click", cerrarDetalleModal);

    function abrirDetalleModal(nombre, info, precio, imagen) {
        const modal = document.getElementById("modal");
        const productImage = document.getElementById("product-image");
        const tituloProducto = document.querySelector(".titulo_producto");
        const detallesDescripcion = document.querySelector(".detalles_descripcion");
        const precioProducto = document.querySelector(".precio_producto");

        productImage.src = imagen;
        tituloProducto.textContent = nombre;
        detallesDescripcion.textContent = info;
        precioProducto.textContent = `${precio}`;

        modal.style.display = "block";
    }

    function cerrarDetalleModal() {
        const modal = document.getElementById("modal");
        modal.style.display = "none";
    }
    
    // Funcionalidad de la cesta //
    let cestaProductos = [];
    let cestaAbierta = false;

    const pulsarComprar = document.querySelectorAll(".comprar");
    pulsarComprar.forEach((button) => {
        button.addEventListener("click", (event) => {
        event.stopPropagation();
        añadirProductoACesta(button.parentElement.parentElement);

        if (!cestaAbierta) {
            areaCesta.style.display = "flex";
            cestaAbierta = true;
        }
        });
    });

    const actualizarNumeroCesta = () => {
        const numeroCestaElemento = document.querySelector(".numero_cesta");
        numeroCestaElemento.textContent = cestaProductos.length;
    };

    let totalCesta = 0;

    const añadirProductoACesta = (element) => {
        const descripcion = element.querySelector(".descripcion").innerText;
        const precio = parseFloat(
        element.querySelector(".precio").innerText.replace("€", "")
        );

        const productoEnCesta = cestaProductos.find(
        (producto) => producto.descripcion === descripcion
        );

        if (productoEnCesta) {
            productoEnCesta.cantidad++;
        } else {
            cestaProductos.push({ descripcion, precio, cantidad: 1 });
        }

        actualizarNumeroCesta();
        mostrarCesta();

        totalCesta += precio;
        mostrarTotalCesta();
    };

    const mostrarCesta = () => {
        const listaCesta = document.getElementById("listaCesta");
        listaCesta.innerHTML = "";

        cestaProductos.forEach((producto, index) => {
            const itemCesta = document.createElement("li");

            const contenedor1 = document.createElement("div");
            contenedor1.classList.add("especificacionesCesta");

            const spanDescripcion = document.createElement("span");
            spanDescripcion.textContent = producto.descripcion;
            spanDescripcion.classList.add("descripcionProducto");

            const spanPrecio = document.createElement("span");
            spanPrecio.textContent = `${producto.precio.toFixed(2)}€`;
            spanPrecio.classList.add("precioProducto");

            const iconoEliminar = document.createElement("span");
            iconoEliminar.classList.add(
                "material-symbols-outlined",
                "eliminarProducto"
            );
            iconoEliminar.textContent = "delete";

            iconoEliminar.addEventListener("click", () => {
                eliminarProductoDeCesta(index);
            });

            contenedor1.appendChild(spanDescripcion);
            contenedor1.appendChild(spanPrecio);
            contenedor1.appendChild(iconoEliminar);

            const contenedor2 = document.createElement("div");
            contenedor2.classList.add("cantidadesCesta");

            const iconoAgregar = document.createElement("span");
            iconoAgregar.classList.add(
                "material-symbols-outlined",
                "agregarCantidad"
            );
            iconoAgregar.textContent = "add";

            const spanCantidad = document.createElement("span");
            spanCantidad.textContent = `${producto.cantidad}`;
            spanCantidad.classList.add("numeroCantidad");

            const iconoEliminarCantidad = document.createElement("span");
            iconoEliminarCantidad.classList.add(
                "material-symbols-outlined",
                "eliminarCantidad"
            );
            iconoEliminarCantidad.textContent = "remove";

            contenedor2.appendChild(iconoAgregar);
            contenedor2.appendChild(spanCantidad);
            contenedor2.appendChild(iconoEliminarCantidad);

            itemCesta.appendChild(contenedor1);
            itemCesta.appendChild(contenedor2);

            itemCesta.classList.add("elementos_cesta");

            listaCesta.appendChild(itemCesta);

            const descripcionProducto = producto.descripcion;

            iconoAgregar.addEventListener("click", () => {
                agregarCantidadAProducto(descripcionProducto);
            });

            iconoEliminarCantidad.addEventListener("click", () => {
                eliminarCantidadDeProducto(descripcionProducto);
            });
        });
    };

    // Agregar dando al + //

    const agregarCantidadAProducto = (descripcion) => {
        const producto = cestaProductos.find(
            (producto) => producto.descripcion === descripcion
        );
    
        if (producto) {
            producto.cantidad++;
            const elementosCesta = document.querySelectorAll(`.elementos_cesta[data-descripcion="${descripcion}"]`);
            elementosCesta.forEach((itemCesta) => {
                const spanCantidad = itemCesta.querySelector('.numeroCantidad');
                if (spanCantidad) {
                    spanCantidad.textContent = `${producto.cantidad}`;
                }
            });

            mostrarTotalCesta();
        }
    
        console.log(`Añadiendo ${descripcion}`);
    };

    // Eliminar dando al - //
    const eliminarCantidadDeProducto = (descripcion) => {
        const producto = cestaProductos.find(
        (producto) => producto.descripcion === descripcion
        );

        if (producto) {
            producto.cantidad--;
        };

        if (producto.cantidad <= 0) {
            eliminarProductoDeCesta(descripcion);
        } else {
            const spanCantidad = document.querySelector(`.numeroCantidad[data-descripcion="${descripcion}"]`);
            if (spanCantidad) {
                spanCantidad.textContent = `${producto.cantidad}`;
            };

            mostrarTotalCesta();
        };
        console.log(`Eliminando ${descripcion}`);
    };

    const mostrarTotalCesta = () => {
        const totalCestaElemento = document.getElementById("totalCesta");
        totalCestaElemento.textContent = `Total: ${calcularTotalCesta().toFixed(2)}€`;
    };

    const calcularTotalCesta = () => {
        return cestaProductos.reduce((total, producto) => total + producto.precio * producto.cantidad,0);
    };

     const eliminarProductoDeCesta = (index) => {
        cestaProductos.splice(index, 1);

        mostrarCesta();
        actualizarNumeroCesta();

        mostrarTotalCesta();
    };

};


