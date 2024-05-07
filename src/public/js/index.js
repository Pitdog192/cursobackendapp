const socket = io()

//FORMULARIO PARA AGREGAR PRODUCTO
const productFormAdd = document.getElementById('product-form-add')
productFormAdd.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(productFormAdd)
    const newProduct = Object.fromEntries(formData.entries())
    fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }
        return response.json()
    })
    .then(data => {
        console.log(data.message)
        socket.emit('newProduct', newProduct)
    })
    .catch(error => console.error('Error creating product:', error))
})

//FORMULARIO PARA ELIMINAR PRODUCTO 
const productFormDelete = document.getElementById('product-form-delete')
productFormDelete.addEventListener('submit', (event) => {
    event.preventDefault()
    let id = document.getElementById('id').value
    fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }
        return response.json()
    })
    .then(data => {
        console.log(data.message)
        socket.emit('deleteProduct', id)
    })
    .catch(error => console.error(error))
})

function updateTable(products) {
    let bodyTable = document.getElementById('body-table')
    bodyTable.innerHTML = ``
    products.forEach(prod => {
        const filaT = document.createElement('tr')
        filaT.innerHTML = ` <td>${prod.title}</td>
                            <td>${prod.description}</td>
                            <td>${prod.price}</td>
                            <td>${prod.code}</td>
                            <td>${prod.stock}</td>
                            <td>${prod.category}</td>
                            <td>${prod.status}</td>
                            <td>${prod.id}</td>`
        bodyTable.appendChild(filaT)
    })
}

socket.on('productos', (productos) => {
    updateTable(productos)
})