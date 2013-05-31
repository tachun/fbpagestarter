// Facebook js functions
$(function(){
  $(document).fbStarter({
    appId            : '263301367106483',
    pageId           : '109403935810224',
    locales          : 'fr_FR',
    canvasUrl       : '//demo.fbdoctor.com/fbpagestarter/',
    callbackFunction : function(){ console.log('in'); }
  });
});