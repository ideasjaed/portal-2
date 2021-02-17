(function () {
  $(".tagCarousel").slick({
    arrows: true,
    dots: false,
    slidesToShow: 7,
    slidesToScroll: 4,
    rows: 1,
    infinite: false,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 1.5,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: '120px',
        },
      },
    ],
  });

  var seleccionar;
  var isTouchDevice = 'ontouchstart' in document.documentElement;
    
  $(".tags").mousedown(function(e) {
      if (isTouchDevice == false) {   
          seleccionar = e.screenX; 
      }
  });
  $(".tags").mouseup(function(e) {
      if (isTouchDevice == false) {   
          if(seleccionar == e.screenX ){
            $( this ).toggleClass( "active" );
          } 
      }
  });
  $('.tags').on('touchstart', function(e){
      if (isTouchDevice)  {   
          seleccionar = e.screenX; 
      }
  });
  $('.tags').on('touchend', function(e){
      if (isTouchDevice)  {   
          if(seleccionar == e.screenX ){
            $( this ).toggleClass( "active" );
          } 
      }
  });

  if( document.querySelector('.tagCarousel .slick-prev.slick-arrow') ){
    document.querySelector('.tagCarousel .slick-prev.slick-arrow').addEventListener("click", function() {
      setTimeout(function() {
        $(".tagCarousel").slick('slickGoTo', 0);
      }, 500);
    });
  }

  $(".blog-section").slick({
    arrows: false,
    dots: false,
    slidesToShow: 2.2,
    rows: 1,
    infinite: false,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        },
      },
    ],
  });

  $(".menu-mobile-right").slick({
    arrows: false,
    dots: false,
    slidesToShow: 7,
    rows: 1,
    infinite: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4.5,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1
        },
      },
    ],
  });

  getActive();
  verifyURL();
})(); // Page Ready


function getActive(){
  var locate = location.protocol + '//' + location.host + location.pathname;
  if(locate.includes('biblioteca-interactiva')){
    let url = locate.split('/')[locate.split('/').length-1].slice(0,-5);
    url = url=='index'?'blog':url==''?'blog':url;
    let menu = Array.from(document.querySelector('.menu-desktop-right').children);
    menu.shift();
    menu.pop();
    for(i = 0; i< menu.length ; i++){
      if(quitarAcentos(menu[i].children[0].innerHTML.toLowerCase()).includes(url.toLowerCase())){
        menu[i].children[0].classList.add('active')
      }
    }
  }
}

function quitarAcentos(cadena) {
  var acentos = {
    'á': 'a',
    'é': 'e',
    'í': 'i',
    'ó': 'o',
    'ú': 'u',
    'Á': 'A',
    'É': 'E',
    'Í': 'I',
    'Ó': 'O',
    'Ú': 'U'
  };
  return cadena.split('').map(function (letra) {
    return acentos[letra] || letra;
  }).join('').toString();
}

// NewsLetter
document.getElementById('newsletter-form').addEventListener('submit', function(evt){
  evt.preventDefault();
  newsletter('newsletter-form');
})
if(document.getElementById('newsletter-form-blog')){
  document.getElementById('newsletter-form-blog').addEventListener('submit', function(evt){
    evt.preventDefault();
    newsletter('newsletter-form-blog');
  })
}

function newsletter(selectedId){
    // var url = 'http://localhost:5000/inv-biblioteca-functions/us-central1/suraservices/nl-register';
    var url = 'https://us-central1-inv-biblioteca-functions.cloudfunctions.net/suraservices/nl-register';
    var formElement = selectedId.includes('blog') ? document.getElementsByTagName("form")[0] : document.getElementsByTagName("form").length>1 ? document.getElementsByTagName("form")[1] : document.getElementsByTagName("form")[0],
      inputElements = formElement.getElementsByTagName("input"),
      jsonObject = {};
    for(var i = 0; i < inputElements.length; i++){
        var inputElement = inputElements[i];
        jsonObject[inputElement.name] = inputElement.value.trim();
    }

    var form  = document.getElementById(selectedId);
    var allElements = form.querySelectorAll('input');
    form.querySelector('button').style.cursor = "not-allowed";
    form.querySelector('button').style.pointerEvents = "none";
    form.querySelector('button').innerHTML = "Enviando...";
    for (var i = 0, l = allElements.length; i < l; ++i) {
        // allElements[i].readOnly = true;
          allElements[i].disabled=true;
    }
    var modalsuccess = document.getElementById('SuccessModalNL');
    console.log("JSON: ", jsonObject);

    modalsuccess.querySelector('.modal-header').classList.remove('error');
    modalsuccess.querySelector('.modal-header').classList.remove('warning');
    modalsuccess.querySelector('.modal-header').classList.remove('success');

    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonObject)
    }).then(function (res) {
      return res.json();
    }).catch(function (error) {
        form.querySelector('button').style.pointerEvents = "inherit";
        form.querySelector('button').style.cursor = "pointer";
        form.querySelector('button').innerHTML = "Suscribirme";
        for (var i = 0, l = allElements.length; i < l; ++i) {
          // allElements[i].readOnly = true;
          allElements[i].disabled=false;
        }
        modalsuccess.querySelector('.modal-header').classList.add('error');
        modalsuccess.querySelector('#SuccessModalNLTitle').innerHTML = "¡Ups! Algo no salió bien";
        modalsuccess.querySelector('.modal-body p').innerHTML = "Lo sentimos, tu registro no se pudo completar correctamente, intentalo nuevamente.";
        $('#SuccessModalNL').modal('show');
      return console.error('Error:', error);
    }).then(function (response) {
        form.querySelector('button').style.pointerEvents = "inherit";
        form.querySelector('button').style.cursor = "pointer";
        form.querySelector('button').innerHTML = "Suscribirme";
        for (var i = 0, l = allElements.length; i < l; ++i) {
          // allElements[i].readOnly = true;
          allElements[i].disabled=false;
        }
      if(response.data.proccesResult && response.data.codigo==0){
        console.log('Success:', response.data);
        document.getElementById(selectedId).reset();
        modalsuccess.querySelector('.modal-header').classList.add('success');
        modalsuccess.querySelector('#SuccessModalNLTitle').innerHTML = "¡Registro exitoso!";
        modalsuccess.querySelector('.modal-body p').innerHTML = "Gracias por registrarte, ahora recibiras nuestras noticias y contenidos seleccionados que tenemos para ti.";
      }else{
        console.warn('Warning:', response.data);
        modalsuccess.querySelector('.modal-header').classList.add('warning');
        modalsuccess.querySelector('#SuccessModalNLTitle').innerHTML = "¡Ups! Algo no salió bien";
        modalsuccess.querySelector('.modal-body p').innerHTML = "Es posible que algún dato esté incorrecto o tu correo ya se encuentre registrado.";
      }
      $('#SuccessModalNL').modal('show');
    });
}

//Search function
function sendQuery(){
  var data = document.getElementById('search').value.trim();
  var tags = Array.from(document.querySelectorAll('.tags.active')).map( (function(x){
    return x.innerHTML
  })).join(',');
  data = quitarAcentos(data);
  tags = quitarAcentos(tags);
  // console.log("Query:", data, tags);
  if(data.length>0){
    window.location.href = "busqueda.html?q=" + data + ( tags.length>0 ? "&tags=" + tags : '' );
  }
}
function search(data, tags){
  // var url = 'http://localhost:5000/inv-biblioteca-functions/us-central1/search_lib';
  var url = 'https://us-central1-inv-biblioteca-functions.cloudfunctions.net/search_lib';

  fetch(url + "?q=" + data + "&tags=" + tags, {
  method: 'GET', // or 'PUT'
  }).then(function (res) {
    return res.json();
  }).catch(function (error) {
    return console.error('Error:', error);
  }).then(function (response) {
      console.log('Success:', response.data);
      printResults(response.data);
  });
}
if(document.getElementById('search')){
  document.getElementById('search').addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      sendQuery();
    }
  });
}
if(document.getElementById('icon-search')){
  document.getElementById('icon-search').addEventListener("click", function() {
      sendQuery();
  });
}
if(document.getElementById('busqueda')){
  var urlParams = new URLSearchParams(window.location.search);
  var datos = urlParams.get('q').trim();
  document.querySelector('#query').innerHTML = '“' + datos + '”';
  var t = urlParams.get('tags') ? urlParams.get('tags').trim() : '';
  datos = quitarAcentos(datos);
  t = quitarAcentos(t);
  if(datos.length>0){ //Validar caracteres especiales, quitarlos
    search(datos,t);
    console.log("ENVIAR: ", datos, t);
  }
}

//Redirect URL subdirectories menu-right
function verifyURL(){
  if( window.location.href.split('biblioteca-interactiva/')[1] && window.location.href.split('biblioteca-interactiva/')[1].split('/').length>1 ){
    Array.from(document.querySelectorAll('.menu-desktop-right a')).map(function (x, i) {
      document.querySelectorAll('.menu-desktop-right a')[i].href = x.href.replace(window.location.href.split('biblioteca-interactiva/')[1].split('/')[0] + '/', '');
      document.querySelectorAll('.menu-mobile-right a')[i].href = x.href.replace(window.location.href.split('biblioteca-interactiva/')[1].split('/')[0] + '/', '');
    });
  }
}