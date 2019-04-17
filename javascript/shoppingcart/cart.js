/**
 * File Name: cart.js
 * Author: Zakaria Bakkal
 * Version: 2
 * Date: April 08, 2019
 * Description: This class is used to represent a shopping cart.
 */

class Cart {

    constructor() {
        this.rows = new Array();
        this.totalQty = 0;
        this.totalPrice = 0;
    }

    // getters
    get rows() {
        return this._rows;
    }

    get totalPrice() {
        return parseFloat((this._totalPrice).toFixed(2));
    }

    get totalQty() {
        return this._totalQty;
    }

    /*
    * Returns this cart object as an array. Help store data
    * in localStorage and their retrieval.
    */
    get data() {
        return new Array(this.rows, this.totalQty, parseFloat((this.totalPrice).toFixed(2)));
    }

    // setters
    set rows(rows) {
        this._rows = rows;
    }

    set totalQty(totalQty) {
        this._totalQty = totalQty;
    }

    set totalPrice(totalPrice) {
        this._totalPrice = parseFloat((totalPrice).toFixed(2));
    }

    /*
    * Loads data from the argument storage to the cart.
    * storage: represents localStorage. It is an array with
    * 3 elements:
    *    -storage[0]: Represents an array of row objects
    *    -storage[1]: Represents the quantity of product objects in the cart
    *    -storage[2]: Represents the total price of the cart
    */
    loadCart(storage) {
        console.log(storage);
        if (storage != null) {
            this.rows = storage[0];
            this.totalQty = storage[1];
            this.totalPrice = parseFloat((storage[2]).toFixed(2));
        }
    }

    /*
    * Adds a product to the cart. If a product is new to the cart a new row
    * is added, otherwise the quantity of the existing product is incremented.
    */
    addProduct(product) {

        console.log("adding: ", product.name);
        // Check a cart does not exists in localStorage, or
        // a cart exists but no products in it or,
        // a cart exists and the product is not in the cart
        if (localStorage.getItem("mycart") == null
            || this.totalQty == 0
            || this.findProduct(product) == -1) {
            // add the new product to the cart
            this.rows.push(new Row(product));
        } else {
            // look for the product in the cart,
            // so that if it exists we increment
            // the quantity, otherwise we add it
            // to the cart.
            var index = this.findProduct(product);
            var foundRow = this.rows[index];

            //Check if the row is found then we increment the quantity
            if (foundRow) { // if the product is found
                // increment the product quantity by 1
                foundRow._qty++;
                // increment the total price of the row 
                // by product price
                foundRow._totalPrice += foundRow._product._price;
            }
        }

        // update the total price by adding the product price
        this.updateTotalPrice(product.price);
        // increment the total quantity by 1
        this.incrementTotalQty();

        this.updateLocalStorage();
    }

    /*
    * Decrements the quantity of a product in the cart by 1.
    */
    minusProduct(rowNumber) {

        // decrement row's quantity
        this.rows[rowNumber]._qty -= 1;

        console.log(1);
        // decrement rows's total price
        this.rows[rowNumber]._totalPrice -= this.rows[rowNumber]._product._price;
        // decrement cart's total quantity
        this.decrementTotalQty();
        // decrement cart's total price
        this.updateTotalPrice(-parseFloat((this.rows[rowNumber]._product._price).toFixed(2)));

        if (this.rows[rowNumber]._qty == 0) {
            console.log(2);
            removeRow(rowNumber);
        }

        this.updateLocalStorage();

    }

    /*
    * Decrements the quantity of a product in the cart by 1.
    */
    plusProduct(rowNumber) {
        console.log(3);
        // increment row's quantity
        this.rows[rowNumber]._qty += 1;
        // increment rows's total price
        this.rows[rowNumber]._totalPrice += this.rows[rowNumber]._product._price;
        // increment cart's total quantity
        this.incrementTotalQty();
        // increment cart's total price
        console.log(this.rows[rowNumber]._product._price);
        this.updateTotalPrice(parseFloat((this.rows[rowNumber]._product._price).toFixed(2)));

        this.updateLocalStorage();
    }

    findProduct(product) {
        var index = -1;

        // Check if the cart is not empty
        if (this._rows.length > 0) {
            // iterate over the rows of the cart
            // and return the index of the product in
            // the array rows.
            for (var i = 0; i < this._rows.length; i++) {
                if (this._rows[i]._product._name == product.name) {
                    return i;
                }
            }
        }

        // At this point no match is found (index = -1)
        return index;
    }

    /*
    * Removes a row from rows variable.
    */
    removeRow(rowNumber) {
        // Subtruct the total quantity of the row from the total quantity of the cart
        this.totalQty -= myCart.rows[rowNumber]._qty;
        // Subtruct the total price of the row from the total price of the cart
        this.totalPrice -= parseFloat((myCart.rows[rowNumber]._totalPrice).toFixed(2));
        // remove the row at index rowNumber
        this.rows.splice(rowNumber, 1);

        this.updateLocalStorage();
    }

    updateTotalPrice(value) {
        this.totalPrice += parseFloat((value).toFixed(2));
    }

    updateTotalQty(value) {
        this.totalQty += value;
    }

    incrementTotalQty() {
        parseFloat((this.totalQty++).toFixed(2));
    }

    decrementTotalQty() {
        parseFloat((this.totalQty--).toFixed(2));
    }

    /*
    * Clears the cart completely. and clears the local storage.
    */
    clear() {
        this._rows = new Array()
        this.totalQty = 0;
        this._totalPrice = parseFloat((0).toFixed(2));

        localStorage.clear();
    }

    updateLocalStorage() {
        console.log(JSON.stringify(this.data));
        localStorage.setItem("mycart", JSON.stringify(this.data));
        localStorage.setItem("carttotalqty", this.totalQty);
    }
}