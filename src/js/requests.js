

const getData = async (page = 1, limit, arr) => {
    let res = await fetch(`https://d763066ccc1e7fe2.mokky.dev/products?page=${page}&limit=${limit}&${arr.map(value => `brand_id[]=${value}`).join('&')}`)
    let data = await res.json();
    return data;
};

const getBrend = async (value = '') => {
    let url = 'https://d763066ccc1e7fe2.mokky.dev/brands?';
    if (value.length) {
        url += `brand_name=*${value}`
    }
    let res = await fetch(url)
    let brands = await res.json();
    return brands;
};

const sendRequest = async (arr) => {
    const url = `https://d763066ccc1e7fe2.mokky.dev/products?${arr.map(value => `brand_id[]=${value}`).join('&')}`;
    let res = await fetch(url)
    let filterData = await res.json();
    return filterData;
}
export { getData, getBrend, sendRequest }