window.addEventListener('scroll', () => {
    handleScrollAnimation();
})

const scrollElements = document.querySelectorAll(".js-scroll");
/*
scrollElements.forEach((el) => {
    el.style.opacity = 0;
})
*/

const elementInView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return (elementTop <=
        (window.innerHeight || document.documentElement.clientHeight));
};

const displayScrollElement = (element) => {
    element.classList.add("js-scrolled");
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el)) {
            displayScrollElement(el);
        }
    })
};
