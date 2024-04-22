window.onload = function() {
    const elementsToFadeIn = document.querySelectorAll('.to-fade-in');
    elementsToFadeIn.forEach((el) => {
        el.classList.add('fade-in');
    })
}

