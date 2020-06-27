var postsArr = [];

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

const printCards = () => {
    printLeftPost()
}

const printLeftPost = () => {
    $('[data-post-id="rs1"]').append(`
        <div class="card-post-hide w-100 h-100 d-none">
            <h5>Publication muted</h5>
        </div>
        <div class="post-body">
            <img data-id-post="${postsArr[0].id}"class="cursor-hand w-100 counter"src="${postsArr[0].image}" alt="img">
            <div class="mt-2 col-9 col-sm-12 offset-lg-3 col-lg-9 p-0">
                <h5 data-id-post="${postsArr[0].id} "class="cursor-hand counter">${postsArr[0].title}</h5>
                <a href="#" class="text-muted counter" data-id-post="${postsArr[0].id}">${postsArr[0].subtitle}</a>
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

ajax("GET", setDataArr)