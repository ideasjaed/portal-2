if (document.querySelector('.range-price')) {
    document.querySelectorAll('.range-price').forEach(function (item) {
        item.querySelector('.price-output').textContent = currencyFormat(item.querySelector('.price').value);
        item.querySelector('.price').addEventListener('input', function () {
            item.querySelector('.price-output').textContent = currencyFormat(item.querySelector('.price').value);
        });
    });
}

if (document.querySelector('.years-input')) {
    document.querySelectorAll('.years-input').forEach(function (item) {
        item.querySelector('.plus').addEventListener('click', function () {
            item.querySelector('.years-count').innerHTML = Number( item.querySelector('.years-count').innerHTML ) < 30 ? Number( item.querySelector('.years-count').innerHTML ) + 1 : Number( item.querySelector('.years-count').innerHTML );
        });
        item.querySelector('.minus').addEventListener('click', function () {
            item.querySelector('.years-count').innerHTML = Number( item.querySelector('.years-count').innerHTML ) > 1 ? Number( item.querySelector('.years-count').innerHTML ) - 1 : Number( item.querySelector('.years-count').innerHTML );
        });
    });
}

$(".section-slick-container").slick({
    arrows: false,
    dots: false,
    slidesToShow: 4,
    infinite: false,
    responsive: [
        {
        breakpoint: 1024,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
        },
        },
        {
        breakpoint: 992,
        settings: {
            slidesToShow: 3.5,
            slidesToScroll: 1,
        },
        },
        {
        breakpoint: 768,
        settings: {
            slidesToShow: 1.2,
            slidesToScroll: 1
        },
        },
    ],
});
if (window.matchMedia("(min-width: 768px)").matches) {
    let rows = document.querySelectorAll(".cards-button-item").length>3 ? 2: 1;
    $(".cards-button-slick").slick({
        arrows: false,
        dots: false,
        slidesToShow: 4,
        rows:rows,
        infinite: false,
        responsive: [
            {
            breakpoint: 1025,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots:true
                },
            },
            {
            breakpoint: 992,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                rows:1,
                dots:true
                },
            },
        ],
    });
} else {

    $(".cards-button-slick").slick({
        arrows: false,
        dots: false,
        slidesToShow: 4,
        rows:1,
        infinite: false,
        responsive: [
            {
            breakpoint: 769,
            settings: {
                initialSlide: 1,
                slidesToShow: 1.1,
                slidesToScroll: 1,
                rows:1,
                centerMode: true,
                centerPadding: '40px',
                dots:true
                },
            },
            {
                breakpoint: 361,
                settings: {
                    initialSlide: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '40px',
                    dots:true,
                    rows:1
                },
            },
        ],
    });
}


//Functiones Globales
function currencyFormat (value){
    let val = Number(value);
    return val.toLocaleString('en-US', {style:'currency', currency:'USD'});
  }

function cardsButton(el){
    if (window.matchMedia("(min-width: 768px)").matches) {
        el.querySelector('a').click()
    }
}