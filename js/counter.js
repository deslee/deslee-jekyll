var toggleFooter = function(e) {
    $('#main-footer').slideToggle();
    $('#extra-footer').slideToggle();
}

updateCounters = function(callback) {
    $.getJSON(counter_req_link, {url: window.location.href}, 
        function(counter){
            console.log(counter)
            $('footer [data-target]').each(
                function(i,e) {
                    var element = $(e)
                    var target = element.data('target')
                    element.text(counter[target])
                }
            )
            if (callback) {
                callback(counter)
            }
        }
    )
}

updateCounters(function() {
    $('.footer').click(function(e) {
        var good = 
            e.target == $('#main-footer')[0] ||
            e.target == $('#extra-footer')[0]

        if (good) {
            toggleFooter(e)
        }
    })
})