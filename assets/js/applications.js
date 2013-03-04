// Facebook js functions
$(function(){
  $(document).fb('210182459022466',{
    locales    : 'fr_FR',
    channelUrl : 'http://demo.fbdoctor.com/demo_project/channel.html'
  });


  fbShare();
  fbPermissions();
  $('#socialPlugins h3').on('click', function(e) {
    $(this).parent().find('div').toggle();
  });
});




function fbShare() {
  $('.share').on('click', function(e) {
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
  // Reference: http://developers.facebook.com/docs/reference/javascript/FB.login/
  var fbElmemt = $('.fbPermissions'),
      permissions = fbElmemt.data('permissions')

  fbElmemt.on('click', function(e) {
    e.preventDefault();
    FB.login(function(response) {
      if (response.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
          console.log('Good to see you, ' + response.name + '.');
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {scope: permissions });

  });
}