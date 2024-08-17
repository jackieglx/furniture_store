import { getElement } from '../utils.js';

const cartOverlay = getElement('.cart-overlay');
const closeCartBtn = getElement('.cart-close');
const toggleCartBtn = getElement('.toggle-cart');

toggleCartBtn.addEventListener('click', (e) => {
    cartOverlay.classList.add('show');
});

closeCartBtn.addEventListener('click', (e) => {
    cartOverlay.classList.remove('show');
});


export const openCart = () => {
    cartOverlay.classList.add('show');
};
