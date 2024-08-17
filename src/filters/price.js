import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupPrice = (data) => {
    const priceInput = getElement('.price-filter');
    const priceValue = getElement('.price-value');

    // setup filter
    let maxPrice = data.map((item)=> item.price);
    maxPrice = Math.max(...maxPrice);
    console.log(maxPrice);
    maxPrice = Math.ceil(maxPrice/100);
    priceInput.value = maxPrice;
    priceInput.max = maxPrice;
    priceInput.min = 0;
    priceValue.textContent = `Value: $${maxPrice}`;

    priceInput.addEventListener('input', function () {
        const value = parseInt(priceInput.value);
        priceValue.textContent = `Value: $${value}`;
        let newData = data.filter(item=>item.price/100 <= value);
        if (newData.length === 0) {
            const products = getElement('.products-container');
            products.innerHTML = `<h3 class="filter-error">
                                        Sorry, no products match your search.
                                        </h3>`;
        } else {
            display(newData, getElement('.products-container'), true);
        }


    })
};

export default setupPrice;
