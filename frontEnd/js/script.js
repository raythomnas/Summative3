
console.log('howdy');

// ICONS

feather.replace();

// Make sure this matches your backend address
var backendAddress = 'http://localhost:3000';
var backendAddress2 = 'http://localhost:5000';

//----------------LANDING PAGE JS LOGIC (Vale)---------------------------//
console.log('I hope this works');
//To show landing page with neccesary features for an external user: all card events, nav login/register options
// $(document).ready(function(){
//   $('#homePage').show();
//   $('#logoutBtn').hide();
//   $('#profileLink').hide();
//   $('#eventPageZero').hide();
//   $('#eventPageOne').hide();
//   $('#eventPageTwo').hide();
//   $('#viewUserForm').hide();
//   $('#editForm').hide();
//   $('#registerForm').hide();
//   $('#loginForm').hide();
//   if (sessionStorage['userName']) {
//     console.log('You are logged in');
//     $('#logoutBtn').show();
//     $('#registerBtn').hide();
//     $('#loginBtn').hide();
//     } else {
//       console.log('Please login');
//       $('#logoutBtn').hide();
//       };
//   $('#homeBtn').click(function(){
//     $('#homePage').show();
//     $('#loginForm').hide();
//   });
//   $('#registerBtn').click(function(){
//     $('#homeBtn').show();
//     $('#profileLink').hide();
//     $('#logoutBtn').hide();
//     $('#loginBtn').hide();
//     $('#registerBtn').hide();

//     $('#homePage').hide();
//     $('#eventPage').hide();
//     $('#viewUserForm').hide();
//     $('#editForm').hide();
//     $('#loginForm').hide();
//     $('#registerForm').show();
//   });
//   $('#loginBtn').click(function(){
//     $('#homeBtn').show();
//     $('#profileLink').show();
//     $('#logoutBtn').show();
//     $('#loginBtn').hide();
//     $('#registerBtn').hide();

//     $('#homePage').hide();
//     $('#eventPage').hide();
//     $('#viewUserForm').hide();
//     $('#editForm').hide();
//     $('#loginForm').show();
//     $('#registerForm').hide();
//   });
//   $('#logoutBtn').click(function(){
//     console.log('You are logged out');
//     sessionStorage.clear();
//     console.log(localStorage);
//   });
// });

//Custom backend address for other port (roy)
 let url;

//  $.ajax({
//         url :'http://teamproject/frontEnd/config.json',
//         type :'GET',
//         dataType :'json',
//         success : function(configData){
//             console.log(configData);
//             url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
//         },
//         error:function (){
//             console.log('oops');
//         }
// });

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
                url: backendAddress2 + '/register',
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
                url: backendAddress2 + '/login',
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
                        // roys added session storage bits
                        sessionStorage.setItem('userID', response['_id']);
                        sessionStorage.setItem('userName',response['username']);
                        sessionStorage.setItem('userEmail',response['email']);
                        sessionStorage.setItem('photoUrl',response['photoUrl']);
                        sessionStorage.setItem('password',password);
                        console.log(sessionStorage);
                        $('#viewUserForm').css("display", "block");
                        $('#logOutBtn').css("display", "block");
                        $('#loginForm').css("display", "none");
                        
                        //roys addition end

                    }
                }
            });
        }
    });

    // Bella end

    //Roy start
    
$('#logOutBtn').click(function(){
  console.log('You are logged out');
  sessionStorage.clear();
  $('#viewUserForm').hide();
  $('#loginForm').show();
    }); //end logout function

$('#test').click(function(){
         event.preventDefault();
        console.log('view all fired');
   $.ajax({
  url :`${backendAddress2}/displayUsers`,
  type :'GET',
  dataType :'json',
  success : function(viewUser){
    console.log(viewUser);
    for(let i=0; i<viewUser.length; i++){
      document.getElementById('usersAllDump').innerHTML += `<p>${viewUser[i].username}</p>
                                                            <p>${viewUser[i]._id}</p>`;
   }// for loop
  },//success
  error:function(){
    console.log('error: cannot call api');
  }//error
  }); //ajax
});

$('#checkById').click(function(){
         event.preventDefault();
        console.log('view by id fired');
        let  givenId = sessionStorage['userID']
       $.ajax({
      url :`${backendAddress2}/viewUser/${givenId}`,
      type :'GET',
      dataType :'json',
      success : function(viewUser){
        console.log(viewUser);
        document.getElementById('userDetails').innerHTML = '';
        document.getElementById('profileHeader').innerHTML = '';
        document.getElementById('profileHeader').innerHTML += `<h5>User profile for ${viewUser.username}</h5>
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                            </button>`;
        document.getElementById('userDetails').innerHTML += `<p>${viewUser.email}</p>
                                                        <img src="${viewUser.photoUrl}" class="img-fluid"></img>`;
        $('#editForm').css("display", "block");
      },//success
      error:function(){
        console.log('error: cannot call api');
      }//error
  }); //ajax
});


//update user password check

$('#changeUserPassCheck').click(function(){
  event.preventDefault();
   let  userPassW = $('#idCheckEdit').val();

   if (userPassW == sessionStorage['password']){
    $('#hiddenEditForm').css("display", "block");
    $('#passwordCheckForm').css("display", "none");
   } else {
    alert('incorrect password');
   }

});


// update user (Edit User Form) - profile page
$('#changeUserBtn').click(function(){
  event.preventDefault();

  let  userID = sessionStorage['userID'];
  let  username = $('#usernameEdit').val();
  let  email = $('#userEmailEdit').val();
  let  password = $('#userPasswordEdit').val();
  let  userImg = $('#userImgEdit').val();

  console.log(userID, username, email, password, userImg);

        if (username == ''){
        username = sessionStorage['userName']
    };
        if (email == ''){
        email = sessionStorage['userEmail']
    };
        if (password == ''){
        password = sessionStorage['password']
    };
        if (userImg == ''){
        userImg = sessionStorage['photoUrl']
    };

  $.ajax({
    url :`${backendAddress2}/updateUser/${userID}`,
    type :'PATCH',
    data:{
      username : username,
      email : email,
      password : password,
      photoUrl : userImg
      },
    success : function(data){
      console.log(data);
      alert('your profile has been updated!');
      document.getElementById('userChangedDump').innerHTML += `<p>details changed</p>`;
    },//success
    error:function(){
      console.log('error: cannot call api');
    }//error

    });//ajax
  // } //else
});//update user function for Edit User Form

//     // roy end

//--------------------------LANDING PAGE JS LOGIC (Vale)-------------------------------------//
$()



});