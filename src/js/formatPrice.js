const formatPrice = (price) => {
    const roundedPrice = Math.ceil(price);
    let formatPrice = roundedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return formatPrice;
}
export { formatPrice }