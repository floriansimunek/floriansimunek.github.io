////////////////////smooth scrolling////////////////////////
$(function () {
    $(".navbar a, .footer a").on("click", function (e) {
        e.preventDefault();
        let hash = this.hash;
        console.log(hash)
        $("body,html").animate({ scrollTop: $(hash).offset().top-150 }, 900, function () { window.location.hash = $(hash).offset().top-150; })
        console.log({scrollTop: $(hash).offset().top-150})
    })
})
///////////////////////////////////////////////////////////

//////////////////////contact form/////////////////////////
$(document).ready(function(){
    $('#submit').submit(function(e){
        let email = $('.email').val();
        let subject = $('.subject').val();
        let message = $('.message').val();
        let errorMessage = $('.status');
        errorMessage.empty();

        if(email.length > 5 && email.includes('@') && email.includes('.')){
            errorMessage.append("<div class='message'>L'adresse mail est valide</div>");
        } else {
            e.preventDefault();
            errorMessage.append("<div class='message'>L'adresse mail n'est pas valide</div>");
        }

        if(subject.length > 2){
            errorMessage.append("<div class='message'>Le sujet est valide</div>");
        } else {
            e.preventDefault();
            errorMessage.append("<div class='message'>Le sujet n'est pas valide</div>");
        }

        if(message.length >= 10){
            errorMessage.append("<div class='message'>Le message est valide</div>");
        } else {
            e.preventDefault();
            errorMessage.append("<div class='message'>Le message n'est pas valide</div>");
        }

        window.location.reload();
    })
})
///////////////////////////////////////////////////////////

/////////////////////////Animations////////////////////////

///////////////////////////////////////////////////////////