import image from '../img/default.jpg';
import { analog } from './analog';

function sorted(arr, key) {
    const sortArr = arr.sort((a, b) => {
        if (key === '-price') {
            return a[key.slice(1)] < b[key.slice(1)] ? 1 : -1;
        }
        if (key === 'stock') {
            return Number(a[key]) < Number(b[key]) ? 1 : -1;
        }
        else {
            return a[key] > b[key] ? 1 : -1;
        }
    });
    return sortArr
}

const createProductsItem = (data, sortName) => {
    let productsList = document.getElementById('products__list')
    productsList.innerHTML = '';

    for (const item of data) {
        let productsItem = document.createElement('li');
        productsItem.classList.add('products__item');

        let productsImg = document.createElement('img');
        productsImg.classList.add('products__img');
        if (item.img === !null) {
            productsImg.src = item.img;
        }
        productsImg.src = image;
        productsImg.alt = item.brand_name;

        let productsInfo = document.createElement('div');
        productsInfo.classList.add('products__info');

        let productsHeader = document.createElement('div');
        productsHeader.classList.add('products__header');

        let productsTitle = document.createElement('h3');
        productsTitle.classList.add('products__title', 'title', 'title--product');
        productsTitle.textContent = item.brand_name;

        let productsArticul = document.createElement('span');
        productsArticul.classList.add('title', 'title--articul');
        productsArticul.textContent = item.articul;

        let analogList = document.createElement('ul');
        analogList.classList.add('products__analog', 'analog', 'list-reset')

        sorted(item.variants, sortName)

        for (const variant of item.variants) {
            analogList.append(analog(variant));
        }

        productsHeader.append(productsTitle, productsArticul);
        productsItem.append(productsImg, productsInfo);
        productsInfo.append(productsHeader, analogList);
        productsList.append(productsItem);
    }
}

export { createProductsItem, analog }