(function( $ ) {
  $.fn.fb = function(appId, options) {

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


    // Install on Page
    $('.jsAddToPage').on('click', function(e) {
      addToPage();
    });

    function addToPage() {
      FB.ui({
        method: 'pagetab',
        redirect_uri: 'http:' + $project_url + 'install_to_page.html'
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
    }

    $('.jsFbShare').on('click', function(e) {
      fbShare();
    });
    
  };
})( jQuery );

function fbShare() {
  $('.jsFbShare').on('click', function(e) {
    e.preventDefault();
    var obj = {
        method: 'feed',
        link: $(this).data('link'),
        picture: $(this).data('pic'),
        name: $(this).data('name'),
        caption: $(this).data('caption'),
        description: $(this).data('desc')
    };
    FB.ui(obj);
  });
}

function fbPermissions() {
  var fbElmemt = $('.fbPermissions'),
      permissions = fbElmemt.data('permissions')

  fbElmemt.on('click', function(e) {
    e.preventDefault();
    FB.login(function(response) {
      if (response.authResponse) {
        console.log('Welcome! Fetching your information.... ');
        FB.api('/me', function(response) {
          console.log('Good to see you, ' + response.name + '.');
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {scope: permissions });

  });
}