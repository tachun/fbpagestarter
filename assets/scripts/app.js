// Facebook js functions
$(function(){
  $(document).fbStarter({
    appId              : '263301367106483',
    pageId             : '109403935810224',
    locales            : 'fr_FR',
    canvasUrl          : '//demo.fbdoctor.com/fbpagestarter/',
    dialogSuccess      : function(){
      console.log('dialog success');
    },
    dialogFail      : function(){
      console.log('user close dialog');
    },
    permissionsSuccess : function(){
      FB.api('/me', function(response) {
        console.log('Good to see you, ' + response.name + '.');
      });
    }
  });
  var outpageHeight = $(document).height();
  console.log('outpageHeight:' + outpageHeight)
});