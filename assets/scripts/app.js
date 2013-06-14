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
        //$('#user-info').append('<img src="//graph.facebook.com/'+ response.name + '/picture?width=200&height=200">');
      });
    }
  });
});