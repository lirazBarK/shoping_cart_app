let inventory = [
    {
        id: 1,
        item: 'Pasta',
        price: 20
    },
    {
        id: 2,
        item: 'Rice',
        price: 15
    },
    {
        id: 3,
        item: 'Cooking oil',
        price: 7
    },
    {
        id: 4,
        item: 'Milk',
        price: 12
    },
    {
        id: 5,
        item: 'Eggs',
        price: 8
    },
    {
        id: 6,
        item: 'Yogurt',
        price: 11
    },
    {
        id: 7,
        item: 'Onions',
        price: 5
    },
    {
        id: 8,
        item: 'Honey',
        price: 9
    },
    {
        id: 9,
        item: 'Sugar',
        price: 7
    },
    {
        id: 10,
        item: 'Tuna',
        price: 10
    }
];
let shoppingCart = [];

const inventoryContainer = document.querySelector('.inventory');
const shoppingCartContainer = document.querySelector('.shopping_cart');
const wallet = document.querySelector('.wallet');
const total = document.querySelector('.total');
const walletText = document.createElement('h2');
const totalText = document.createElement('h2');
let walletAmount = 50;
let totalAmount = 0;

walletText.innerHTML = `Wallet Amount: ${walletAmount}$`;
totalText.innerHTML = `Total: ${totalAmount}$`;

wallet.appendChild(walletText);
total.appendChild(totalText);

//Create span items and appends them to inventory Div 
inventory.forEach((val) => {
    let span = document.createElement('span');
    span.draggable = "true";
    span.setAttribute('id', val.id);
    span.setAttribute('price', val.price);
    span.ondragstart = function dragStart(event) {
        event.dataTransfer.setData("Text", event.target.id);
    };
    let text = `Item: ${val.item} <br> Price: ${val.price}$`;
    span.innerHTML = text;

    inventoryContainer.appendChild(span);
});


function allowDrop(event) {
    event.preventDefault();
}
/*
    * handle drop events to inventory and shopping cart divs
    * disable items based on disableItem() function
*/
function drop(event) {
    var data = event.dataTransfer.getData("Text");
    var el = event.target;
    if (el.id != 'dropzone' && el.id != 'dropzone2') {
        el = el.parentNode;
    }
    el.appendChild(document.getElementById(data));
    event.preventDefault();
    if (event.target.classList.contains('shopping_cart')) {
        dropToShoppingCart(data);
        disableItem();
    } else if (event.target.classList.contains('inventory')) {
        dropToInventory(data);
        disableItem();
    }
}

/*
    * handles wallet and total amounts based on their values
    * push items from inventory to shopping cart array
*/
function dropToShoppingCart(data) {

    for (let i = 0; i < inventory.length; i++)
        if (inventory[i].id === parseInt(data, 10)) {
            let itemToPush = inventory[i];
            walletAmount -= itemToPush.price;
            walletText.innerHTML = `Wallet Amount: ${walletAmount}$`;
            wallet.appendChild(walletText);
            totalAmount += itemToPush.price;
            totalText.innerHTML = `Total: ${totalAmount}$`;
            total.appendChild(totalText);
            inventory.splice(i, 1);
            shoppingCart.push(itemToPush);
            break;
        }
}
/*
    * handles wallet and total amounts based on their values
    * push items from shopping cart to inventory array
*/
function dropToInventory(data) {
    for (let i = 0; i < shoppingCart.length; i++)
        if (shoppingCart[i].id === parseInt(data, 10)) {
            let itemToPush = shoppingCart[i];
            totalAmount -= itemToPush.price;
            totalText.innerHTML = `Total: ${totalAmount}$`;
            total.appendChild(totalText);
            walletAmount += itemToPush.price;
            walletText.innerHTML = `Wallet Amount: ${walletAmount}$`;
            wallet.appendChild(walletText);
            shoppingCart.splice(i, 1);
            inventory.push(itemToPush);
            break;
        }
}


//applies css styling on span items if draggble
function disableItem() {
    document.querySelector(".inventory").querySelectorAll('span')
        .forEach(span => {
            span.setAttribute('draggable', span.getAttribute('price') <= walletAmount);
            if(span.draggable === false) {
                span.style.backgroundColor = "#cccccc";
                span.style.color = "#666666";
            }else {
                span.style.backgroundColor = "white";
                span.style.color = "#000000";
            }
        });
}

