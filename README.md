Fbpagestarter is front-end starter kit that makes it easy to create a page tab on Facebook, created and maintained by [Tachun Lin](https://twitter.com/creed88)

##  Demo & Documentation

[https://www.facebook.com/PageStartKit/app_263301367106483](https://www.facebook.com/PageStartKit/app_263301367106483)

##  Features

- Loading and initialization Facebook's JS SDK
- Facebook login (permissions)
- Dialogs (add page tab, Feed, OAuth, Requests, Send)
- Canvas Methods (setSize, setAutoGrow, scrollTo)
- 810px Grid system

##  GETTING STARTED

[Download the latest release](https://github.com/tachun/fbpagestarter/archive/master.zip)

###  Include fbpagestarter plugin

####  Include fbpagestarter plugin after you've included jQuery.

    <script src="PATH/TO/jquery.fbpagestarter.min.js"></script>

####  Basic Usage

    $(function(){
      $(document).fbStarter({
        appId     : 'YOUR APP ID',
        pageId    : 'YOUR PAGE ID',
        canvasUrl : '//YOUR_CANVAS_URL'
      });
    });

####  Advance Usage

    $(function(){
      $(document).fbStarter({
        appId              : 'YOUR APP ID',
        pageId             : 'YOUR PAGE ID',
        locales            : 'fr_FR',  //Your locale, default is en_US
        canvasUrl          : '//YOUR_CANVAS_URL',  //ex: '//blabla.com/'
        dialogSuccess      : function(){
          //Custome callback function for dialog submit success
          console.log('dialog success');
        },
        dialogFail         : function(){  
          //Custome callback function when user close dialog without submit
          console.log('dialog canceled');
        },
        permissionsSuccess : function(){
          //Custome callback function for authentication success
          FB.api('/me', function(response) {
            //Fetch user data
            var userName =  response.name,
                userID =  response.id,
                userBirthday =  response.birthday,
                userLocale =  response.locale,
                userEmail =  response.email,
                userLink =  response.link,
                userPicture = 
                '<img src="//graph.facebook.com/'+response.username+'/picture">',
                userData = userName + userID + userBirthday + userLocale + userEmail
                           + userLink + userPicture;
            console.log(userData);
          });
        }
      });
    });


###  Grid system

####  Include 810pxGrid.css into your project

    <link rel="stylesheet" type="text/css" href="PATH/TO/810pxGrid.css">

####  Add a class "page-container" to your application main wrapper

    <div id="application" class="page-container"></div>


####  Play with class "row" and "col1" ~ "col12"

    // Basic 2 column layout

    <div id="application" class="page-container"></div>
      <div class="row">
        <div class="col6"></div>
        <div class="col6"></div>
      </div>
    </div>


    // Basic 3 column layout

    <div id="application" class="page-container"></div>
      <div class="row">
        <div class="col4"></div>
        <div class="col4"></div>
        <div class="col4"></div>
      </div>
    </div>


    // Nested column layout

    <div id="application" class="page-container"></div>
      <div class="row">
        <div class="col6">
          <div class="col6"></div>
          <div class="col6"></div>
        </div>
        <div class="col6">
          <div class="col6"></div>
          <div class="col6"></div>
        </div>
      </div>
    </div>


##  PSD Template

Yes! There is a .psd template with facebook layout for design, you can find it in my [810pxGrid Project](https://github.com/tachun/810pxGrid/archive/master.zip)


##  Browser Compatibility

Chrome, Firefox 3.5+, Safari 4+, IE7+, Opera 9+

##  MIT License:

MIT license:
http://www.opensource.org/licenses/mit-license.php
