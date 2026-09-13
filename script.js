let allProducts = [];
let favourites = [];

const productsDiv = document.getElementById("products");
const searchbox = document.getElementById("searchbox"); 
const favcount = document.getElementById("favcount");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

async function getProducts() {
    try {
        loading.innerText = "Loading...";
        const res = await fetch('https://dummyjson.com/products?limit=20');
        const data = await res.json();
        allProducts = data.products;
        loading.style.display = "none";
        showProducts(allProducts);
    }
    catch (err) {
        loading.style.display = "none";
        error.style.display = "block";
        error.innerText = "Failed to load products";
        console.log(err);
    }
}

function showProducts(products) {
    productsDiv.innerHTML = '';
    if(products.length === 0){
        productsDiv.innerHTML = "<p>No products found</p>";
        return;
    }
    products.forEach(product => {
        const card = `
      <div class="card">
        <img src="${product.thumbnail}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <button onclick="toggleFav(${product.id})">
          ${favourites.includes(product.id) ? 'Remove Fav' : 'Add Fav'}
        </button>
      </div>
    `;
        productsDiv.innerHTML += card;
    });
}

searchbox.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    const filtered = allProducts.filter(
        p => p.title.toLowerCase().includes(searchText)
    );
    showProducts(filtered);
});

function toggleFav(id) {
    if (favourites.includes(id)) {
        favourites = favourites.filter(favId => favId !== id);
    } else {
        favourites.push(id);
    }
    favcount.innerText = favourites.length;
    showProducts(allProducts);
}

function toSearch() {
    const searchTerm = document.getElementById('searchbox').value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const productDesc = card.querySelector('p').textContent.toLowerCase();
        
        if(productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

document.getElementById('searchbox').addEventListener('keyup', toSearch);
document.querySelector('.search-box').addEventListener('click', function() {
    document.getElementById('searchbox').focus();
});
getProducts();s