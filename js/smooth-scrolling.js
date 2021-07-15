////////////////////smooth scrolling////////////////////////
$(function () {
    $(".links-list-link a, #contact-link, header a, #discover-button").on("click", function (e) {
        e.preventDefault();
        let hash = this.hash;
        console.log(hash);
        $("body,html").animate({ scrollTop: $(hash).offset().top - 50 }, 900, function () {});
        console.log({ scrollTop: $(hash).offset().top - 150 });
    });
});
///////////////////////////////////////////////////////////
