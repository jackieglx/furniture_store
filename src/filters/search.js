import {getElement} from '../utils.js';
import display from '../displayProducts.js';

const setupSearch = (store) => {
    const form = getElement('.input-form');
    const nameInput = getElement('.search-input');
    form.addEventListener('keyup', (e) => {
        const value = nameInput.value;
        if (value) {
            const newStore = store.filter((item) => {
                let {name} = item;
                name = name.toLowerCase();
                if (name.startsWith(value)) {
                    return item;
                }
            });
            display(newStore, getElement('.products-container'), true);
            if (newStore.length === 0) {
                const products = getElement('.products-container');
                products.innerHTML = `<h3 class="filter-error">
                                        Sorry, no products match your search.
                                        </h3>`;
            }
        } else {
            display(store, getElement('.products-container'), true);
        }
    })
};

export default setupSearch;
