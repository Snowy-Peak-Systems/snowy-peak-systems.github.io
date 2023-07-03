function submitContact(token) {
    var name = $("input#name").val();
    var email = $("input#email").val();
    var message = $("textarea#message").val();
    $.ajax({
        url: "https://42cqecpfri.execute-api.us-east-2.amazonaws.com/contact",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            name: name,
            email: email,
            message: message,
            token: token
        }),
        dataType: 'json',
        cache: false,
        success: function () {
            // Success message
            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#success > .alert-success')
                .append("<strong>Your message has been sent.</strong>");
            $('#success > .alert-success').append('</div>');

            //clear all fields
            $('#contactForm').trigger("reset");
        },
        error: function(data) {
            // Fail message
            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            if (data.status === 500){
                $('#success > .alert-danger').append("<strong>Sorry, an unexpected error has occurred. Please try again later!");
            } else if (data.status === 429) {
                $('#success > .alert-danger').append("<strong>Sorry, your request timed out, please try again!");
            } else {
                $('#success > .alert-danger').append("<strong>Sorry, an error has occurred: " + data.responseJSON.message);
            }

            $('#success > .alert-danger').append('</div>');
        }
    })
}

$(function() {
    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            grecaptcha.execute();
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
