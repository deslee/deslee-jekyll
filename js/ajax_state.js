
function getState(url) {
    var hostname = url.split('/')[2]
    var url_after_hostname = 
        url.substr(
            url.indexOf(hostname) + hostname.length
        )
    return url_after_hostname
}

var currentState;
function getCurrentState() {
    currentState = 
        getState(window.location.href)
}
getCurrentState()

window.history.replaceState({data: $('main').html()}, currentState, currentState)

function replaceMainSection(data){
    var delta = 0
    $('main').html(data); // then animate....
    return data
}

function nav_clicked(url){
    var nextState = getState(url)

    NProgress.start();
    NProgress.inc();

    console.log(currentState)
    console.log(nextState)

    if ( currentState != nextState ) {
        $.ajax({
            url: url,
            method: 'get',
            success: function(html) {
                NProgress.inc();
                var html = $(html)
                var data = $(html).find('main').html()
                var data = replaceMainSection(data)
                window.history.pushState({'data': data}, nextState, nextState)
                NProgress.done()
                getCurrentState()
            }
        })
    }
    else {
        NProgress.done()
    }
}

// $('a[data-ajaxstate]')
$('a[href^="/"]').click(function(e){
    if (e.which == 1) {
        e.preventDefault()
        nav_clicked(this.href);
        return false;
    }
})

window.onpopstate = function(event) {
    NProgress.start();
    var state = event.state
    if (state) {
        var data = state.data
        replaceMainSection(state.data)
    }
    getCurrentState()
    NProgress.done();
}
