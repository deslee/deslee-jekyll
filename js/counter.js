var toggleFooter = function(e) {
    $('#main-footer').slideToggle();
    $('#extra-footer').slideToggle();
}

updateCounters = function(callback) {
    var url = window.location.href
    var page = url.substring(0, url.lastIndexOf('/') + 1);

    $.getJSON(counter_req_link, {url: page}, 
        function(counter){
            $('footer [data-target]').each(
                function(i,e) {
                    var element = $(e)
                    var target = element.data('target')
                    element.text(counter[target])
                }
            )
            console.log(counter)
            if (callback) {
                callback(counter)
            }
        }
    )
}

updateCounters(function() {
    $('[data-toggle="footer"]').click(function(e) {
        e.preventDefault()
        toggleFooter(e)
    })
})