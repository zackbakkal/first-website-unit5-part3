class Row {

    constructor(product) {
        this.product = product;
        this.qty = 1;
        this.totalPrice = this.product.price;
    }

    // getters
    get product() {
        return this._product;
    }

    get qty() {
        return this._qty;
    }

    get totalPrice() {
        return parseFloat((this._totalPrice).toFixed(2));
    }

    /*
    * Returns this row object as an array. Help store data
    * in localStorage and their retrieval.
    */
    get data() {
        return new Array(this.product.name, this.product.price, this.qty, this.totalPrice);
    }

    // setters
    set product(product) {
        this._product = product;
    }

    set qty(qty) {
        this._qty = qty;
    }

    set totalPrice(totalPrice) {
        this._totalPrice = parseFloat((totalPrice).toFixed(2));
    }

    /*
    * Increments the row qty variable by 1
    */
    incrementQty() {
        return this._qty++;
    }

    /*
    * Decrements the row qty variable by 1
    */
    decrementQty() {
        return this._qty--;
    }

    /*
    * Increments the row totalPrice variable by the product's price
    */
    incrementTotalPrice() {
        this.totalPrice += this.product.price;
    }

    /*
    * Decrements the row totalPrice variable by the product's price
    */
    decrementTotalPrice() {
        this.totalPrice -= this.product.price;
    }
}