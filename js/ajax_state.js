function scrollTop(callback) {
    $("html, body").animate({ scrollTop: "0px"}, {complete: callback});
}

function computeStateName(url) {
    var hostname = url.split('/')[2]
    var result = 
        url.substr(
            url.indexOf(hostname) + hostname.length
        )
    if (result != '/' && result.substr(-1) == '/') {
        result = result.slice(0,-1)
    }
    return result
}

function bindLinks() {
    // $('a[data-ajaxstate]')
    $('a[href^="/"]').unbind('click').click(function(e){
        if (e.which == 1) {
            e.preventDefault()
            nav_clicked(this.href);
            return false;
        }
    })
}

function replaceMainSection(data){
    // replaces the main section of the site
    $('main').html(data);
}

function loadState(state, replaceDOM) {
    var delta = 200
    var data = state.data
    NProgress.start();

    // decide if we really need to do this
    if (state.data != $('main').html()) {
        scrollTop(function() {
            $('main').animate({right: '100%'}, delta, function() {
                $('main').css('right', '-100%')
                if (replaceDOM) {
                    replaceMainSection(state.data)
                }

                $('main').animate({right: '0px'}, delta)
                NProgress.done();

                if (updateCounters) {
                    updateCounters()
                } bindLinks()
            })
        })
    }
    else {
        if (!replaceDOM) {
            scrollTop()
        }
        NProgress.done()
    }
}

if ('pushState' in history) {
    // create the first state for the browser
    var name = computeStateName(window.location.href)
    window.history.replaceState(
        {
            data: $('main').html(), 
            name: name
        }, name, name
    )

    function getState(url) {
        var nextStateName = computeStateName(url)
        if ( nextStateName != window.history.state.name ) {
            // GET from server
            $.get(url, function(html) {
                var data = $(html).find('main').html()
                window.history.pushState({data: data, name: nextStateName}, nextStateName, nextStateName)

                loadState(window.history.state, true)
            })
        }
        else {
            loadState(window.history.state)
        }
    }


    // someone clicks URL
    function nav_clicked(url){
        getState(url)
    }

    // browser navigation
    window.onpopstate = function(event) {
        var state = event.state
        if (state) {
            loadState(state, true)
        }
    }

    bindLinks()

}
