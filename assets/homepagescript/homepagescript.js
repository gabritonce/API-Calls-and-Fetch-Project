const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const token = " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDVmYzAzOWQwMTc5MzAwMTQyNjIyMDciLCJpYXQiOjE2ODM5OTY3MjksImV4cCI6MTY4NTIwNjMyOX0.KJ1NEI9wroi3nmQQG_P_6D9JKKKyy63YK9xcQQIPPvI"
let products = [];

// GET
function createProductTable(products) {

    if (products.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'Nessun prodotto trovato.';
        document.body.appendChild(message);
        return;
    }

 
    const table = document.createElement('table');
    document.body.appendChild(table);

   
    const headerRow = document.createElement('tr');
    table.appendChild(headerRow);

    const nameHeader = document.createElement('th');
    nameHeader.textContent = 'Nome';
    headerRow.appendChild(nameHeader);

    const descriptionHeader = document.createElement('th');
    descriptionHeader.textContent = 'Descrizione';
    headerRow.appendChild(descriptionHeader);

    const priceHeader = document.createElement('th');
    priceHeader.textContent = 'Prezzo';
    headerRow.appendChild(priceHeader);

   
    for (const product of products) {
        const row = document.createElement('tr');
        table.appendChild(row);

        const nameCell = document.createElement('td');
        nameCell.textContent = product.name;
        row.appendChild(nameCell);

        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = product.description;
        row.appendChild(descriptionCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = `${product.price} €`;
        row.appendChild(priceCell);
    }
}


onGetProducts = () => {
    fetch(endpoint, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + token
        },
    }).then(
        res => res.json()
    ).then(
        resJson => {
            products = resJson
            const productsContainer = document.getElementById("products-container")
            productsContainer.innerHTML = "" 
            products.forEach(product => {
                const card = document.createElement("div")
                card.classList.add("col-md-4")
                card.innerHTML = `
                  <div class="card mb-4 shadow-sm">
                    <img class="card-img-top" src="${product.imageUrl}" alt="Product image">
                    <div class="card-body">
                      <h5 class="card-title">${product.name}</h5>
                      <p class="card-text ">${product.description}</p>
                      <p class="card-text">${product.brand}</p>
                      <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">${product.price} €</small>
                        <button type="button" id="details" class="btn btn-sm btn-primary">Scopri di più</button>
                        <button type="button" id="updateButton" class="btn btn-sm btn-primary">Modifica</button>
                      </div>
                    </div>
                  </div>
                `;

                card.querySelector('#updateButton').addEventListener('click', () => {
                    onEditMode(product);
                });

                card.querySelector('#details').addEventListener('click', () => {
                    window.location.replace('dettagli.html');
                    localStorage.setItem('product', JSON.stringify(product))
                });
                productsContainer.appendChild(card)

            })

        }).catch(
            err => {
                window.alert('Errore di connessione')
            }
        )
}


window.onload = () => {
    onGetProducts()

}

exitEditMode = () => {
    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    const brandInput = document.getElementById('brand');
    const imageUrlInput = document.getElementById('imageUrl');
    const priceInput = document.getElementById('price');
    const form = document.getElementById('product-form')
    form.style.display = 'none'


    
    nameInput.value = ''
    descriptionInput.value = ''
    brandInput.value = ''
    imageUrlInput.value = ''
    priceInput.value = ''
}
let productId = ''

onEditMode = (product) => {


    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    const brandInput = document.getElementById('brand');
    const imageUrlInput = document.getElementById('imageUrl');
    const priceInput = document.getElementById('price');
    productId = product._id
    const form = document.getElementById('product-form')
    form.style.display = 'inline'



    
    nameInput.value = product.name
    descriptionInput.value = product.description
    brandInput.value = product.brand
    imageUrlInput.value = product.imageUrl
    priceInput.value = product.price



    console.log(product);
}


// PUT

onPutNewProduct = () => {
    const name = document.getElementById('name').value
    const description = document.getElementById('description').value
    const brand = document.getElementById('brand').value
    const imageUrl = document.getElementById('imageUrl').value
    const price = document.getElementById('price').value
    const id = productId
    if (
        name != '' &&
        description != '' &&
        brand != '' &&
        imageUrl != '' &&
        price != ''
    ) {
        const bodyPost = {
            name: name,
            description: description,
            brand: brand,
            imageUrl: imageUrl,
            price: Number(price)
        }
        fetch(endpoint + '/' + id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer" + token
            },
            body: JSON.stringify(bodyPost)
        }).then(
            res => res.json()
        ).then(
            resJson => {
                console.log(resJson)

                onGetProducts()
                exitEditMode()
            }
        ).catch(
            err => {
                window.alert('Si è verificato un problema')
            }
        )
    }
    else {
        window.alert('Uno o più campi non sono stati correttamente compilati')
    }
}
