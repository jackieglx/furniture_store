import {getElement} from '../utils.js';
import display from '../displayProducts.js';


const setupCompanies = (data) => {
    let companies = ['all', ...new Set(data.map((item) => item.company))];
    console.log(companies);
    const companiesDOM = getElement('.companies');
    companiesDOM.innerHTML = companies.map((item) => {
        return ` <button class="company-btn">${item}</button>`;
    }).join('');

    companiesDOM.addEventListener('click', (e) => {
        const element = e.target;
        if (element.classList.contains('company-btn')) {
            let newData = [];
            if (element.textContent === 'all') {
                newData = [...data];
            } else {
                newData = data.filter((item) => {
                   return item.company === e.target.textContent;
                })
            }
            display(newData, getElement('.products-container'), true);
        }
    })
};

export default setupCompanies;
