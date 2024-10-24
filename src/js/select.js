const createSelect = () => {
    const sortSelect = document.getElementById('sort');

    let selectHeader = document.createElement('div');
    selectHeader.classList.add('select__header')

    let selectCurrent = document.createElement('span');
    selectCurrent.classList.add('select__current')
    selectCurrent.textContent = ''

    let selectIcon = document.createElement('div');
    selectIcon.classList.add('select__icon');

    let selectBody = document.createElement('div');
    selectBody.classList.add('select__body');

    let selectPrice = document.createElement('div');
    selectPrice.classList.add('select__item');
    selectPrice.setAttribute('data-value', 'price');
    selectPrice.setAttribute('data-option', '');
    selectPrice.textContent = 'Сначала дешевые'

    let selectPriceMin = document.createElement('div');
    selectPriceMin.classList.add('select__item');
    selectPriceMin.setAttribute('data-value', '-price');
    selectPriceMin.setAttribute('data-option', '');
    selectPriceMin.textContent = 'Сначала дорогие'

    let selectStock = document.createElement('div');
    selectStock.classList.add('select__item');
    selectStock.setAttribute('data-value', 'stock');
    selectStock.setAttribute('data-option', '');
    selectStock.textContent = 'Сначала большее количество'

    let selectDelivery = document.createElement('div');
    selectDelivery.classList.add('select__item');
    selectDelivery.setAttribute('data-value', 'delivery');
    selectDelivery.setAttribute('data-option', '');
    selectDelivery.textContent = 'Быстрая доставка'

    selectHeader.append(selectCurrent, selectIcon);
    selectBody.append(selectPrice, selectPriceMin, selectStock, selectDelivery);
    sortSelect.append(selectHeader, selectBody);

    selectHeader.addEventListener('click', selectToggle)

    function selectToggle() {
        this.parentElement.classList.toggle('is-active');
    }
}

const selectChoose = (item) => {
    let clear = document.querySelectorAll('.select__item');
    clear.forEach(item => {
        item.classList.remove('visually-hidden')
        if (item.closest('[data-option="select"]')) {
            item.dataset.option = ''
        }
    });

    item.dataset.option = 'select';
    item.classList.add('visually-hidden')

    let text = item.innerText,
        select = item.closest('.select'),
        currentText = select.querySelector('.select__current');
    currentText.innerText = text;
    select.classList.remove('is-active');
}

export { createSelect, selectChoose }
























// let select = function () {
//     let selectHeader = document.querySelectorAll('.select__header');
//     let selectItem = document.querySelectorAll('.select__item');

//     selectHeader.forEach(item => {
//         item.addEventListener('click', selectToggle)
//     });

//     selectItem.forEach(item => {
//         item.addEventListener('click', selectChoose)
//     });

//     function selectToggle() {
//         this.parentElement.classList.toggle('is-active');
//     }

//     function selectChoose() {
//         let text = this.innerText,
//             select = this.closest('.select'),
//             currentText = select.querySelector('.select__current');
//         currentText.innerText = text;
//         select.classList.remove('is-active');

//     }

// };


// select();