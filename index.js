// global imports
import './src/toggleSidebar.js';
import './src/cart/toggleCart.js';
import './src/cart/setupCart.js';

// specific imports
import fetchProducts from './src/fetchProducts.js';


import {getElement} from './src/utils.js';
import {setupStore, store} from "./src/store.js";
import display from "./src/displayProducts.js";

const init = async () => {
    // data是一个array，[{}, {},...]
    const data = await fetchProducts();
    // console.log(data);
    if (data) {
        setupStore(data);
        // console.log(store);
        // featuredItems 是一个array，[{}, {},...]
        const featuredItems = store.filter((product) => product.featured === true);
        // console.log(featuredItems);
        display(featuredItems, getElement('.featured-center'));
    }
}
window.addEventListener('DOMContentLoaded', init)
