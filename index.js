function changecolor() {
    document.getElementById("demo").style.color = "red";
};
let basket = JSON.parse(localStorage.getItem('data')) || [];

const shop = document.getElementById("shop");
const cartTableBody = document.querySelector("#cartTable tbody");

let generateShop = () => {
    shop.innerHTML = dummyData.map((x) => {
        let { id, name, description, image, price } = x;
        return `
            <div class="shop_item" id="productId-${id}">
                <img src="${image}" alt="" />
                <div class="product_info">
                    <h5>${name}</h5>
                    <p>$${price}</p>
                    <p>${description}</p>
                    <button onclick="add_to_cart('${id}', '${image}', '${name}', '${price}')">Add To Cart</button>
                </div>
            </div>
        `;
    });
};

let add_to_cart = (id, image, name, price) => {
    basket.push({
        id: id,
        item: 1,
        image: image,
        name: name,
        price: price,
    });

    localStorage.setItem('data', JSON.stringify(basket));
    calculate();
    updateCartTable(); // Highlighted: Update the cart table when an item is added to the cart
};

let updateCartTable = () => {
    cartTableBody.innerHTML = "";
    basket.forEach((item) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td>
                <button onclick="remove_from_cart('${item.id}')">Remove</button>
            </td>
           
        `;
        cartTableBody.appendChild(row);
    });
};

let calculate = () => {
    let cartIds = document.getElementsByClassName('cartId');
    let totalAmount = 0;

    // Calculate total amount by summing up individual item prices
    basket.forEach((item) => {
        totalAmount += parseFloat(item.price) * parseInt(item.item);
    });

    // Update the cart count in each cartId element
    for (let i = 0; i < cartIds.length; i++) {
        cartIds[i].innerHTML = basket.length;
    }

    // Update the total amount in each totalAmount element
    let totalAmountElements = document.getElementsByClassName('totalAmount');
    for (let i = 0; i < totalAmountElements.length; i++) {
        totalAmountElements[i].innerHTML = `$${totalAmount.toFixed(2)}`;
    }
};

  
let remove_from_cart = (id) => {
    
    let indexToRemove = basket.findIndex(item => item.id === id);

   
    if (indexToRemove !== -1) {
        basket.splice(indexToRemove, 1);
    }

    
    localStorage.setItem('data', JSON.stringify(basket));

   
    calculate();
    updateCartTable();
};




generateShop();
calculate();
updateCartTable();
