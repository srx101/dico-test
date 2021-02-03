
(function () {
  "use strict";


  let records = [];

  getRecords();


  $('#recordsF').submit(function (e) {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let message = document.getElementById('message').value;


    if (name === '' || email === '' || phone === '' || message === '') {
      showAlert('¡Ooops!', 'Ingresa todos los campos por favor :(', 'error');
      return;
    }

    if (!validateEmail(email)) {
      showAlert('¡Ooops!', 'Ingresa un email válido :(', 'error');
      return;
    }

    $.ajax({
      url: 'controllers/records.controller.php',
      method: 'POST',
      data:
      {
        'action': 'SAVE',
        'name': name,
        'email': email,
        'phone': phone,
        'message': message
      },
      beforeSend: function () {
        $("#loadingR").show();
      },
      success: function (data) {
        if (!data.ok) {
          getRecords();
          clearInputs();
          showAlert("Éxito", "Puedes continuar, gracias por visitarnos ;)", "success");
        } else {
          showAlert("Error", data.message, "error");
        }
      },
      error: function (e) {
        console.log("Error");
        console.log(e);
        showAlert("Error  :(", e.message, "error")
      },
      complete: function (data) {
        $("#loadingR").hide();
      }
    });


  });


  function getRecords() {
    $.ajax({
      url: "controllers/records.controller.php",
      method: "POST",
      data:
      {
        'action': 'GETR'
      },
      success: function (data) {
        records = JSON.parse(data);

        records.length > 0 ? $('#downloadR').show() : $('#downloadR').hide();

        let html = '';
        $.each(JSON.parse(data), function (index, record) {
          html += '<tr>'
          html += `<td>${record.name}</td>`
          html += `<td>${record.email}</td>`
          html += `<td>${record.phone}</td>`
          html += `<td>${record.message}</td>`
          html += '</tr>'
        });
        document.getElementById('recordsTable').innerHTML = html;
      },
      error: function (e) {
        console.log(e);
        showAlert("Error  :(", e.message, "error")
      }
    });
  }

  $('#downloadR').click(function (e) {
    const array = [['Nombre', 'Correo', 'Telefono', 'Mensaje']].concat(records);
    
    let csvData = array.map(it => {
      return Object.values(it).toString()
    }).join('\n')

    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvData);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'visitantes.csv';
    hiddenElement.click();

  });


  function clearInputs() {
    document.getElementById('name').value='';
    document.getElementById('email').value='';
    document.getElementById('phone').value='';
    document.getElementById('message').value='';
  }
  
  /**
   * Easy selector 
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener 
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event  
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }



  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    onscroll(document, () => {
      if (window.scrollY > 50) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    })
  }

  /**
   * Back to top button
   */
  onscroll(window, function () {
    let backToTop = select('.back-to-top')
    if (window.scrollY > 100) {
      backToTop.classList.add('active')
    } else {
      backToTop.classList.remove('active')
    }
  })

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Animation on scroll
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }

  window.addEventListener('load', () => {
    aos_init();
  });


})();


function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function showAlert(title, description, type) {
  Swal.fire({
    title: title,
    text: description,
    icon: type,
    confirmButtonColor: '#4154f1',
    confirmButtonText: 'Cool',
  })
}