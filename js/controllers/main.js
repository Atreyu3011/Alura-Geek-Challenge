import { productList, createProducts, deleteProduct } from "../services/product-service.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard(name, price, image, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
    <div class="img-container">
              <img class="img-card" src="${image}" alt="${name}">
            </div>

            <div class="card-container-info">
              <p>${name}</p>
              <div class="card-container-value">
                <p>${price} coins </p>
                <button class="delete-buton" data-id="${id}">
                  <img class="delete-img" src="/assets/contenedor-de-basura.png" alt="Eliminar">
                </button>
              </div>
            </div>
    `;

    const deleteButton = card.querySelector(".delete-buton")
    deleteButton.addEventListener("click", async (event) => {
        event.preventDefault()
        try {
            await deleteProduct(id)
            card.remove()
        } catch (error) {
            console.log(error)
        }
    })

    return card;

};

const render = async () => {
    try {
        const listProducts = await productList();

        listProducts.forEach(product => {
            const card = createCard(product.name, product.price, product.image, product.id)
            productContainer.appendChild(card)
        });
    } catch (error) {
        console.log(error);
    }
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    try {
        const newProduct = await createProducts(name, price, image)
        const card = createCard(newProduct.name, newProduct.price, newProduct.image, newProduct.id)
        productContainer.appendChild(card)
    } catch (error) {
        console.log(error)
    }

});


render();