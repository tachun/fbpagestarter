(function( $ ) {
  var addToPage;
  
  $color = '#333';
  $.fn.greenify = function() {
    this.css( "color", $color );
    //return this; // without this we can't chain methods
    return this.each(function() {
      // Do something to each element here.
      $('.features li').on('click', function(e) {
        e.preventDefault();
        console.log('coucou');
      });
    });
  }
  $( "a" ).greenify().addClass( "greenified" );


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
          description: $(this).data('desc')
      };
      FB.ui(obj);
    });

    // Ask Permissions
    $('.jsAskPermissions').on('click', function(e) {
      e.preventDefault();
      Facebook.require_permissions('email,user_birthday,publish_actions', function() {
        //window.location.href = routes.templateUrl('participer');
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

