document.addEventListener('DOMContentLoaded', () => { 

    //===
    // VARIABLES
    //===
    const DATE_TARGET = new Date('07/30/2022 3:00 PM');
    // DOM for render
    const SPAN_DAYS = document.querySelector('span#days');
    const SPAN_HOURS = document.querySelector('span#hours');
    const SPAN_MINUTES = document.querySelector('span#minutes');
    const SPAN_SECONDS = document.querySelector('span#seconds');
    // Milliseconds for the calculations
    const MILLISECONDS_OF_A_SECOND = 1000;
    const MILLISECONDS_OF_A_MINUTE = MILLISECONDS_OF_A_SECOND * 60;
    const MILLISECONDS_OF_A_HOUR = MILLISECONDS_OF_A_MINUTE * 60;
    const MILLISECONDS_OF_A_DAY = MILLISECONDS_OF_A_HOUR * 24

    //===
    // FUNCTIONS
    //===

    /**
    * Method that updates the countdown and the sample
    */
    function updateCountdown() {
        // Calcs
        const NOW = new Date()
        const DURATION = DATE_TARGET - NOW;
        const REMAINING_DAYS = Math.floor(DURATION / MILLISECONDS_OF_A_DAY);
        const REMAINING_HOURS = Math.floor((DURATION % MILLISECONDS_OF_A_DAY) / MILLISECONDS_OF_A_HOUR);
        const REMAINING_MINUTES = Math.floor((DURATION % MILLISECONDS_OF_A_HOUR) / MILLISECONDS_OF_A_MINUTE);
        const REMAINING_SECONDS = Math.floor((DURATION % MILLISECONDS_OF_A_MINUTE) / MILLISECONDS_OF_A_SECOND);
        // Thanks Pablo Monteserín (https://pablomonteserin.com/cuenta-regresiva/)

        // Render
        SPAN_DAYS.textContent = REMAINING_DAYS;
        SPAN_HOURS.textContent = REMAINING_HOURS;
        SPAN_MINUTES.textContent = REMAINING_MINUTES;
        SPAN_SECONDS.textContent = REMAINING_SECONDS;
    }

    //===
    // INIT
    //===
    updateCountdown();
    // Refresh every second
    setInterval(updateCountdown, MILLISECONDS_OF_A_SECOND);

    /*VARIABLES*/
    const btnClose = document.querySelector('#btn-close');
    const btnBack = document.querySelector('#btn-back');
    const btnNext = document.querySelector('#btn-next');
    const images = document.querySelectorAll('#galery img');
    const lightbox = document.querySelector('#main-container-galery');
    const activeImage = document.querySelector('#active-image');
    let imageIndex = 0;

    /*Abrimos el Lightbox */
    const openLightbox = (event) => {
        activeImage.src = event.target.src;
        lightbox.style.display = 'flex';
        imageIndex = Array.from(images).indexOf(event.target);
    };

    images.forEach((image) => {
        image.addEventListener('click', openLightbox);
    });

    /*Cerramos el Ligthbox*/
    btnClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
    })

    /*Imagen siguiente*/

    const nextImage = () => {
        if (imageIndex === images.length -1) {
            imageIndex = -1;
        }
        activeImage.src = images[imageIndex + 1].src;
        imageIndex++;
    };

    btnNext.addEventListener('click', nextImage);

    /*Imagen anterior*/

    const backImage = () => {
        if (imageIndex === 0){
            imageIndex = images.length;
        }
        activeImage.src = images[imageIndex - 1].src;
        imageIndex--;
    };

    btnBack.addEventListener('click', backImage);
});