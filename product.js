let allproducts = [];
let filteredcategory = null;

//fetch products from server

async function fetchproducts() {
    try {
        const response = await fetch("http://localhost:3003/products");
        if (!response.ok)
            throw new Error(`HTTP error! status :${response.status}`);
        const products = await response.json();

        allproducts = products;
        populatecategories(products);
        displayproducts(products);

    }

    catch (error) {
        const error1 = document.getElementById("error1");
        if (error1) {
            error1.textContent = "failed to load products" + error.message;
        } else {
            alert("failed to load products" + error.message);
        }
    }
}

//generate category list
function populatecategories(products) {
    const categorylist = document.getElementById("categorylist");
    const categories = [...new Set(products.map(p => p.category))];

    categorylist.innerHTML = `
    <li onclick=filterbycategory(null)>all</li>` +
        categories.map(cat => `<li onclick="filterbycategory('${cat}')">${cat}</li>`).join('');

}

    function filterbycategory(category) {
        filteredcategory = category;
        applyfilters();
    }

    //apply filters
    function applyfilters() {
        let filtered = [...allproducts];

        if (filteredcategory) {
            filtered = filtered.filter(p => p.category === filteredcategory);
        }

        const searchterm = document.getElementById("searchbox").value.toLowerCase();
        if (searchterm) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchterm) ||
                p.description.toLowerCase().includes(searchterm)
            );
        }

        const sorttype = document.getElementById("sortselect").value;
        if (sorttype === "lowtohigh") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sorttype === "hightolow"){
            filtered.sort((a, b) => b.price - a.price);
        }
         
    displayproducts(filtered);

}

function displayproducts(products) {
    const productse1 = document.getElementById("products");
    if (products.length == 0) {
        productse1.innerHTML = "<p> no products available</p>"
        return;
    }

    productse1.innerHTML = products.map(product => `
        <div class="product">
        <img src="${product.image}" />
        <h3>${product.name}</h3.
        <p>${product.description}</p>
        <h5>${product.category}</h5>
        <div class="price"> Rs ${product.price.toFixed(2)}</div>
        <button onclick='addtocart(${JSON.stringify(product)})'>Add to cart</button>
        </div>
        `).join("");

}

function addtocart(product){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find(item => item.id === product.id);

    if(!exists){
        cart.push(product);
        localStorage.setItem("cart",JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
    }else{
        alert(`${product.name} is already in the cart.`);
    }
}

document.getElementById("searchbox").addEventListener("input", applyfilters);
document.getElementById("sortselect").addEventListener("change", applyfilters);


fetchproducts();