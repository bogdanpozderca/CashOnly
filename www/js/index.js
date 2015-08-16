/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

Parse.initialize("79WMBmLHWvbRJPpomUQHACaGQCJhHfqxfrTSIYUH", "dsUYSxbSyxHf1aQwQm9MaGFQBZHxB8ANOVmNbG6F");

$( document ).ready(function() {

	var currentUser = Parse.User.current();
	var refreshIntervalID = null;

	if (currentUser) {
    	$('#home').css('display','none');
    	$('#logged-in').fadeIn('slow'); $('#login').fadeOut('slow');
        $('#logged-in').css('display', 'flex')
    	refreshIntervalID = setInterval(updateUserLocation, 10000);
	}

    $("#signup-form").submit(function() {
        var user = new Parse.User();
        user.set("username", $('#user').val());
        user.set("password", $('#password').val());
        user.set("email", $('#email').val());
          
        user.signUp(null, {
          success: function(user) {
            console.log("User signed up:"+user);
            refreshIntervalID = setInterval(updateUserLocation, 10000);
          }
        });   

        return false; // avoid to execute the actual submit of the form.
    });

    $("#login-form").submit(function(e) {      
        e.preventDefault();
        Parse.User.logIn($('#username').val(), $('#pass').val(), {
          success: function(user) {
            console.log("User logged in:"+user);
            $('#logged-in').fadeIn('slow'); $('#login').fadeOut('slow');
            $('#logged-in').css('display', 'flex')

            refreshIntervalID = setInterval(updateUserLocation, 10000);
          }
        });   
    });

    $('#request-cash').click(function(){
        $('#cash-request-page').fadeIn('slow'); 
        $('#logged-in').fadeOut('slow');
        $('#cash-request-page').css('display', 'flex');
    });

    $("#stop-location-tracking").click(function(e) {
    	alert("User stopped location tracking");
    	clearInterval(refreshIntervalID);
    });

    function updateUserLocation() {
		Parse.GeoPoint.current({
		    success: function (point) {
		        //use current location
		        console.log("Point found:"+point);
		        currentUser = Parse.User.current();
		        if (currentUser) {
			        currentUser.set("location", point);
			        currentUser.save(null, {
			    		success:function(object) {
			      			console.log("Saved the location to the user object!");
			    		}, 
			    		error:function(object,error) {
			      			console.dir(error);
			    		}
			  		});
		    	} else {
		    		console.log("There is no user logged in, so the location was not saved");
		    	}
		    },
		    error: function (error) {
		    	console.dir("Error:"+error);
		    }
		});
	}
    
    $("#logout").click(function(){
        Parse.User.logOut();
        $('#logged-in').fadeOut('slow'); $('#home').fadeIn('slow');
        clearInterval(refreshIntervalID);
    });

    $(function() {
        var Accordion = function(el, multiple) {
            this.el = el || {};
            this.multiple = multiple || false;

            // Variables privadas
            var links = this.el.find('.link');
            // Evento
            links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
        }

        Accordion.prototype.dropdown = function(e) {
            var $el = e.data.el;
                $this = $(this),
                $next = $this.next();

            $next.slideToggle();
            $this.parent().toggleClass('open');

            if (!e.data.multiple) {
                $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
            };
        }   

        var accordion = new Accordion($('#accordion'), false);
    });    

    $('.text-box').keydown(function(){
        $(".request").fadeIn('slow');
    })

    $(".request").click(function(){
        $('.init-request').html('Request Received');
        $('.init-request').css('background-color', 'red');

        setTimeout(function(){
            $('.init-request').fadeOut('slow', function(){
                $('.init-request').html('Request Cash');
                $('.init-request').css('background-color', '#602F89');
                $('.init-request').fadeIn('slow');
            });
            
        }, 3000);
        
        $('#logged-in').fadeIn('slow'); $('#cash-request-page').fadeOut('slow');
    })


});



// var app = {
//     // Application Constructor
//     initialize: function() {
//         this.bindEvents();
//     },
//     // Bind Event Listeners
//     //
//     // Bind any events that are required on startup. Common events are:
//     // 'load', 'deviceready', 'offline', and 'online'.
//     bindEvents: function() {
//         document.addEventListener('deviceready', this.onDeviceReady, false);
//     },
//     // deviceready Event Handler
//     //
//     // The scope of 'this' is the event. In order to call the 'receivedEvent'
//     // function, we must explicitly call 'app.receivedEvent(...);'
//     onDeviceReady: function() {
//         app.receivedEvent('deviceready');
//     Parse.initialize("79WMBmLHWvbRJPpomUQHACaGQCJhHfqxfrTSIYUH", "dsUYSxbSyxHf1aQwQm9MaGFQBZHxB8ANOVmNbG6F");

//     var user = new Parse.User();
//     user.set("username", "bogdanfromphone");
//     user.set("password", "mypass");
//     user.set("email", "bogdanpozdersca@gmail.com");
      
//     user.signUp(null, {
//       success: function(user) {
//         alert("yessss");
//       },
//       error: function(user, error) {
//         // Show the error message somewhere and let the user try again.
//         alert("Error: " + error.code + " " + error.message);
//       }
//     });   

//     },
//     // Update DOM on a Received Event
//     receivedEvent: function(id) {
//         var parentElement = document.getElementById(id);
//         var listeningElement = parentElement.querySelector('.listening');
//         var receivedElement = parentElement.querySelector('.received');

//         listeningElement.setAttribute('style', 'display:none;');
//         receivedElement.setAttribute('style', 'display:block;');

//         console.log('Received Events: ' + id);
//     }
// };
