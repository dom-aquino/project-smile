window.addEventListener('scroll', () => {
    handleScrollAnimation();
})

const scrollElements = document.querySelectorAll(".js-scroll");

const elementInView = (el, percentageScrolled = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) 
        * (percentageScrolled / 100));
};

const displayScrollElement = (element) => {
    element.classList.add("js-scrolled");
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 80)) {
            displayScrollElement(el);
        }
    })
};
