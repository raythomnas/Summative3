
console.log('howdy');

// ICONS
feather.replace();
// Make sure this matches your backend address
var backendAddress = 'http://localhost:3000';

// jQuery - wait until the page has finished loading
$(function () {
    // Bella start

    // Function for when the register form is submitted
    $('#registerForm').on('submit', function () {
        // Hide any error messages that may be present
        $('#registerError').addClass('d-none');

        // Get the values of the form fields
        var username = $('#registerUsername').val();
        var email = $('#registerEmail').val();
        var password = $('#registerPassword').val();
        var photoUrl = $('#registerPhoto').val();

        if (!username) {
            $('#registerError').removeClass('d-none');
            $('#registerError').text("Please enter a username");
        } else if (!email) {
            $('#registerError').removeClass('d-none');
            $('#registerError').text("Please enter an email");
        } else if (!password) {
            $('#registerError').removeClass('d-none');
            $('#registerError').text("Please enter a password");
        } else {
            // Send the form values to the backend
            $.ajax({
                url: backendAddress + '/register',
                method: 'POST',
                data: {
                    username: username,
                    email: email,
                    password: password,
                    photoUrl: photoUrl,
                },
                success: function (response) {
                    if (response === "This email is already taken. Please try another one") {
                        // Failed because email was not unique
                        $('#registerError').removeClass('d-none');
                        $('#registerError').text(response);
                    } else {
                        // Successfully registered
                        console.log("Successfully registered");
                        console.log(response);
                    }
                }
            });
        }
    });

    // Function for when the login form is submitted
    $('#loginForm').on('submit', function () {
        // Hide any error messages that may be present
        $('#loginError').addClass('d-none');

        // Get the values of the form fields
        var email = $('#loginEmail').val();
        var password = $('#loginPassword').val();

        if (!email) {
            $('#loginError').removeClass('d-none');
            $('#loginError').text("Please enter your email");
        } else if (!password) {
            $('#loginError').removeClass('d-none');
            $('#loginError').text("Please enter your password");
        } else {
            // Send the form values to the backend
            $.ajax({
                url: backendAddress + '/login',
                method: 'POST',
                data: {
                    email: email,
                    password: password,
                },
                success: function (response) {
                    if (response === "Not authorised. Incorrect password") {
                        // Failed because incorrect password
                        $('#loginError').removeClass('d-none');
                        $('#loginError').text(response);
                        // Failed because user not found
                    } else if (response === "User not found") {
                        $('#loginError').removeClass('d-none');
                        $('#loginError').text("No user associated with this email. Please register.");
                    } else {
                        // Successfully logged in
                        console.log("Successfully logged in");
                        console.log(response);
                    }
                }
            });
        }
    });

    // Bella end
});
