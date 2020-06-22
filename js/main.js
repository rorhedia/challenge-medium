var actionValue = '';
$('[data-toggle="popover"]').popover({
    html   : true,
    content: function () {
        var content = $(this).data("popover-content");
        return $(content).children(".popover-body").html();
    },
});

$('.popover-show').on('click', function (e) {
    e.preventDefault();
    actionValue = $(this).data('action-value');
    let cardPostContainer = $(`[data-post-id=${actionValue}]`).children();
    cardPostContainer.closest('.card-post-hide').removeClass('d-none');
    $('.popover-show').popover('hide')
})

$('.action-click').on('click', function (e) {
    e.preventDefault();
    console.log('asdfghjk');
    alert();
})

$('.card-body-closed').click(function () {
    $(this).closest('#card-learn').remove();
})

/* FUNCIONES */

// Creación del objeto que será enviado al endpoint
const setObjPost = () => {
    let form    = $('#upgrade-medium').serializeArray(),
        created = +new Date,
        userObj = {},
        data    = {};

    $.each(form, function (idx, value) {
        userObj[value.name] = value.value;
    })

    userObj['created'] = created;

    data = {
        method : 'POST',
        request: userObj,
    }

    ajax(data, userSuccess);
}

// Función que pintará las cards en el dom
const printCards = data => {
    console.log(data);
    //aqui va mi card que quiero pintar
}

// Función que alerta que el post se creó correctamente
const userSuccess = data => {
    $('#upgrade-medium').trigger("reset");
    console.log(data);
}

// Función para eliminar posts
const userDelete = id => {
    let data = {
        method : 'DELETE',
        request: id
    }
    ajax(data, msgDelete)
}

const msgDelete = () => {
    alert(`Post eliminado correctamente`);
}

/**
 * Creación del ajax que hará las peticiones al endpoint
 * 
 * @param {Obj} data :: method
 * @param func callback 
 */
const ajax = (data, callback) => {
    let { method, request } = data,
        urlEndpoint = '';

    if (method == 'POST' || method == 'GET') {
        urlEndpoint = '/.json';
    } else if (method == 'DELETE') {
        urlEndpoint = `${request}/.json`;
    }

    $.ajax({
        url: `https://challenge-medium.firebaseio.com/posts/data/${urlEndpoint}`,
        method: method,
        data: JSON.stringify(request)
    }).done(function (response, status) {
        console.log(status);
        if (status == 'success' && response !== null) {
            callback(response);
        }
    });
}

/* Eventos */

ajax({ method: 'GET' }, printCards);

$('#save-post').on('click', setObjPost)

$("#save-article").click(function () {
    window.location = '../formulario.html';
});

$("#toIndex").click(function () {
    window.location = 'index.html';
}); //boton regresar