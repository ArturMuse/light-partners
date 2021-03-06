import '../scss/app.scss';
import './ui/header';


/*==================== ACCORDION ADDITIONALS ====================*/
const accordionHeaders = document.querySelectorAll('.accordion__header');

function toggleAccordions() {
    this.parentNode.classList.toggle('accordion__open');
}

accordionHeaders.forEach(el => {
    el.addEventListener('click', toggleAccordions);
});

const headerSlider = document.querySelector(".header__slider")
if (headerSlider) {
    let swiperHeader = new Swiper(headerSlider, {
        loop: true,
        grabCursor: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
}

/*== HOVER IMAGE SLIDER ==*/
const imgSections = document.querySelectorAll('.product_card__images-section');
function hoverSection() {
    this.parentNode.style.backgroundImage = 'url(' + this.dataset.src + ')';
    let sections = this.parentNode.querySelectorAll('.product_card__images-section');
    sections.forEach(function (section) {
        if (section.classList.contains('product_card__images-section--active')) {
            section.classList.remove('product_card__images-section--active');
        }
    });
    this.classList.add('product_card__images-section--active');
}
imgSections.forEach(el => {
    el.addEventListener('mouseover', hoverSection);
});

/*== CHANGE MAIN IMAGE PRODUCT ==*/
const imgProductLinks = document.querySelectorAll('.card_product__image-link');
const mainImage = document.getElementById('main-image-product');
function setMainImage() {
    mainImage.style.backgroundImage = 'url(' + this.dataset.img + ')';
}
imgProductLinks.forEach(el => {
    el.addEventListener('click', setMainImage);
});


/*==================== MODALS ====================*/
const modalViews = document.querySelectorAll('.js-modal'),
    modalBtns = document.querySelectorAll('.js-modal-btn'),
    modalCloses = document.querySelectorAll('.js-modal-close');

let modal = function (modalClick) {
    const modalTarget = document.getElementById(modalClick);
    if (modalTarget) {
        modalTarget.classList.add('active-modal');
    }
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(modalBtn.dataset.target);
    });
});

modalCloses.forEach((modalClose, i) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach(modalView => {
            modalView.classList.remove('active-modal');
        });
    });
});


/*======== MATCHING PRODUCTS ========*/
//Sticky matching header
const matchingContent = document.getElementById('matching-content');
const matchingHeaders = document.querySelectorAll('.matching__header');
const matchingContentProducts = document.getElementById('matching-products');
const matchingHeaderSticky = document.getElementById('matching-header-sticky');
const matchingHeaderStickyContainer = document.getElementById('matching-header-sticky-container');

if (matchingContent) {
    let swiperMatching = new Swiper(".matching__products", {
        loop: false,
        grabCursor: true,
        spaceBetween: 15,
        slidesPerView: 4,
        navigation: {
            nextEl: '.matching-btn-next',
            prevEl: '.matching-btn-prev',
        },
        breakpoints: {
            // 568: {
            //     slidesPerView: 4
            // }
        }
    });


    let heightMatchingHeader = 0;
    if (matchingHeaders.length) {
        heightMatchingHeader = matchingHeaders[0].clientHeight;
    }

    const sticky = matchingContent.offsetTop + heightMatchingHeader;

    const leftBorderContent = matchingContentProducts.offsetLeft;
    const rightBorderContent = matchingContentProducts.offsetLeft + matchingContentProducts.clientWidth;

    const stickyMatching = () => {
        if (window.pageYOffset >= sticky) {
            matchingHeaderSticky.classList.add('show-matching-sticky');
            matchingHeaderStickyContainer.innerHTML = '';
            matchingHeaders.forEach((header, index) => {
                // header.cloneNode(true).appendTo(matchingHeaderStickyContainer);
                if (index < 5) {
                    matchingHeaderStickyContainer.appendChild(header.cloneNode(true));
                } else if (window.pageYOffset + window.innerHeight === document.body.scrollHeight) {
                    matchingHeaderSticky.classList.remove('show-matching-sticky');
                    matchingHeaders.forEach(header => {
                        matchingHeaderStickyContainer.innerHTML = '';
                    });
                }

            });
        } else {
            matchingHeaderSticky.classList.remove('show-matching-sticky');
            matchingHeaders.forEach(header => {
                matchingHeaderStickyContainer.innerHTML = '';
            });
        }
        console.log(window.pageYOffset + window.innerHeight === document.body.scrollHeight)
    }

    window.onscroll = function () { stickyMatching() };
}
