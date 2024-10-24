const createfilter = (data) => {
    let filter = document.getElementById('brends');
    filter.innerHTML = '';
    if (data.length == 0) {
        let brandItem = document.createElement('li');
        brandItem.classList.add('filter__item');
        brandItem.textContent = 'По вашему запросу ничего не найдено.';
        filter.append(brandItem);
    }

    for (const brand of data) {
        if (brand.brand_name && brand.brand_id) {
            let brandItem = document.createElement('li');
            brandItem.classList.add('filter__item');

            let brandLabel = document.createElement('label');
            brandLabel.classList.add('check');

            let input = document.createElement('input');
            input.classList.add('visually-hidden', 'check__input');
            input.type = 'checkbox';
            input.name = 'brand';
            input.value = brand.brand_id;
            input.dataset.name = brand.brand_name;

            let checkbox = document.createElement('span');
            checkbox.classList.add('check__checkbox');

            let brandName = document.createElement('span');
            brandName.classList.add('check__name');
            brandName.textContent = brand.brand_name;

            brandLabel.append(input, checkbox, brandName);
            brandItem.append(brandLabel);
            filter.append(brandItem);
        }
    }
}

export { createfilter }