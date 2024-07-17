
"use client"; // Indica que este código debe ser ejecutado en el cliente, no en el servidor.

import { useState } from "react"; // Importa el hook useState de React para manejar el estado del componente.

export default function Component() { // Define el componente funcional 'Component'.
  const [cart, setCart] = useState([]); // Declara un estado 'cart' que es un array vacío inicialmente.

  // Función para manejar cambios en la cantidad de pizzas en el carrito.
  const handleQuantityChange = (index, quantity) => {
    const updatedCart = [...cart]; // Crea una copia del estado 'cart'.
    if (quantity === 0) {
      updatedCart.splice(index, 1); // Si la cantidad es 0, elimina el item del carrito.
    } else {
      updatedCart[index].quantity = quantity; // Si no, actualiza la cantidad del item.
    }
    setCart(updatedCart); // Actualiza el estado 'cart' con la copia modificada.
  };

  // Calcula el total del carrito sumando los precios de cada item multiplicados por sus cantidades.
  const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);

  // Construye el mensaje de WhatsApp con la información del pedido.
  const buildWhatsAppMessage = () => {
    let message = "Mi pedido:\n\n";
    cart.forEach((item) => {
      message += `${item.name} x ${item.quantity} - $${(item.quantity * item.price).toFixed(2)}\n`;
    });
    message += `\nTotal: $${total.toFixed(2)}`;
    return message;
  };

  const whatsappNumber = "+543583640330"; // Número de WhatsApp al que se enviará el mensaje.

  return (
    <div className="bg-[#BFADAA] min-h-screen"> {/* Contenedor principal con fondo gris claro y altura mínima de pantalla completa */}
      <header className="bg-[#8E7B61] text-white py-4 px-6 flex items-center"> {/* Encabezado con fondo oscuro y texto blanco */}
        <img src="https://static.vecteezy.com/system/resources/previews/004/797/149/non_2x/illustration-graphic-of-modern-eg-letter-logo-perfect-to-use-for-technology-company-free-vector.jpg" alt="Logo" className="w-12 h-12 mr-4" /> {/* Imagen al lado del texto */}
        <h1 className="text-3xl text-black font-bold">Pizzería Una Cosa De Locos</h1> {/* Título */}
      </header>
      <main className="container mx-auto py-8 px-4 md:px-1"> {/* Contenedor principal del contenido con padding */}
        <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 lg:gap-8 p-2"> {/* Sección de las pizzas en formato grid */}
          {[
            { name: "Margherita", price: 6000, image: "https://media-cdn.tripadvisor.com/media/photo-s/19/68/63/b6/vegetarian-pizza.jpg?height=200&width=400" },
            { name: "Pepperoni", price: 6000, image: "https://www.nist.gov/sites/default/files/styles/960_x_960_limit/public/images/director/400x200-logo.jpg?itok=CTzM4el9?height=200&width=400" },
            { name: "Vegetariana", price: 6000, image: "https://i.pinimg.com/736x/2d/41/f7/2d41f7762a4e8b20473caada000641ff.jpg?height=200&width=400" },
            { name: "Hawaiana", price: 7000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAk6JBX5ZbAiF4EggpiGlYAS8c5v-POxu55Q&s?height=200&width=400" },
            { name: "Cuatro Quesos",price: 7000,image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgILblMkqzoB-8u38BZ7UBGUYZWXlh9nyomg&s?height=200&width=400",},
            { name: "Carbonara", price: 7000, image: "https://i.ytimg.com/vi/6jNMinJKE40/maxresdefault.jpg?height=200&width=400" },
          ].map((pizza, index) => ( // Mapea las pizzas para crear un componente para cada una.
            <div key={index} className="relative bg-[#C7BDB3] rounded-lg shadow-md overflow-hidden"> {/* Contenedor de cada pizza */}
              <img src={pizza.image} alt={pizza.name} className="w-full h-48 md:h-96 lg:h-96 object-cover" /> {/* Imagen de la pizza */}
              <div className="p-1 md:p-2 lg:p-2"> {/* Contenedor de la descripción */}
                <h2 className="text-lg font-bold mb-1 md:mb-1 lg:mb-1">{pizza.name}</h2> {/* Nombre de la pizza */}
                <p className="text-gray-600 mb-8 md:mb-8 lg:mb-8"> {/* Descripción de la pizza */}
                  {pizza.name === "Margherita"
                    ? "Salsa de tomate, mozzarella, albahaca fresca."
                    : pizza.name === "Pepperoni"
                    ? "Salsa de tomate, mozzarella, pepperoni."
                    : pizza.name === "Vegetariana"
                    ? "Salsa de tomate, mozzarella, pimientos, champiñones, cebolla."
                    : pizza.name === "Hawaiana"
                    ? "Salsa de tomate, mozzarella, jamón, piña."
                    : pizza.name === "Cuatro Quesos"
                    ? "Salsa de tomate, mozzarella, gorgonzola, provolone, parmesano."
                    : "Salsa de tomate, mozzarella, panceta, huevo, parmesano."}
                </p>
                <div className="flex items-center justify-between absolute bottom-0 left-0 right-0 p-1"> {/* Contenedor del precio y controles de cantidad */}
                  <span className="text-lg font-bold">${pizza.price}</span> {/* Precio */}
                  <div className="flex items-center"> {/* Controles de cantidad */}
                    <button
                      className="bg-[#333] text-white px-2 py-1 rounded-l-md"
                      onClick={() => { // Maneja el clic para disminuir la cantidad.
                        const index = cart.findIndex((item) => item.name === pizza.name); // Busca el índice de la pizza en el carrito.
                        if (index !== -1) {
                          handleQuantityChange(index, Math.max(cart[index].quantity - 1, 0)); // Disminuye la cantidad si es mayor que 0.
                        }
                      }}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      className="w-12 px-2 py-1 border-t border-b border-gray-300 text-center bg-[#E7E0DA]"
                      value={cart.find((item) => item.name === pizza.name)?.quantity || 0} // Muestra la cantidad actual en el input.
                      onChange={(e) => { // Maneja el cambio en el input.
                        const quantity = parseInt(e.target.value);
                        const index = cart.findIndex((item) => item.name === pizza.name);
                        if (index !== -1) {
                          handleQuantityChange(index, quantity); // Actualiza la cantidad si ya está en el carrito.
                        } else if (quantity > 0) {
                          setCart([
                            ...cart,
                            { name: pizza.name, quantity, price: pizza.price },
                          ]); // Añade la pizza al carrito si no está y la cantidad es mayor que 0.
                        }
                      }}
                    />
                    <button
                      className="bg-[#333] text-white px-2 py-1 rounded-r-md"
                      onClick={() => { // Maneja el clic para aumentar la cantidad.
                        const index = cart.findIndex((item) => item.name === pizza.name);
                        if (index !== -1) {
                          handleQuantityChange(index, cart[index].quantity + 1); // Aumenta la cantidad si ya está en el carrito.
                        } else {
                          setCart([...cart, { name: pizza.name, quantity: 1, price: pizza.price }]); // Añade la pizza al carrito si no está.
                        }
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
        <section className="bg-[#C7BDB3] rounded-lg shadow-md p-6 mt-8"> {/* Sección del resumen del pedido */}
          <h2 className="text-lg font-bold mb-4">Resumen del pedido</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              {cart.map((item, index) => ( // Mapea el carrito para mostrar el nombre y cantidad de cada pizza.
                <p key={index} className="text-gray-600">
                  {item.name} x {item.quantity}
                </p>
              ))}
            </div>
            <div className="text-right">
              {cart.map((item, index) => ( // Mapea el carrito para mostrar el precio total de cada pizza.
                <p key={index}>${(item.quantity * item.price).toFixed(2)}</p>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mt-4"> {/* Total del pedido y botón para ordenar */}
            <span className="text-lg font-bold">Total: ${total.toFixed(2)}</span>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(buildWhatsAppMessage())}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25d366] text-white px-4 py-2 rounded-md hover:bg-[#128c7e] transition-colors"
            >
              Ordenar por WhatsApp
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}