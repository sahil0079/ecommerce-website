
const categoryList = document.getElementById('categoryList')

const productList = document.getElementById('productList')

const searchInput = document.getElementById('searchInput')

const minPrice = document.getElementById('minPrice')

const maxPrice = document.getElementById('maxPrice')
const clear = document.getElementById('clear')


let query = ''

function loadCategories() {

    fetch(BASE_URL + '/categories').then(response => response.json()).then((data => {
        renderCategories(data)
    })).catch((error) => console.log('Error:', error))

}

function loadProducts() {

    const data = {}
    if (window.location.search) {
        data.id = window.location.search.split("=")[1]
    }

    let URI = '/products'

    if (data.id) {
        URI = `/categories/${data.id}/products`
    }

    fetch(BASE_URL + URI).then(response => response.json())
        .then(data => renderProducts(data)).catch((error) => console.log(error))


}


function renderCategories(categories) {
    let categoryListHtml = ''

    for (let i = 0; i < categories.length; i++) {
        categoryListHtml += '<a class="d-flex text-decoration-none" href="productList.html?categoryId=' + categories[i].id + '">' + categories[i].name + '<a>'
    }
    categoryList.innerHTML = categoryListHtml

}
function renderProducts(products) {
    let productListHtml = ''

    for (let i = 0; i < products.length; i++) {
        productListHtml += '<a class="product-item text-decoration-none d-inline-block " href="productDetails.html?productId=' + products[i].id + '">'
            + '<div class="product-img" >'
            + '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB6Xg-UKUzhPIUnrSbcPdk2DWfBgGr5Tn88Q&usqp=CAU" >'

            + '</div>'
            + '<div class="product-name text-center" >' + products[i].name + '</div>'

            + '<div class="product-price text-center">&#8377; ' + products[i].cost + '</div>'

            + '</a>'
    }
    productList.innerHTML = productListHtml


}
loadCategories()
loadProducts()

function searchProduct() {
    const data = {
        name: searchInput.value,
        minCost: minPrice.value,
        maxCost: maxPrice.value
    }
    if (window.location.search) {
        data.id = window.location.search.split("=")[1]
    }

    let URI = '/products?'
    fetch(BASE_URL + URI + new URLSearchParams(data))
        .then(response => response.json())
        .then(data => renderProducts(data))
}
function clearAllFilters() {
    window.location.reload()
}

// events

searchInput.addEventListener('keyup', searchProduct)
minPrice.addEventListener('change', searchProduct)
maxPrice.addEventListener('change', searchProduct)
clear.addEventListener('click', clearAllFilters)





