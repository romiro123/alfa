const generatePaginationList = (currentPage, totalPages) => {
    const pagination = [];

    if (currentPage < 6) {
        // Если текущая страница меньше 6
        for (let i = 1; i <= 7 && i <= totalPages; i++) {
            pagination.push(i);
        }
        if (totalPages > 7) {
            pagination.push('...');
            pagination.push(totalPages);
        }
    } else {
        // Если текущая страница 6 или больше
        pagination.push(1); // первая страница
        pagination.push('...');

        for (let i = currentPage - 3; i <= currentPage + 3 && i <= totalPages; i++) {
            if (i > 1) { // пропускаем первую, она уже добавлена
                pagination.push(i);
            }
        }

        if (currentPage + 3 < totalPages) {
            pagination.push('...');
            pagination.push(totalPages); // последняя страница
        }
    }

    return pagination;
}
export { generatePaginationList }