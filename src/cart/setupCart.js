// import
import {
    getStorageItem,
    setStorageItem,
    formatPrice,
    getElement,
} from '../utils.js';
import {openCart} from './toggleCart.js';
import {findProduct} from '../store.js';
import addToCartDOM from './addToCartDOM.js';
// set items

const cartItemCountDOM = getElement('.cart-item-count');
const cartItemsDOM = getElement('.cart-items');
const cartTotalDOM = getElement('.cart-total');

let cart = getStorageItem('cart');

export const addToCart = (id) => {
    // console.log(id);
    let item = cart.find(item => item.id === id);
    if (!item) {
        let product = findProduct(id); // product是{}
        // console.log(product);
        product = {...product, amount: 1};
        cart = [...cart, product];
        addToCartDOM(product);

    } else {
        // update values
        const amount = increaseAmount(id);
        const items = [...cartItemsDOM.querySelectorAll('.cart-item-amount')];
        const newAmountDOM = items.find(value => value.dataset.id === id);
        newAmountDOM.textContent = amount;

    }
    displayCartItemCount();

    // display cart totals
    displayCartTotal();

    setStorageItem('cart', cart);
    openCart();
};

function displayCartItemCount() {
    const amount = cart.reduce((total, item) => {
        return total += item.amount;
    }, 0);

    cartItemCountDOM.textContent = amount;
    console.log('amount = ');
    console.log(amount);
}

function displayCartTotal() {
    const totalPrice = cart.reduce((total, item) => {
        return total += item.amount * item.price;
    }, 0);

    cartTotalDOM.textContent = `Total: ${formatPrice(totalPrice)}`;
    console.log('totalPrice = ');
    console.log(totalPrice);

}


function displayCartItemsDOM() {
    cart.forEach(item => {
        addToCartDOM(item);
    })
}

function increaseAmount(id) {
    let newAmount;
    cart = cart.map((item) => {
        if (item.id === id) {
            newAmount = item.amount + 1
            item = {...item, amount: newAmount};
        }
        return item;
    });
    return newAmount;
}

function decreaseAmount(id) {
    let newAmount;
    cart = cart.map((item) => {
        if (item.id === id) {
            newAmount = item.amount - 1
            item = {...item, amount: newAmount};
        }
        return item;
    });
    return newAmount;
}

function removeItem(id){
    cart = cart.filter(item => item.id !== id);
}

function setupCartFunctionality() {
    cartItemsDOM.addEventListener('click', function(e) {
        console.log("e.target = ")
        console.log(e.target);
        const element = e.target;
        const parent = e.target.parentElement;
        const id = e.target.dataset.id;
        const parentID = e.target.parentElement.dataset.id;

        // remove
        if (element.classList.contains('cart-item-remove-btn')) {
            removeItem(id);
            parent.parentElement.remove();
        }

        // increase
        if (parent.classList.contains('cart-item-increase-btn')){
            const newAmount = increaseAmount(parentID);
            parent.nextElementSibling.textContent = newAmount;
        }

        // decrease
        if (parent.classList.contains('cart-item-decrease-btn')){
            const newAmount = decreaseAmount(parentID);
            if (newAmount === 0){
                removeItem(parentID);
                parent.parentElement.parentElement.remove();
            } else {
                parent.previousElementSibling.textContent = newAmount;
            }

        }


            displayCartItemCount();
        displayCartTotal();
        setStorageItem('cart', cart);
    });
}

const init = () => {
    console.log("cart = ")
    console.log(cart);
    displayCartItemCount();
    displayCartTotal();
    displayCartItemsDOM();
    setupCartFunctionality();
};

init();
