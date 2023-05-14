onGetDetails = () => {
    const product = JSON.parse(localStorage.getItem('product'))
    document.getElementById('detail').innerHTML = `
    <div>
    <h2> Nome prodotto: ${product.name}</h2>
    <p> Descrizione prodotto: ${product.description}</p>
    <img src="${product.imageUrl}" alt="">
    <p> Brand:${product.brand} </p>

    <p> Prezzo:${product.price} </p>
    </div>
    `
    console.log(product)
}

onGetDetails()