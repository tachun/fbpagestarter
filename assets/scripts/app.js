// Facebook js functions
$(function(){
  $app_id = '263301367106483';
  $canvas_url= '//demo.fbdoctor.com/fbpagestarter/';

  $(document).fbStarter($app_id,{
    locales    : 'fr_FR',
    channelUrl : $canvas_url + 'channel.html'
  });
});