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
//   $('#event-page-000000000000000000000000').hide();
//   $('#event-page-000000000000000000000001').hide();
//   $('#event-page-000000000000000000000002').hide();
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
    $('#homePage').show();
    $('#event-page-000000000000000000000000').hide();
    $('#event-page-000000000000000000000001').hide();
    $('#event-page-000000000000000000000002').hide();

    // Function for when the register form is submitted
    $('#registerForm').on('submit', function (e) {
        // Prevent modal from closing
        e.preventDefault();
        
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

                        // Store API response in session storage
                        sessionStorage.setItem('userID', response['_id']);
                        sessionStorage.setItem('userName', response['username']);
                        sessionStorage.setItem('userEmail', response['email']);
                        sessionStorage.setItem('photoUrl', response['photoUrl']);

                        // Update page to be logged in
                        showHideLoggedInThings();

                        // Hide modal
                        $('#registerDump').modal('hide');
                    }
                }
            });
        }
    });

    // Function for when the login form is submitted
  $('#loginForm').on('submit', function (e) {
    // Stop modal from closing
    e.preventDefault();

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

            // Store API response in session storage
            // roys added session storage bits
            sessionStorage.setItem('userID', response['_id']);
            sessionStorage.setItem('userName', response['username']);
            sessionStorage.setItem('userEmail', response['email']);
            sessionStorage.setItem('photoUrl', response['photoUrl']);
            // end roy

            // Update page to be logged in
            showHideLoggedInThings();

            // Hide modal
            $('#loginDump').modal('hide');
          }
        }
      });
    }
  });

    // Bella end

    //Roy start

    // function to display log in inputs

    
  $('#logOutBtn').click(function () {
    // Empty out sessionStorage
    sessionStorage.clear();

    // Update page to be logged in
    showHideLoggedInThings();
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
  // Get posts for conference pages
  getPostsForConference('000000000000000000000000');
  getPostsForConference('000000000000000000000001');
  getPostsForConference('000000000000000000000002');

  

  // Click home button in nav
  $('#nav-home-btn').click(function() {
    $('#homePage').show();
    $('#event-page-000000000000000000000000').hide();
    $('#event-page-000000000000000000000001').hide();
    $('#event-page-000000000000000000000002').hide();
  });

  // Click home button in footer
  $('#footer-home-btn').click(function() {
    $('#homePage').show();
    $('#event-page-000000000000000000000000').hide();
    $('#event-page-000000000000000000000001').hide();
    $('#event-page-000000000000000000000002').hide();
  });

  // Click First event card (on home page)
  $('[data-event-card-event-id="000000000000000000000000"]').click(function() {
    $('#homePage').hide();
    $('#event-page-000000000000000000000000').show();
    $('#event-page-000000000000000000000001').hide();
    $('#event-page-000000000000000000000002').hide();
  });

  // Click Second event card (on home page)
  $('[data-event-card-event-id="000000000000000000000001"]').click(function() {
    $('#homePage').hide();
    $('#event-page-000000000000000000000000').hide();
    $('#event-page-000000000000000000000001').show();
    $('#event-page-000000000000000000000002').hide();
  });

  // Click Third event card (on home page)
  $('[data-event-card-event-id="000000000000000000000002"]').click(function() {
    $('#homePage').hide();
    $('#event-page-000000000000000000000000').hide();
    $('#event-page-000000000000000000000001').hide();
    $('#event-page-000000000000000000000002').show();
  });

  // Ensure page is in the right state
  showHideLoggedInThings();
});

function getPostsForConference(conferenceId) {
  $.ajax({
    url: backendAddress2 + '/allPost/' + conferenceId,
    method: 'GET',
    success(eventPosts) {
      for(var i=0; i<eventPosts.length; i++) {
        let post = eventPosts[i];
        // Create a container div for posts to go into (no content yet)
        $('#postContainer-' + conferenceId).prepend(`<div class="row row-qa" data-post-id="${post._id}"></div>`);

        // Wait for the browser to update with the post container
        setTimeout(() => {
          // Create the actual post content
          createPostElement(post);
        });
      }
    },
  });

  // Handle submission for each create post form
  $('#post-form-' + conferenceId).on('submit', function(e) {
    e.preventDefault();

    var postContents = $('#post-contents-' + conferenceId).val();

    if (postContents) {
      $.ajax({
        url: backendAddress2 + '/writePost',
        method: 'POST',
        data: {
          "userId": sessionStorage['userID'],
          "conferenceId": conferenceId,
          "text": postContents,
          // "imageUrl": "https://srilavan007.files.wordpress.com/2017/04/hosue.jpg"
        },
        success(newPost) {
          // Create a container div for posts to go into (no content yet)
          $('#postContainer-' + conferenceId).prepend(`<div class="row row-qa" data-post-id="${newPost._id}"></div>`);

          // Wait for the browser to update with the post container
          setTimeout(() => {
            // Create the actual post content
            createPostElement(newPost);
          });

          // Empty out text area
          $('#post-contents-' + conferenceId).val('');
        }
      })
    }
  });
}

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
      // TODO if user has no image, need to show a default
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



  // Draw any feather icons
  feather.replace();

  // Ensure stuff is shown/hidden based on whether the user is logged in
    showHideLoggedInThings();
}

// Show and hide parts of the website based on whether the user is logged in
function showHideLoggedInThings() {
  // Whether the user is currently logged in
  var loggedIn = sessionStorage['userID'] !== undefined;
  // Whether the user is current logged out
  var loggedOut = !loggedIn;

  // Welcome message is a special case
  if (loggedIn) {
    // Show welcome message if logged in
    $('#welcomeMessage').toggleClass('d-none', false);
    // Update the contents of the welcome message
    $('#welcomeMessage').text(`Hi, ${sessionStorage['userName']}!`);
  } else {
    // Hide welcome message if user is logged out
    $('#welcomeMessage').toggleClass('d-none', true);
  }

  // Stuff only visible when logged out
  // Log in button
  $('#registerBtn').toggleClass('d-none', loggedIn);
  // Register button
  $('#loginBtn').toggleClass('d-none', loggedIn);
  // "Logged out" Q/A stuff
  $('.qa-logged-out').toggleClass('d-none', loggedIn);

  // Stuff only visible when logged in
  // Profile element
  $('#checkById').toggleClass('d-none', loggedOut);
  // Logout button
  $('#logOutBtn').toggleClass('d-none', loggedOut);
  // "Logged in" Q/A stuff
  $('.qa-logged-in').toggleClass('d-none', loggedOut);
  // "Edit post" controls
  $('.edit-post').toggleClass('d-none', loggedOut);
  // "Delete post" controls
  $('.delete-post').toggleClass('d-none', loggedOut);
}
// Bella end
