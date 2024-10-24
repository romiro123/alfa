import { generatePaginationList } from './generatePaginationList'

const createPagination = (pagination, sortName) => {
    let paginationWrapper = document.getElementById('pagination')

    let currentPage = pagination.current_page;  //на какой странице мы находимся
    let totalPages = pagination.total_pages; //кол-во доступных страниц
    let perPage = pagination.per_page; //сколько элементов возвращается на одну страницу

    function render() {
        let next = currentPage + 1;
        let prev = currentPage - 1;
        let limit = perPage + 10;

        let buttonShow = document.createElement('a');
        buttonShow.classList.add('pagination__show', 'btn', 'btn--show', 'btn-reset')
        buttonShow.textContent = 'Показать еще';
        buttonShow.addEventListener('click', () => {
            buttonShow.href = '?page=' + next + '&limit=' + limit + '&sortName=' + sortName;
            pageMove(next, limit)
        }
        );

        let paginationList = document.createElement('ul');
        paginationList.classList.add('pagination__list', 'list-reset');

        let arr = generatePaginationList(currentPage, totalPages)

        arr.forEach(function (i) {
            let paginationItem = document.createElement('li');
            paginationItem.classList.add('pagination__item');

            if (i === '...') {
                let dots = document.createElement('span');
                dots.textContent = '...';
                paginationItem.append(dots);
            } else {
                let paginationLink = document.createElement('a');
                if (currentPage === i) {
                    paginationLink.classList.add('pagination__link', 'link', 'link--pagination', 'link--pagination-active');
                }
                paginationLink.classList.add('pagination__link', 'link', 'link--pagination');
                paginationLink.textContent = i;
                paginationLink.href = '?page=' + i + '&sortName=' + sortName;;
                paginationItem.append(paginationLink);
            }
            paginationList.append(paginationItem);
        });

        let paginationNav = document.createElement('div');
        paginationNav.classList.add('pagination__nav');

        let buttonPrev = document.createElement('a');
        buttonPrev.classList.add('pagination__btn', 'btn', 'btn--nav', 'btn-reset');
        buttonPrev.textContent = '<<';
        buttonPrev.href = '?page=' + prev + '&sortName=' + sortName;

        if (currentPage === 1) {
            buttonPrev.classList.add('disabled');
        };

        buttonPrev.addEventListener('click', () => {
            pageMove(prev)
        });

        let buttonNext = document.createElement('a');
        buttonNext.classList.add('pagination__btn', 'btn', 'btn--nav', 'btn-reset');
        buttonNext.textContent = '>>';

        buttonNext.addEventListener('click', () => {
            pageMove(next)
            buttonNext.href = '?page=' + next + '&sortName=' + sortName;
        });


        paginationNav.append(buttonPrev, paginationList, buttonNext);
        paginationWrapper.append(buttonShow, paginationNav)

        function pageMove(i, c) {
            currentPage = i;
            currentLimit = c;
            buttonShow.remove();
            paginationNav.remove();
            paginationList.remove();
            buttonPrev.remove();
            buttonNext.remove();
            render();
        }
    }
    render()
}
export { createPagination, }