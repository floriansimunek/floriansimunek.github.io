////////////////////smooth scrolling////////////////////////
$(function () {
    $(".navbar a, footer a").on("click", function (event) {
        event.preventDefault();
        let hash = this.hash;
        console.log(hash)
        $("body,html").animate({ scrollTop: $(hash).offset().top-150 }, 900, function () { window.location.hash = $(hash).offset().top-150; })
        console.log({scrollTop: $(hash).offset().top-150})
    })
})
///////////////////////////////////////////////////////////