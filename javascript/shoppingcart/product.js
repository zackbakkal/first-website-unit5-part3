/**
 * File Name: Product.js
 * Class Name: Product
 * Author: Zakaria Bakkal
 * Version: 1
 * Date: April 07, 2019
 * Description: This class represents the items that users are
 *              interested in adding to their carts.
 */

class Product {

    /*
    * Class Constructor used to instantiate objects.
    * 
    * name: product name
    * price: product price
    */
    constructor(name, price) {
        // invokes the setters
        this.name = name;
        this.price = price;
    }

    // getters
    get name() {
        return this._name;
    }

    get price() {
        return parseFloat((this._price).toFixed(2));
    }

    /*
    * Returns this product object as an array. Help store data
    * in localStorage and their retrieval.
    */
    get data() {
        return new Array(this.name, this.price);
    }

    // setters
    set name(name) {
        this._name = name;
    }

    set price(price) {
        this._price = parseFloat((price).toFixed(2));
    }
}