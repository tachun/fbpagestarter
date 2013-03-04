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
      js.src = "http://connect.facebook.net/" + settings.locales + "/all.js";
      console.log(js.src);
      document.getElementsByTagName('head')[0].appendChild(js);
    }
  };
})( jQuery );