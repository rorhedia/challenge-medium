var postsArr = [];

// Creación del objeto que será enviado al endpoint
const setObjPost = () => {
    let form = $("#upgrade-medium").serializeArray(),
        created = Math.floor(Date.now() / 1000),
        userObj = {},
        data = {};
    $.each(form, function(idx, value) {
        userObj[value.name] = value.value;
    })
    userObj["created"] = created;
    ajax("POST", userSuccess, userObj);
}


const ajax = (method, callback, request = {}) => {
    let urlEndpoint = 'https://challenge-medium.firebaseio.com/posts/data/';

    if (method == 'GET') {
        urlEndpoint += '.json';
    } else if (method == 'POST') {
        urlEndpoint += '.json';
    } else if (method == 'DELETE') {
        urlEndpoint = `${request}/.json`;
    } else if (method == 'PATCH') {
        urlEndpoint = `${request.id}/.json`;
        let counter = parseInt(request.counter) + 1;
        request = { popular: counter };
        // console.log(request);
        // return
    }

    $.ajax({
        url: urlEndpoint,
        method: method,
        data: JSON.stringify(request)
    }).done(function(response, status) {
        if (status == 'success' && response !== null) {
            callback(response);
        }
    });
}

const setDataArr = response => {
    $.each(response, function(key, value) {
        value["id"] = key
        postsArr.push(value)
    })
    postsArr.reverse()
    printCards()
}

// Función que alerta que el post se creó correctamente
const userSuccess = data => {
    $('#upgrade-medium').trigger("reset");
    console.log(data);
}

const printCards = () => {
    printLeftPost()
    printCenterPost()
    printRightPost()
    infiniteScroll()
    printPopularPost()
}

const printLeftPost = () => {
    $('[data-post-id="rs1"]').append(`
        <div class="card-post-hide w-100 h-100 d-none">
            <h5>Publication muted</h5>
        </div>
        <div class="post-body">
            <img onclick="modalCards('${postsArr[0].id}')" data-toggle="modal" data-target="#modalCards"  class="size-custome cursor-hand w-100 counter" src="${postsArr[0].image}" alt="img">
            <div class="mt-2 col-9 col-sm-12 offset-lg-3 col-lg-9 p-0">
                <h5 onclick="modalCards('${postsArr[0].id}')" data-toggle="modal" data-target="#modalCards" class="cursor-hand counter">${postsArr[0].title}</h5>
                <a href="#" class="text-muted counter">${postsArr[0].subtitle}</a>
                <p class="anchor">
                    <a href="#">${postsArr[0].name}</a>
                    in
                    <a href="#">${postsArr[0].company}</a>                      
                </p>
                <p class="text-muted d-flex justify-content-between">
                    <span>${timeConverter(postsArr[0].created)} &CenterDot; 
                    <span> ${randomRead()} min read</span> &starf;</span>
                    <div>
                        <span>
                            <svg width="25" height="25">
                                <path
                                    d="M5 12.5c0 .552.195 1.023.586 1.414.39.39.862.586 1.414.586.552 0 1.023-.195 1.414-.586.39-.39.586-.862.586-1.414 0-.552-.195-1.023-.586-1.414A1.927 1.927 0 0 0 7 10.5c-.552 0-1.023.195-1.414.586-.39.39-.586.862-.586 1.414zm5.617 0c0 .552.196 1.023.586 1.414.391.39.863.586 1.414.586.552 0 1.023-.195 1.414-.586.39-.39.586-.862.586-1.414 0-.552-.195-1.023-.586-1.414a1.927 1.927 0 0 0-1.414-.586c-.551 0-1.023.195-1.414.586-.39.39-.586.862-.586 1.414zm5.6 0c0 .552.195 1.023.586 1.414.39.39.868.586 1.432.586.551 0 1.023-.195 1.413-.586.391-.39.587-.862.587-1.414 0-.552-.196-1.023-.587-1.414a1.927 1.927 0 0 0-1.413-.586c-.565 0-1.042.195-1.432.586-.39.39-.586.862-.587 1.414z"
                                    fill-rule="evenodd"></path>
                            </svg>
                        </span>
                    </div>
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
                        <img data-id-post="${postsArr[i].id}" class="center-img-cards cursor-hand counter" src="${postsArr[i].image}" alt="image">
                    </div>
                    <div class="col-8 order-0">
                    
                        <h5 href="#"  data-id-post="${postsArr[i].id}" class="counter cursor-hand mb-3">${postsArr[i].title}</h5>
                        <p><a href="#" class="cursor-hand text-muted">${postsArr[i].subtitle}</a></p>
                        <div class="row">
                            <div class="col-10 author">
                                <a href="#">${postsArr[i].name}</a>
                                <span>in</span>
                                <a href="#">${postsArr[i].company}</a>

                                <p>${timeConverter(postsArr[i].created)}
                                    <svg class="bi bi-dot" width="1em" height="1em" viewBox="0 0 16 16"
                                        fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                    </svg>
                                    <span>${randomRead()} min read</span>

                                    <svg class="bi bi-star-fill" width=".7em" height=".7em" viewBox="0 0 16 16"
                                        fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                    </svg>
                                </p>
                            </div>
                            <div class="col-2">
                                <a href="#">
                                    <span>
                                        <svg width="25" height="25">
                                            <path
                                                d="M5 12.5c0 .552.195 1.023.586 1.414.39.39.862.586 1.414.586.552 0 1.023-.195 1.414-.586.39-.39.586-.862.586-1.414 0-.552-.195-1.023-.586-1.414A1.927 1.927 0 0 0 7 10.5c-.552 0-1.023.195-1.414.586-.39.39-.586.862-.586 1.414zm5.617 0c0 .552.196 1.023.586 1.414.391.39.863.586 1.414.586.552 0 1.023-.195 1.414-.586.39-.39.586-.862.586-1.414 0-.552-.195-1.023-.586-1.414a1.927 1.927 0 0 0-1.414-.586c-.551 0-1.023.195-1.414.586-.39.39-.586.862-.586 1.414zm5.6 0c0 .552.195 1.023.586 1.414.39.39.868.586 1.432.586.551 0 1.023-.195 1.413-.586.391-.39.587-.862.587-1.414 0-.552-.196-1.023-.587-1.414a1.927 1.927 0 0 0-1.413-.586c-.565 0-1.042.195-1.432.586-.39.39-.586.862-.587 1.414z"
                                                fill-rule="evenodd"></path>
                                        </svg>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }
}

const printRightPost = () => {
    $('[data-post-id="rs3"]').append(`
        <div class="card-post-hide w-100 h-100 d-none">
            <h5>Publication muted</h5>
        </div>
        <div class="post-body">
                <img data-id-post="${postsArr[4].id}" class="size-custome cursor-hand w-100" src="${postsArr[4].image}" alt="img">
            <div>
                
                <h5 href="#" class="cursor-hand mb-3">${postsArr[4].title}</h5>
                <a href="#" class="text-muted counter" >${postsArr[4].subtitle}</a>
                <p class="anchor">
                    <a href="#" >${postsArr[4].name}</a>
                    in
                    <a href="#" >${postsArr[4].company}</a>
                </p>
                
                <p class="text-muted d-flex justify-content-between">
                    <span>${timeConverter(postsArr[4].created)} &CenterDot; 
                        <span> ${randomRead()} min read</span> 
                    &starf;</span>
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

const infiniteScroll = () => {
    $.each(postsArr, function(index, post) {
        $('#general-cards').append(`
            <div class="row pt-5">
                <div class="col-8 col-md-9 text-card-section">
                    <p class="text-muted mb-1">BASED ON YOUR READING HISTORY</p>                    
                    <h5 href="#" class="cursor-hand font-weight-bold mb-1">${post.title}</h5>
                    <p class="cursor-hand text-muted">${post.subtitle}</p>
                    <div class="row">
                        <div class="col-6">
                            <div class="anchor">
                            <a href="#">${post.name}</a>
                                in
                            <a href="#">${post.company}</a>
                            </div>
                            <span class="text-muted">${timeConverter(post.created)}</span>
                        </div>
                        <div class="col-6 d-flex align-self-end justify-content-end">
                            <span class="svgIcon svgIcon--bookmark svgIcon--25px">
                                <svg class="svgIcon-use" width="25" height="25">
                                    <path
                                        d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z"
                                        fill-rule="evenodd"></path>
                                </svg>
                            </span>
                            <span class="svgIcon svgIcon--moreFilled svgIcon--25px is-flushRight">
                                <svg class="svgIcon-use" width="25" height="25">
                                    <path
                                        d="M5 12.5c0 .552.195 1.023.586 1.414.39.39.862.586 1.414.586.552 0 1.023-.195 1.414-.586.39-.39.586-.862.586-1.414 0-.552-.195-1.023-.586-1.414A1.927 1.927 0 0 0 7 10.5c-.552 0-1.023.195-1.414.586-.39.39-.586.862-.586 1.414zm5.617 0c0 .552.196 1.023.586 1.414.391.39.863.586 1.414.586.552 0 1.023-.195 1.414-.586.39-.39.586-.862.586-1.414 0-.552-.195-1.023-.586-1.414a1.927 1.927 0 0 0-1.414-.586c-.551 0-1.023.195-1.414.586-.39.39-.586.862-.586 1.414zm5.6 0c0 .552.195 1.023.586 1.414.39.39.868.586 1.432.586.551 0 1.023-.195 1.413-.586.391-.39.587-.862.587-1.414 0-.552-.196-1.023-.587-1.414a1.927 1.927 0 0 0-1.413-.586c-.565 0-1.042.195-1.432.586-.39.39-.586.862-.587 1.414z"
                                        fill-rule="evenodd"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-4 col-md-3">
                    <img class="infinte-card " src="${post.image}" alt="img1">
                </div>
            </div>
        `)
    })
}

const printPopularPost = () => {
    $.each(sortPopularPost(), function(idx, post) {
        idx++;
        $('[data-post-id="popularonmedium"]').append(`
            <div class="post-body">
                <div class="row pb-3">
                    <div class="col-3 col-sm-1 col-lg-3">
                        <h2 class="text-muted text-right">${idx}</h2>
                    </div>
                    <div class="col-9 col-sm-10 col-lg-9">
                        <h5>${post.title}</h5>
                        <p class="anchor">
                            <a href="#">${post.name}</a>
                            in
                            <a href="#">${post.company}</a>
                        </p>
                        <p class="text-muted d-flex justify-content-between">
                        <span>${timeConverter(post.created)} &CenterDot; 5 min read &starf;</span>
                        </p>
                    </div>
                </div>
            </div>
        `);
    })
}

const sortPopularPost = () => {

    postsArr.sort(function(a, b) {
        return a.popular - b.popular;
    });
    return postsArr.reverse().splice(0, 4);
}

const modalCards = idCard => {
    $.get(`https://challenge-medium.firebaseio.com/posts/data/${idCard}/.json`, function(data) {
        console.log(data);
        $('.modal-body img').attr("src", data.image);
        $('#modalCardsLabel').text(data.title)
        $('.modal-body .anchor').text(data.subtitle)
        $('.modal-body .parrafo').text(data.paragraph)
        
    })
}

const timeConverter = timestamp => {
    let a = new Date(timestamp * 1000);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let month = months[a.getMonth()];
    let date = a.getDate();
    // let min = a.getMinutes();

    return `${month} ${date}`;
}

const randomRead = () => {
    return Math.floor(Math.random() * 15) + 1;
}

const scrollRight = () => {
    $(".horizontal-contenedor").animate({ scrollLeft: "1366px" }, 3000)
}

const scrollToLeft = () => {
    $(".horizontal-contenedor").animate({ scrollLeft: "0px" }, 3000)
}


ajax("GET", setDataArr)

$('#save-post').on('click', setObjPost)