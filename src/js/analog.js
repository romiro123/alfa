import { formatPrice } from './formatPrice';
const analog = (data) => {
    let analogItem = document.createElement('li');
    analogItem.classList.add('analog__item');

    let analogLink = document.createElement('a');
    analogLink.classList.add('analog__link', 'link', 'link--analog');
    analogLink.textContent = data.name;
    analogLink.setAttribute('href', "#");

    let analogDelivery = document.createElement('span');
    analogDelivery.classList.add('analog__delivery');

    if (data.delivery === '0') {
        analogDelivery.textContent = 'Сегодня';
    }
    else if (data.delivery !== null) {
        analogDelivery.textContent = `${data.delivery} дней`;
    }

    let analogCount = document.createElement('span');
    analogCount.classList.add('analog__count');

    if (data.stock === '0') {
        analogCount.textContent = 'Нет в наличии';
    }
    else {
        analogCount.textContent = `${data.stock} шт`;
    }

    let analogPrice = document.createElement('span');
    analogPrice.classList.add('analog__price');
    analogPrice.textContent = `${formatPrice(data.price)} ₽`;


    let analogBasketWrapper = document.createElement('div');
    analogBasketWrapper.classList.add('analog__basket-wrap');

    let analogQuantity = document.createElement('span');
    analogQuantity.classList.add('analog__quantity');
    analogQuantity.textContent = '1';

    let analogBasket = document.createElement('span');
    analogBasket.classList.add('analog__basket');

    analogItem.append(analogLink, analogDelivery, analogCount, analogPrice, analogBasketWrapper);
    analogBasketWrapper.append(analogQuantity, analogBasket);
    return analogItem;
}

export { analog }