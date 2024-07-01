const URL = "http://localhost:3000/Products"

export const productList = async () => {
  const response = await fetch(URL)
  const data = await response.json()

  return data
};

export const createProducts = async (name, price, image) => {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      price,
      image,
    })
  })
  const data = await response.json()

  return data
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${URL}/${id}`, {
    method: "DELETE",
    header: {
      "Content-Type": "application/json"
    }
  })
  if (response.ok) {
    throw new Error(`Error HTTP': ${response.status}`)
  }
  const data = await response.json()
  console.log('Producto eliminado:', data)
  return data

};