(function( $ ) {
  var addToPage;
  
  $.fn.fbStarter= function(appId, options) {
    var settings = $.extend({
        appId      : appId,
        status     : true, 
        cookie     : true,
        xfbml      : true,
        locales    : 'en_US',
        channelUrl : ''
    }, options);

    window.fbInit = window.fbInit || false;
    if (window.fbInit) {
      $(document).trigger('fb:initialized');
      if (settings.xfbml) {
        FB.XFBML.parse();
      }
      return;
    }

    // Aync Init
    window.fbAsyncInit = function() {
      window.fbInit = true;
      $(document).trigger('fb:initializing');
      FB.init(settings);
      $(document).trigger('fb:initialized');
    };

    // Append fb-root
    var fbRoot = 'fb-root';
    if (!document.getElementById(fbRoot)) {
      var element = document.createElement('div');
      element.id = fbRoot;
      document.body.appendChild(element);
    }

    // Add Facebook Javascript SDK
    var js, id = 'facebook-jssdk'; 
    if (!document.getElementById(id)) {
      js = document.createElement('script'); 
      js.id = id; 
      js.async = true;
      js.src = "//connect.facebook.net/" + settings.locales + "/all.js";
      document.getElementsByTagName('head')[0].appendChild(js);
    }

    // -------------------------------------------------------------------
    // Install on Page
    $('.jsAddToPage').on('click', function(e) {
      e.preventDefault();
      FB.ui({
        method: 'pagetab',
        redirect_uri: 'http:' + $canvas_url + 'install_to_page.html'
      }, function(response) {
        if (response != null && response.tabs_added != null) {
          $.each(response.tabs_added, function(pageid) {
            FB.api(pageid, function(response) {
              alert('redirect to ' + response.link);
            });
          });
        } else {
          alert('Unable to install');
        }
      });
    });

    // Post to timeline
    $('.jsFbShare').on('click', function(e) {
      e.preventDefault();
      var obj = {
          method: 'feed',
          link: $(this).data('link'),
          picture: $(this).data('pic'),
          title: $(this).data('title'),
          caption: $(this).data('caption'),
          description: $(this).data('description')
      };
      FB.ui(obj);
    });

    // Ask Permissions
    $('.jsAskPermissions').on('click', function(e) {
      e.preventDefault();
      var permissions = $(this).data('permissions');

      FB.login(function(response) {
         if (response.authResponse) {
           console.log('Welcome!  Fetching your information.... ');
           FB.api('/me', function(response) {
             console.log('Good to see you, ' + response.name + '.');
           });
         } else {
           console.log('User cancelled login or did not fully authorize.');
         }
       }, {scope: permissions});
    });

    $(document).on('load', function(e) {
      console.log('is parent');
      FB.login(function(response) {
        console.log('is fb');
        if (response.session) {
          var user_id = response.session.uid;
          var page_id = "109403935810224"; //coca cola
          var fql_query = "SELECT uid FROM page_fan WHERE page_id = "+page_id+"and uid="+user_id;
          var the_query = FB.Data.query(fql_query);
          the_query.wait(function(rows) {
            if (rows.length == 1 && rows[0].uid == user_id) {
              console.log('is login');
              //here you could also do some ajax and get the content for a "liker" instead of simply showing a hidden div in the page.
            } else {
              console.log('row=0');
              //and here you could get the content for a non liker in ajax...
            }
          });
        } else {
          console.log('not login');
          // user is not logged in
        }
      });
    });

    //  Set page height
    function setFbPageHeight(){
      var heightInterval = setInterval(function(){
        var newHeight = $('body').outerHeight(true);
        FB.Canvas.setSize({ width: 810, height: newHeight });
      }, 1000);
      setTimeout(function(){
        clearInterval(heightInterval);
      },4000);
    }



    
  };
})( jQuery );

