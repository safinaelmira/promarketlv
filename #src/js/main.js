if (screen.width > 991) {
    let comSwiperFirst = new Swiper('.commodity-1 .swiper-container', {
        loop: true,
        spaceBetween: 24,
        pagination: {
            el: '.commodity-pagination-1',
            clickable: true,
        },
        slidesPerView: 4,
    })
    let comSwiperSecond = new Swiper('.commodity-2 .swiper-container', {
        loop: true,
        spaceBetween: 24,
        pagination: {
            el: '.commodity-pagination-2',
            clickable: true,
        },
        slidesPerView: 4,
    })
    comSwiperSecond.on('slideChange', function () {
        cardDrop.closeDrop();
    });
    comSwiperFirst.on('slideChange', function () {
        cardDrop.closeDrop();
    });
}
if (screen.width < 991) {
    let dropDown = document.querySelector('.language-selection-drop-down');
    let headerNavigationWrapper = document.querySelector('.header_navigation_wrapper');
    let newLi = document.createElement('li')
    newLi.classList.add('language-wrapper');
    newLi.append(dropDown)
    headerNavigationWrapper.prepend(newLi);
    let menuBurger = new Burger(
        '.search_form_submit',
        '.header_form_search'
    )
    let closeFormSearch = document.querySelector('.close_form_search');
    closeFormSearch.addEventListener('click', menuBurger.closeBurger)
    /*let commodityCardPrice = document.querySelectorAll('.commodity-card-price');
    Array.from(commodityCardPrice).forEach(card => {
      let parent = card.closest('.commodity-default-card');
      parent.querySelector('.commodity-card-parameter').prepend(card);
    })*/
    let shopDropDownLis = document.querySelectorAll('shop__drop__down-tabs-side-container ul > li')
    Array.from(shopDropDownLis).forEach(el => {
        el.classList.remove('active');
    })
}

function DropDown(parent, trigger, changers) {
    try {
        this.parent = document.getElementsByClassName(parent)[0]
        this.trigger = this.parent.getElementsByClassName(trigger)[0]
        this.changers = this.parent.getElementsByClassName(changers)

        let self = this
        Array.from(this.changers).forEach(changer => {
            changer.addEventListener('click', changeTheTabValue)
        })

        function changeTheTabValue() {
            let text = this.innerText
            self.trigger.getElementsByClassName('changing')[0].innerText = text
            self.trigger.nextElementSibling.classList.remove('active')
        }

        this.trigger.addEventListener('click', toggleActive)

        function toggleActive(e) {
            this.nextElementSibling.classList.toggle('active')
        }

        document.addEventListener('click', closeTabs)

        function closeTabs(e) {
            try {
                if (e.target.parentNode.classList.contains('select-drop-down') || (e.target.parentNode.classList.contains(parent))) {
                    return false
                } else if (e.target.parentNode.classList.contains(trigger)) {
                    return false
                }
                self.trigger.nextElementSibling.classList.remove('active')
            } catch (e) {
                void e
            }
        }
    } catch (e) {
        void e
    }
}

function Burger(burger, menu, parentElement = {}) {
    try {
        this.burger = document.querySelector(burger)
        this.menu = document.querySelector(menu)

        let self = this
        this.attribute = `data-burger${Math.random()}`;
        this.burger.setAttribute('data-burger', this.attribute)
        this.menu.setAttribute('data-burger', this.attribute)
        Array.from(this.burger.querySelectorAll('*')).forEach(el => {
            el.setAttribute('data-burger', this.attribute)
        })
        Array.from(this.menu.querySelectorAll('*')).forEach(el => {
            el.setAttribute('data-burger', this.attribute)
        })

        this.burger.addEventListener('click', activateBurger);

        function activateBurger(e) {
            document.body.classList.add('overflow-js')
            self.menu.classList.toggle('active')
            this.classList.toggle('open')
            window.addEventListener('scroll', noScroll)
        }

        document.addEventListener('click', closeBurger)

        function closeBurger(e) {
            if (
                e.target.getAttribute('data-burger') === self.attribute ||
                e.target.getAttribute('data-burger') === parentElement.attribute
            ) {
                if (parentElement.burger) {
                    parentElement.burger.classList.add('open');
                    parentElement.menu.classList.add('active');
                }
            } else {
                self.burger.classList.remove('open');
                self.menu.classList.remove('active');
                if (e.target.hasAttribute('data-burger')) {

                } else {
                    document.body.classList.remove('overflow-js');
                }
            }
        }

        this.closeBurger = function () {
            self.burger.classList.remove('open');
            self.menu.classList.remove('active');
            document.body.classList.remove('overflow-js');
        }

        function noScroll(e) {
            // console.log(e)
        }
    } catch (e) {
        console.log(e)
    }
}

let headerLangDropDownParent = 'language-selection-drop-down';
let headerLangDropTrigger = 'language-selected-text';
let changers = 'language-selected-text-inner';
let headerLangDropDown = new DropDown(
    headerLangDropDownParent,
    headerLangDropTrigger,
    changers
)
let menuBurger = new Burger(
    '.header-burger',
    '.header_navigation',
)
let headerCartDrop = new Burger(
    '.header_cart',
    '.header__cart__inner'
)


let headerShopTabs = new Tabs(
    document.querySelectorAll('.shop__drop__down-tabs-side-container li'),
    document.querySelector('.shop__drop__down-content-side'),
    document.querySelector('.shop__dropping-element'),
    '.shop__drop__down-content-side-header',
    '.header_navigation_wrapper'
)
let brandProductActiveCommodityWrapper = document
    .querySelector('.fixing-type-for-device-row');

function makeCommodityActive(commodityWrapper) {
    try {
        this.commodity = commodityWrapper.children

    } catch (e) {
        console.log(e)
    }
    try {
        Array.from(this.commodity).forEach(el => {
            el.addEventListener('click', toggleActiveClass)
        })
    } catch (e) {
        console.log(e)
    }


    function toggleActiveClass(e) {
        e.preventDefault();
        if (this.classList.contains('active')) {
            removeActiveClass(this)
            return false
        }
        addActiveClass(this)
    }

    function addActiveClass(el) {
        el.classList.add('active');
    }

    function removeActiveClass(el) {
        el.classList.remove('active')
    }
}

new makeCommodityActive(brandProductActiveCommodityWrapper);

function Tabs(tabTrigger, tabContentWrapper, parentElement, closeButtonSelectorName,
              overflowingElement) {
    try {
        this.tab = tabTrigger
        this.tabContent = tabContentWrapper
        this.parent = parentElement
        this.overflowingElement = document.querySelector(overflowingElement)
        this.closeButtons = [];
        Array.from(this.tabContent.children).forEach(child => {
            this.closeButtons.push(child.querySelector(closeButtonSelectorName))
        })
        let self = this;

        Array.from(this.tab).forEach(tab => {
            tab.addEventListener('mouseover', changeTheTab)
        })

        this.closeButtons.forEach(el => {
            el.addEventListener('click', closeTabs);
        })


        function closeTabs() {
            Array.from(self.tabContent.children).forEach(tab => {
                tab.classList.remove('active')
            })
            Array.from(self.tab).forEach(tab => {
                tab.classList.remove('active')
            })
            self.tabContent.classList.remove('active')
            self.parent.classList.remove('active')
            self.overflowingElement.classList.remove('overflow-hidden')


        }

        function changeTheTab(e) {
            e.preventDefault()
            let index = Array.from(this.parentNode.children).indexOf(this)
            closeTabs()
            self.parent.classList.add('active')
            self.tabContent.children[index].classList.add('active')
            this.classList.add('active')
            console.log(self.tabContent)
            self.tabContent.classList.add('active')
            if (screen.width < 991) {
                self.overflowingElement.classList.add('overflow-hidden')
            }
        }

        this.closeAllTabs = closeTabs;
    } catch (e) {
        console.log(e)
    }
}

function Collapser(collapsTriggerClassName, collapsingClass, parentClassName) {
    this.parentClassName = parentClassName
    this.collapsers = document.getElementsByClassName(collapsTriggerClassName);
    this.collapsingClass = collapsingClass
    let self = this

    Array.from(this.collapsers).forEach(collpaser => {
        collpaser.addEventListener('click', toggleCollapse)
    })

    function toggleCollapse(e) {
        let parent = this.closest(self.parentClassName);
        console.log(parent)
        let openingElement = parent.getElementsByClassName(self.collapsingClass)
        parent.classList.toggle('active')
        Array.from(openingElement).forEach(el => {
            if (el.style.maxHeight) {
                el.style.maxHeight = ''
            } else {
                el.style.maxHeight = el.scrollHeight + 'px'
            }
        })


    }
}

new Collapser('header__collapse', 'shop-dropdown-wrapper', '.header__shop__link');


function CardDropDown(className) {
    this.trigger = document.getElementsByClassName(className);

    this.parentClassList = 'quantity-drop';

    this.dropDownWrapper = document
        .getElementsByClassName('quantity-drop-down-wrapper')[0];

    let self = this;

    Array.from(this.trigger).forEach(trig => {
        trig.addEventListener('click', openCard)
        
    })

    function fillTheMenu() {

    }

    function changeInputValue(){
        console.log(this.innerText)
    }

    function openCard() {
        let parent = this.closest('.quantity-view-wrapper');
        let input = parent.querySelector('.quantity-input');
        let leftAxis = input.getBoundingClientRect().left;
        let topAxis = input.getBoundingClientRect().top + pageYOffset
            + input.getBoundingClientRect().height + 30;
        self.dropDownWrapper.style.cssText = `
        left: ${leftAxis}px;
        top: ${topAxis}px;
    `;
        self.dropDownWrapper.classList.add('active')
        let lis = self.dropDownWrapper.querySelectorAll('li');
        Array.from(lis).forEach(li => {
            li.addEventListener('click', changeInputValue)
        })
    }
    function closeDrop(e) {
        let path = e.composedPath();
        let isClosing = true;
        Array.from(path).forEach(el => {
            try {
                if (el.classList.contains(self.parentClassList)) {
                    isClosing = false
                }
            } catch (e) {
                console.log(e)
            }
        })
        if (isClosing) {
            self.dropDownWrapper.classList.remove('active')
        }
    }
    document.addEventListener('click', closeDrop)
    this.closeDrop = function () {
        self.dropDownWrapper.classList.remove('active')
    }
}

let cardDrop = new CardDropDown('quantity-trigger-wrapper');
