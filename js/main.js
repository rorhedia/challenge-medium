var actionValue = '';

const callPopover = () => {
    $('[data-toggle="popover"]').popover({
        html: true,
        content: function () {
            var content = $(this).data("popover-content");
            return $(content).children(".popover-body").html();
        },
    });
}

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
    let form = $('#upgrade-medium').serializeArray(),
        created = Math.floor(Date.now() / 1000),
        userObj = {},
        data = {};

    $.each(form, function (idx, value) {
        userObj[value.name] = value.value;
    })

    userObj['created'] = created;

    data = {
        method: 'POST',
        request: userObj,
    }

    ajax(data, userSuccess);
}

// Función que pintará las cards en el dom
const printCards = data => {
    let posts = [],
        timeStart = 0;

    $.each(data, function (idx, post) {
        if (post.created > timeStart) {
            position = [idx, post]
            posts.unshift(position)
            timeStart = post.created
        }
    })

    // Seccion Recientes - Card izquierda
    printLeftPost(posts[0]);

    // Seccion Recientes - Cards centro
    printCenterPost(posts);

    // Seccion Recientes - Card derecha
    printRightPost(posts[4])

    // Seccion popular on medium
    printPopularPost(posts);

    callPopover();
}

const printLeftPost = posts => {
    $('[data-post-id="rs1"]').append(`
        <div class="card-post-hide w-100 h-100 d-none">
            <h5>Publication muted</h5>
        </div>
        <div class="post-body">
            <a href="${posts[1].companyUrl}">
                <img class="w-100" src="${posts[1].articlePhoto}" alt="img">
            </a>
            <div class="mt-2 col-9 col-sm-12 offset-lg-3 col-lg-9 p-0">
                <a href="${posts[1].companyUrl}"><h5>${posts[1].title}</h5></a>
                <a href="${posts[1].companyUrl}" class="text-muted">${posts[1].paragraph}</a>
                <p class="anchor">
                    <a href="#" data-placement="top" data-toggle="popover"
                        data-popover-content="#popover-componentUser" data-trigger="hover">${posts[1].name}</a>
                    in
                    <a href="#" data-placement="bottom" data-toggle="popover"
                        data-popover-content="#popover-componentUser" data-trigger="hover">${posts[1].company}</a>
                </p>
                <p class="text-muted d-flex justify-content-between">
                    <span>${timeConverter(posts[1].created)} &CenterDot; 
                    <span
                    data-placement="top" data-toggle="popover" data-trigger="hover"
                    data-content='<div class="text-light bg-dark py-1 px-2">Updated ${timeConverter(posts[1].created)}</div>'>5 min read</span> &starf;</span>
                    <a class="popover-show" data-action-value="${posts[0]}" tabindex="0" data-trigger="focus" role="button" data-toggle="popover" data-placement="bottom" data-popover-content='#popover-component'>
                        <span>
                            <svg width="25" height="25">
                                <path
                                    d="M5 12.5c0 .552.195 1.023.586 1.414.39.39.862.586 1.414.586.552 0 1.023-.195 1.414-.586.39-.39.586-.862.586-1.414 0-.552-.195-1.023-.586-1.414A1.927 1.927 0 0 0 7 10.5c-.552 0-1.023.195-1.414.586-.39.39-.586.862-.586 1.414zm5.617 0c0 .552.196 1.023.586 1.414.391.39.863.586 1.414.586.552 0 1.023-.195 1.414-.586.39-.39.586-.862.586-1.414 0-.552-.195-1.023-.586-1.414a1.927 1.927 0 0 0-1.414-.586c-.551 0-1.023.195-1.414.586-.39.39-.586.862-.586 1.414zm5.6 0c0 .552.195 1.023.586 1.414.39.39.868.586 1.432.586.551 0 1.023-.195 1.413-.586.391-.39.587-.862.587-1.414 0-.552-.196-1.023-.587-1.414a1.927 1.927 0 0 0-1.413-.586c-.565 0-1.042.195-1.432.586-.39.39-.586.862-.587 1.414z"
                                    fill-rule="evenodd"></path>
                            </svg>
                        </span>
                    </a>
                </p>
            </div>
        </div>
    `);
}

const printCenterPost = posts => {
    for (let i = 1; i <= 3; i++) {
        $('[data-post-id="rs2"]').append(`
            <div class="card-post-hide w-100 h-100 d-none">
                <h5>Publication muted</h5>
            </div>
            <div class="post-body">
                <div class="row mb-2">
                    <div class="col-4 w-100 order-1 order-md-0">
                        <img src="${posts[i][1].articlePhoto}" alt="image">
                    </div>
                    <div class="col-8 order-0">
                        
                        <a href="${posts[i][1].companyUrl}" class="font-weight-bolder mb-3">${posts[i][1].title}</a>
                        <p><a href="${posts[i][1].companyUrl}" class="text-muted">${posts[i][1].paragraph}</a></p>
                        <div class="row">
                            <div class="col-10 author">
                                <a href="#" data-placement="top" data-toggle="popover"
                                    data-popover-content="#popover-componentUser" data-trigger="hover">${posts[i][1].name}</a>
                                <span>in</span>
                                <a href="#" data-placement="bottom" data-toggle="popover"
                                    data-popover-content="#popover-componentUser" data-trigger="hover">${posts[i][1].company}</a>

                                <p>${timeConverter(posts[i][1].created)}
                                    <svg class="bi bi-dot" width="1em" height="1em" viewBox="0 0 16 16"
                                        fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                    </svg>
                                    <span data-toggle="popover" data-content='<div class="text-light bg-dark py-1 px-2">Updated ${timeConverter(posts[i][1].created)}</div>' data-placement="top"
                                        data-trigger="hover">4 min read</span>

                                    <svg class="bi bi-star-fill" width=".7em" height=".7em" viewBox="0 0 16 16"
                                        fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                    </svg>
                                </p>
                            </div>
                            <div class="col-2">
                                <svg class="svgIcon-use cursor-hand" width="25" height="25">
                                    <path
                                        d="M5 12.5c0 .552.195 1.023.586 1.414.39.39.862.586 1.414.586.552 0 1.023-.195 1.414-.586.39-.39.586-.862.586-1.414 0-.552-.195-1.023-.586-1.414A1.927 1.927 0 0 0 7 10.5c-.552 0-1.023.195-1.414.586-.39.39-.586.862-.586 1.414zm5.617 0c0 .552.196 1.023.586 1.414.391.39.863.586 1.414.586.552 0 1.023-.195 1.414-.586.39-.39.586-.862.586-1.414 0-.552-.195-1.023-.586-1.414a1.927 1.927 0 0 0-1.414-.586c-.551 0-1.023.195-1.414.586-.39.39-.586.862-.586 1.414zm5.6 0c0 .552.195 1.023.586 1.414.39.39.868.586 1.432.586.551 0 1.023-.195 1.413-.586.391-.39.587-.862.587-1.414 0-.552-.196-1.023-.587-1.414a1.927 1.927 0 0 0-1.413-.586c-.565 0-1.042.195-1.432.586-.39.39-.586.862-.587 1.414z"
                                        fill-rule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }
}

const printRightPost = posts => {
    $('[data-post-id="rs3"]').append(`
        <div class="card-post-hide w-100 h-100 d-none">
            <h5>Publication muted</h5>
        </div>
        <div class="post-body">

            <a href="${posts[1].companyUrl}">
                <img class="w-100" src="${posts[1].articlePhoto}" alt="img">
            </a>
            <div>
                <a href="${posts[1].companyUrl}"><h5>${posts[1].title}</h5></a>
                <a href="${posts[1].companyUrl}" class="text-muted">${posts[1].paragraph}</a>
                <p class="anchor">
                    <a href="#" data-placement="top" data-toggle="popover"
                        data-popover-content="#popover-componentUser" data-trigger="hover">${posts[1].name}</a>
                    in
                    <a href="#" data-placement="bottom" data-toggle="popover"
                        data-popover-content="#popover-componentUser" data-trigger="hover">${posts[1].company}</a>
                </p>
                
                <p class="text-muted d-flex justify-content-between">
                    <span>${timeConverter(posts[1].created)} &CenterDot; 
                    <span
                    data-placement="top" data-toggle="popover" data-trigger="hover"
                    data-content='<div class="text-light bg-dark py-1 px-2">Updated ${timeConverter(posts[1].created)}</div>'> 5 min read</span> &starf;</span>
                    <span>
                        <svg width="25" height="25">
                            <path
                                d="M5 12.5c0 .552.195 1.023.586 1.414.39.39.862.586 1.414.586.552 0 1.023-.195 1.414-.586.39-.39.586-.862.586-1.414 0-.552-.195-1.023-.586-1.414A1.927 1.927 0 0 0 7 10.5c-.552 0-1.023.195-1.414.586-.39.39-.586.862-.586 1.414zm5.617 0c0 .552.196 1.023.586 1.414.391.39.863.586 1.414.586.552 0 1.023-.195 1.414-.586.39-.39.586-.862.586-1.414 0-.552-.195-1.023-.586-1.414a1.927 1.927 0 0 0-1.414-.586c-.551 0-1.023.195-1.414.586-.39.39-.586.862-.586 1.414zm5.6 0c0 .552.195 1.023.586 1.414.39.39.868.586 1.432.586.551 0 1.023-.195 1.413-.586.391-.39.587-.862.587-1.414 0-.552-.196-1.023-.587-1.414a1.927 1.927 0 0 0-1.413-.586c-.565 0-1.042.195-1.432.586-.39.39-.586.862-.587 1.414z"
                                fill-rule="evenodd"></path>
                        </svg>
                    </span>
                </p>
            </div>
        </div>
    `)
}

const printPopularPost = posts => {
    // let popularPosts = sortPopularPost(posts);
    $.each(sortPopularPost(posts), function (idx, post) {
        idx++;
        $('[data-post-id="popularonmedium"]').append(`
            <div class="post-body">
                <div class="row pb-3">
                     <div class="col-3 col-sm-1 col-lg-3">
                         <h2 class="text-muted text-right">0${idx}</h2>
                     </div>
                     <div class="col-9 col-sm-10 col-lg-9">
                         <a href="${post.companyUrl}"><h5>${post.title}</h5></a>
                         <p class="anchor">
                            <a href="#" data-placement="top" data-toggle="popover"
                                data-popover-content="#popover-componentUser" data-trigger="hover">${post.name}</a>
                            in
                            <a href="#" data-placement="bottom" data-toggle="popover"
                                data-popover-content="#popover-componentUser" data-trigger="hover">${post.company}</a>
                        </p>
                         <p class="text-muted d-flex justify-content-between">
                         <span>${timeConverter(posts.created)} &CenterDot; 
                         <span
                            data-placement="top" data-toggle="popover" data-trigger="hover"
                            data-content='<div class="text-light bg-dark py-1 px-2">Updated ${timeConverter(posts.created)}</div>'> 5 min read</span> &starf;</span>
                         </p>
                     </div>
                 </div>
            </div>
        `);
    })
}

const sortPopularPost = postArr => {
    let popularList = [];

    $.each(postArr, function (idx, post) {
        popularList[idx] = post[1];
        popularList[idx]['id'] = post[0];
    })

    popularList.sort(function (a, b) {
        return a.popular - b.popular;
    });

    return popularList.reverse().splice(0, 4);
}

const timeConverter = (UNIX_timestamp) => {
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let month = months[a.getMonth()];
    let date = a.getDate();
    // let min = a.getMinutes();

    return `${month} ${date}`;
}

// Función que alerta que el post se creó correctamente
const userSuccess = data => {
    $('#upgrade-medium').trigger("reset");
    console.log(data);
}

// Función para eliminar posts
const userDelete = id => {
    let data = {
        method: 'DELETE',
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
callPopover();

$('#save-post').on('click', setObjPost)

$("#save-article").click(function () {
    window.location = '../formulario.html';
});

$("#toIndex").click(function () {
    window.location = 'index.html';
}); //boton regresar