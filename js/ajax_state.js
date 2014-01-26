function scrollTop(callback) {
    $("html").animate({ scrollTop: "0px"}, {complete: callback});
}

function computeStateName(url) {
    var hostname = url.split('/')[2]
    var url_after_hostname = 
        url.substr(
            url.indexOf(hostname) + hostname.length
        )
    return url_after_hostname
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
    console.log(state)
    NProgress.start();

    scrollTop(function() {
        console.log('fading out')
        $('main').fadeOut(delta, function() {
            if (replaceDOM) {
                console.log("replacing'")
                replaceMainSection(state.data)
            }

            console.log('fading in')
            $('main').fadeIn(delta)
            NProgress.done();

            if (updateCounters) {
                updateCounters()
            } bindLinks()
        })
    })
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