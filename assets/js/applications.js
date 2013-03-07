// Facebook js functions
$(function(){
  $app_id = '263301367106483',
  $project_url= '//demo.fbdoctor.com/fbpagestarter/'

  $(document).fb($app_id,
  {
    locales    : 'fr_FR',
    channelUrl : $project_url + 'channel.html'
  });

  $('#socialPlugins h3').on('click', function(e) {
    $(this).parent().find('div').toggle();
  });

});