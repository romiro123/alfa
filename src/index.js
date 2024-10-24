import './css/styles.scss'; // Импорт SCSS файла

import { getData, getBrend, sendRequest } from './js/requests';
import { createProductsItem } from './js/createProductsItem';
import { createPagination } from './js/createPagination';
import { createfilter } from './js/createFilter'
import { createSelect, selectChoose } from './js/select'


let paramsString = document.location.search;
let searchParams = new URLSearchParams(paramsString);
let urlPageId = searchParams.get("page");
let limit = searchParams.get("limit");
let sortName = searchParams.get("sortName") ?? 'price';

// Массив для хранения выбранных значений чекбоксов
let arrFilter = [];

let data = await getData(urlPageId, limit, arrFilter);
let brend = await getBrend();

createProductsItem(data.items, sortName)
createPagination(data.meta, sortName)

createfilter(brend)

createSelect()
//select
let selectItem = document.querySelectorAll('.select__item');
selectItem.forEach(item => {
    if (item.dataset.value === sortName) {
        selectChoose(item)
    }
    item.addEventListener('click', (el) => {
        selectChoose(item)
        let paramsString = document.location.search;
        let searchParams = new URLSearchParams(paramsString);
        searchParams.set("sortName", el.target.dataset.value);
        window.location.search = searchParams;
    })
});

//search brand
let filterInput = document.querySelector('.filter__search');
filterInput.addEventListener('input', function () {
    let searchText = filterInput.value;
    let timeout;
    if (timeout) {
        clearTimeout(timeout);
    }

    timeout = setTimeout(async () => {
        let listData = await getBrend(searchText);
        if (listData.length == 0) {
            createfilter(listData);
        }
        else {
            createfilter(listData);
        }
    }, 300);

});


// Обработчик привязки клика к чекбоксам
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('click', handleCheckboxClick);
});


// Функция-обработчик клика по чекбоксу
async function handleCheckboxClick(event) {
    console.log('dsfds')
    const positionY = event.clientY;
    const wrapper = document.querySelector('.filter__list');
    const checkbox = event.target;
    const value = checkbox.value;

    if (checkbox.checked) {
        // Если чекбокс выбран, добавляем значение в массив
        arrFilter.push(value);
        console.log(arrFilter)
    } else {
        // Если чекбокс снят, удаляем значение из массива
        arrFilter = arrFilter.filter(item => item !== value);
        console.log(arrFilter)
    }
    // Отправляем запрос с обновленными данными
    let filterCount = await sendRequest(arrFilter);
    let count = filterCount.length;

    createCount(wrapper, count, positionY, arrFilter);
}

function createCount(el, i, y, arr) {
    let popup = document.querySelector('.filter__info');
    if (popup) {
        popup.remove()
    }

    let countWrapper = document.createElement('div');
    countWrapper.classList.add('filter__info')
    countWrapper.style.top = `${y - 100 - 35}px `;

    let count = document.createElement('span');
    count.classList.add('filter__count');
    count.textContent = i;

    let countDesc = document.createElement('span');
    countDesc.classList.add('filter__count-desc');
    countDesc.textContent = 'товаров показать';

    countWrapper.append(count, countDesc);
    el.append(countWrapper);

    countWrapper.addEventListener('click', async () => {
        countWrapper.remove();
        createChips(arr)
        let data = await getData(urlPageId, limit, arr);
        createProductsItem(data.items, sortName);
    });

}

function createChips(arr) {
    let chipsParent = document.querySelector('.products__chips');

    if (chipsParent.children.length > 0) {
        chipsParent.removeChild(chipsParent.children[0]);
    }


    let chipsBtn = document.createElement('button');
    chipsBtn.classList.add('chips', 'btn-reset');
    if (arr.length == 1) {
        chipsBtn.textContent = 'Бренд: NAME';
    } else {
        chipsBtn.textContent = `Бренды: ${arr.length} знач`;
    }
    chipsParent.append(chipsBtn);

    chipsBtn.addEventListener('click', () => {
        chipsBtn.remove()
        location.reload()
    });
}

