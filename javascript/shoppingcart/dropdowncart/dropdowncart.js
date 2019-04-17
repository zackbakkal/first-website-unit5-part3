/**
 * File Name: cartIcon.js
 * Author: Zakaria Bakkal
 * Version: 1
 * Date: April 06, 2019
 * Description: This script handles the menu on hand-held devices
 *              that have max-width 767px. The menu first looks like
 *              three horizontal bars, and when it is clicked the 
 *              the menu appears and the menu icon looks like an X.
 */

var cartIcon;     // The div that hosts the cart icon
var cart;
var totalQty;
var totalPrice;
var myCart;

/*
* This function is called when the page has finished loading.
*/
function start() {
    // Retrieve the element from the DOM with the id named carticon
    cartIcon = document.getElementById("carticonimg");

    // Retrieve the element from the DOM with the id named menu and
    // set its display attribute in the style to 'none'
    cart = document.getElementById("cart");
    //cart.style.display = "none";
    cart.style.height = "0";
    cart.style.width = "0";
    // Add an event listner to the element retrieved above. When the element is clicked
    // call the function named changeLook
    cartIcon.addEventListener("mouseover",
        function () {
            console.log(cart.style);
            // Remove the display property from the menu style so that it is shown
            // after we click again
            //cart.style.display = "block";
            cart.style.borderStyle = "outset";
            cart.style.borderColor = "rgb(248, 164, 118)";
            cart.style.height = "auto";
            cart.style.width = "400px";

            console.log(cart.className);
            // Calls the changeLook function and pass the cartIcon element to it which
            // is represented by the keyword this.
            showCart();

        }
        , false);

}

/* 
* Change how the sandwich bars menu look.
*/
function showCart() {

    if (screen.width > 767) {
        myCart = new Cart();
        myCart.loadCart(JSON.parse(localStorage.getItem("mycart")));

        displayItems();

        // Add an event listner to the sanwichbar so that if it is clicked when the 
        // menu is shown the menu will hide
        cartIcon.addEventListener("mouseout",
            function () {
                // Calls the resetSandwichBar function to change the menu button to
                // a sandwich look
                //cart.style.display = "none";
                cart.style.height = "0";
                cart.style.width = "0";
                cart.style.borderColor = "white";
                cart.style.borderStyle = "hidden";

                while (cart.firstElementChild) {
                    cart.removeChild(cart.firstElementChild);
                }
            }
            , false);
    }
}

function displayItems() {
    // remove any children of tableBody element
    while (cart.firstElementChild) {
        cart.removeChild(cart.firstElementChild);
    }

    // reset totals
    totalQty = document.createElement("span");
    totalQty.innerHTML = 0;
    totalPrice = document.createElement("span");
    totalPrice.innerHTML = (0).toFixed(2);

    // check if the cart has any products added to it
    if (myCart._totalQty > 0) {

        var header = document.createElement("div");
        var itemName = document.createElement("span");
        itemName.innerHTML = "Name";
        header.appendChild(itemName);

        var itemPrice = document.createElement("span");
        itemPrice.innerHTML = "Price";
        header.appendChild(itemPrice);

        var qty = document.createElement("span");
        qty.innerHTML = "Qty";
        header.appendChild(qty);

        var total = document.createElement("span");
        total.innerHTML = "Total";
        header.appendChild(total);

        cart.appendChild(header);

        // Display added items on the cart
        myCart._rows.forEach(row => {
            displayItem(row);
        });

        // Display the shopping cart total qty of items
        totalQty.innerHTML = myCart._totalQty;

        // Display the shopping cart total price of items
        totalPrice.innerHTML = parseFloat((myCart._totalPrice).toFixed(2));

        var totals = document.createElement("div");
        totals.appendChild(totalQty);
        totals.appendChild(totalPrice);

        cart.appendChild(totals);
    } else {
        var div = document.createElement("div");
        var emptyMessage = document.createTextNode("Your Cart is Empty");
        div.appendChild(emptyMessage);

        cart.appendChild(div);
    }

}

/*
* Displays the item passed as an argument
*/
function displayItem(row) {

    // Check if the item exists in the local storage and if
    // the item quantity is at least 1
    //if (item && item._qty > 0) {

    // Create a table row
    var cartRow = document.createElement("div");

    // create a table data cell for item name, and add
    // the name to the innerHtml, then append the cell to the row
    var name = document.createElement("span");
    name.innerHTML = row._product._name;
    cartRow.appendChild(name);

    // create a table data cell for item price, and add
    // the price to the innerHtml, then append the cell to the row
    var price = document.createElement("span");
    price.innerHTML = row._product._price;
    cartRow.appendChild(price);

    // create a table data cell for item qty, and add
    // the qty to the innerHtml, then append the cell to the row
    var qty = document.createElement("span");
    qty.innerHTML = row._qty;
    cartRow.appendChild(qty);

    // create a table data cell for item total price, and add
    // the total price to the innerHtml, then append the cell to the row
    var total = document.createElement("span");
    total.innerHTML = parseFloat((row._totalPrice).toFixed(2));
    cartRow.appendChild(total);

    // Add the row to the tableBody
    cart.appendChild(cartRow);
    cart.append(document.createElement("br"));
}

/*
* For Internet Explorer compatibility we use this function to toggle between
* classes.
*/
function toggleClass(element, className) {
    if (element.classList) {
        // Toggles between the bar1 class and the change class
        element.classList.toggle(className);
    } else {
        // For IE9

        // Retrieve the class attribute content and split the
        // words at the space to get an array of class names
        var classes = element.className.split(" ");
        // Retrieve the index of the class we want to toggle
        var i = classes.indexOf(className);

        // Check if that class exists
        if (i >= 0)
            //If so, remove it from the class list
            classes.splice(i, 1);
        else
            // other wise we add it to the class list
            classes.push(className);
        // update the elements class names
        element.className = classes.join(" ");
    }
}

// Add an event listner to the window after the page is loaded
window.addEventListener("load", start, false);