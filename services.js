
const products = [
    { name: "Margarita", price: 100, image: "margarita.webp" },
    { name: "Pepperoni", price: 120, image: "pepperoni.png" },
    { name: "Kebab-Tallrik", price: 100, image: "kebabtallrik.jpg"},
    { name: "Falafel", price: 100, image: "falafel.jpeg"}
    
];

document.addEventListener("DOMContentLoaded", function () {
    const menuContainer = document.getElementById("menu");
    const cartItemsContainer = document.getElementById("cart-items");
    const totalSpan = document.getElementById("total");

   
    products.forEach(product => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");
        menuItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>${product.price} kr</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Lägg till</button>
        `;
        menuContainer.appendChild(menuItem);
    });

    
    window.addToCart = function (productName, productPrice) {
        const cartItem = document.createElement("li");
        cartItem.innerHTML = `
            <span>${productName} - ${productPrice} kr</span>
            <button onclick="removeFromCart(this, ${productPrice})">Ta bort</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        updateTotal();
    };

    
    window.removeFromCart = function (element, productPrice) {
        element.parentNode.remove();

        updateTotal();
    };

    
    function updateTotal() {
        const cartItems = document.querySelectorAll("#cart-items li");
        let total = 0;
        cartItems.forEach(item => {
            const price = parseFloat(item.textContent.match(/\d+/)[0]);
            total += price;
        });
        totalSpan.textContent = total + " kr";
    }

    window.checkout = function () {
        const cartItems = document.querySelectorAll("#cart-items li");
        if (cartItems.length > 0) {
            cartItems.forEach(item => {
                item.remove();
            });

            updateTotal();
            alert("Tack för ditt besök! Din beställning har checkats ut.");
        } 
        else {
            alert("Kundvagnen är tom. Lägg till produkter innan du checkar ut.");
        }
    };
});


