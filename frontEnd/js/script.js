
console.log('howdy');

// ICONS

feather.replace();

// Make sure this matches your backend address
var backendAddress = 'http://localhost:3000';
var backendAddress2 = 'http://localhost:5000';

// A fake conference id for all conferences and comments to use
//  while we figure out how pages will work
var FAKE_CONFERENCE_ID = '1e9627ee2d5f5ba2841d1623';

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
 // let url;

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
    // $('#loginForm').on('submit', function () {
      $('#loginBtn2').click(function(){
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
                        document.getElementById('checkById').innerHTML += `<p class="nav-text_top">Hi ${response.username}</p>`;
                        $('#checkById').css("display", "block");
                        $('#logOutBtn').css("display", "block");
                        $('#usernameInput').css("display", "none");
                        $('#passwordInput').css("display", "none");
                        $('#loginBtn2').css("display", "none");
                        $('#loginBtn').hide();
                        $('#loginDump').modal('hide');
                        $('#registerBtn').hide();
                      
                        //roys addition end

                    }
                }
            });
        }
    });

    // Bella end

    //Roy start

    // function to display log in inputs

    
$('#logOutBtn').click(function(){
  console.log('You are logged out');
  sessionStorage.clear();
  $('#checkById').hide();
  $('#registerBtn').show();
  $('#loginBtn').show();
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
        document.getElementById('userChangedDump').innerHTML += ``;
        document.getElementById('userDetails').innerHTML = '';
        document.getElementById('profileHeader').innerHTML = '';
        document.getElementById('userDetails').innerHTML += `<img src="${viewUser.photoUrl}" class="mx-auto d-block avatar-img"></img>
                                                        <p class="text-center">${viewUser.username}</p>
                                                        <p class="text-center">${viewUser.email}</p>`;
        
        $('#editForm').css("display", "block");
      },//success
      error:function(){
        console.log('error: cannot call api');
      }//error
  }); //ajax
});

$('#editUserBtn1').click(function(){
  $('#passwordCheckForm').show();
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
      document.getElementById('userChangedDump').innerHTML += `<p>Details updated!</p>`;
      $('#hiddenEditForm').css("display", "none");
    },//success
    error:function(){
      console.log('error: cannot call api');
    }//error

    });//ajax
  // } //else
});//update user function for Edit User Form

//     // roy end

  // Bella start
  $.ajax({
    url: backendAddress2 + '/allPost/' + FAKE_CONFERENCE_ID,
    method: 'GET',
    success(eventPosts) {
      console.log("All posts", eventPosts)
      for(var i=0; i<eventPosts.length; i++) {
        let post = eventPosts[i];
        // Create a container div for posts to go into (no content yet)
        $('#postContainer').append(`<div class="row row-qa" data-post-id="${post._id}"></div>`);

        // Wait for the browser to update with the post container
        setTimeout(() => {
          // Create the actual post content
          createPostElement(post);
        });
      }
    },
  });
});

// Create a post element inside a post container
// This sets up click events for the edit and delete buttons, etc.
function createPostElement(post) {
  // Find the post container element 
  var postContainer = $(`[data-post-id="${post._id}"]`);

  // Set the contents of the post
  postContainer.html(`
      <div class="post-avatar-img" style="background-image: url(${post.userImage});"></div>
      <div class="col-10 container-qa row">
        <div class="col-11"><p class="#">${post.text}</p></div>
        <div class="col-1 text">
          <i class="icon-event edit-post" data-feather="edit-2"></i>
          <i class="icon-event delete-post" data-feather="trash"></i>
        </div>
      </div>
    `);


  // Wait for the browser to update with the changes from above
  setTimeout(() => {
    // EDIT
    // Click handler for edit button FOR THIS SPECIFIC POST
    postContainer.find('.edit-post').click(function () {
      // Replace post with a text area
      postContainer.html(`
        <div class="post-avatar-img" style="background-image: url(${post.userImage});"></div>
        <div class="col-10 ml-4">
          <textarea class="form-control post-text-area">${post.text}</textarea>
          <button type="button" class="btn btn-buyTicket save-editing-button">Save</button>
          <button type="button" class="btn btn-buyTicket cancel-editing-button">Cancel</button>
        </div>
      `);

      // Wait for the browser to update with the changes to the post
      setTimeout(() => {
        // SAVE
        // Click handler for "save" button 
        postContainer.find('.save-editing-button').click(function () {
          let newPostText = postContainer.find('.post-text-area').val();

          post.text = newPostText;
          $.ajax({
            url: backendAddress2 + '/updatePost/' + post._id,
            method: 'PATCH',
            data: post,
            success(updatedPost) {
              // Recreate this post using the updated post object from the backend
              createPostElement(updatedPost);
            },
          });
        });

        // CANCEL
        // Click handler for "cancel" button
        postContainer.find('.cancel-editing-button').click(function () {
          createPostElement(post);
        });
      });
    });

    // DELETE
    // Click handler for delete button FOR THIS SPECIFIC POST
    postContainer.find('.delete-post').click(function() {
      if (confirm("Are you sure you wish to delete this post?")) {
        $.ajax({
          url: backendAddress2 + '/deletePost/' + post._id,
          method: 'DELETE', 
          success(response) {
            if (response === 'Post deleted') {
              postContainer.remove();
            }
          },
        });
      }
    });
  });

  feather.replace();
}
// Bella end
