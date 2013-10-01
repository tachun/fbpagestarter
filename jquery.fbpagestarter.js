/*
* @fileOverview Fbpagestarter - jQuery Plugin
* @version 0.1.2
*
* @author Tachun LIN http://www.github.com/tachun
* @see https://github.com/tachun/fbpagestarter
*
* Copyright (c) 2013 Tachun Lin
* Licensed under the MIT license.
*
*
* Changelog
* $Date: 2013-10-1 (Tue, 01 Oct 2013) $
* $version: 0.1.2
*/

(function($) {
  "use strict";
  $.fn.fbStarter = function(options) {
    var settings = $.extend({
        appId                : '',
        pageId               : '',
        status               : true,
        cookie               : true,
        xfbml                : true,
        locales              : 'en_US',
        canvasUrl            : '',
        frictionlessRequests : true, //enable users to send Requests to specific friends
        autoResize           : true,
        activeFangate        : false,
        likedPage            : 'like-wrapper',
        unlikePage           : 'unlike-wrapper',
        permissionsSuccess   : function(){},
        permissionsFail      : function(){},
        dialogSuccess        : function(){},
        dialogFail           : function(){}
    }, options);

    // FB initiation
    // -------------------------------------------------------------------
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

      // Auto resize canavs
      if(settings.autoResize === true){
        FB.Canvas.setDoneLoading( function() {
          // a trick for 'shrink' page height
          FB.Canvas.setSize({height:600});
          setTimeout(function () {
            FB.Canvas.setAutoGrow();
          }, 300);
        });
      }

      // Fan gate, Check like page status
      if(settings.activeFangate){
        FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            var user_id = response.authResponse.userID,
                page_id = settings.pageId,
                fql_query = "SELECT uid FROM page_fan WHERE page_id =" + page_id + " and uid=" + user_id,
                fb_query = FB.Data.query(fql_query);

            fb_query.wait(function(rows) {
              if (rows.length === 1 && rows[0].uid === user_id) {
                /* TODO, add a callback here! */
                $('#'+settings.likedPage).show();
              } else {
                /* TODO, add a callback here! */
                $('#'+settings.unlikePage).show();
              }
            });
          } else {
            $('#'+settings.askPermission).show();
            /* TODO, add a callback here! */
          }
        });
      }
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


    // Main functions
    // -------------------------------------------------------------------
    return this.each( function() {      
      $('.fb-dialog').on('click',function(e){
        e.preventDefault();
        var dialogType = $(this).data('fbactiontype'),
            obj;
        
        switch (dialogType) {
          case 'add_page_tab': 
            installToPage();
          break;

          case 'permissions': 
            var getPermissions = $(this).data('permissions');
            permissions(getPermissions);
          break;
          
          case 'share': 
            obj = {
               method:      'feed',
               link:        $(this).data('link'),
               picture:     $(this).data('picture'),
               title:       $(this).data('title'),
               caption:     $(this).data('caption'),
               description: $(this).data('description')
             };
             callUI(obj);
          break;

          case 'requests':
            obj = {
               method:  'apprequests',
               message: $(this).data('message')
             };
             callUI(obj);
          break;

          case 'send':
            obj = {
              method: 'send',
              name:    $(this).data('name'),
              picture: $(this).data('picture'),
              link:    $(this).data('link')
            };
            callUI(obj);
          break;
        }
      });

      // Add tab to page
      function installToPage(){
        FB.ui({
          method: 'pagetab',
          redirect_uri: settings.canvasUrl + 'install_to_page.html'
        }, function(response) {
          if (response !== null && response.tabs_added !== null) {
            $.each(response.tabs_added, function(pageid) {
              FB.api(pageid, function(response) {
                $('#msg').text('Your tab has already been installed');
              });
            });
          } else {
            $('#msg').text('Action cancelled, unable to install a page');
          }
        });
      }

      // Get permissions
      function permissions(getPermissions){
        FB.login(function(response) {
          if (response.authResponse) {
            if ( $.isFunction( settings.permissionsSuccess ) ) {
              settings.permissionsSuccess.call( this );
            }
          } else {
            if ( $.isFunction( settings.permissionsFail ) ) {
              settings.permissionsFail.call( this );
            }
          }
        }, {scope: getPermissions});
      }

      // Post to timeline
      function callUI(obj){
        FB.ui(obj,function(response) {
          if (response && response.post_id) {
            if ( $.isFunction( settings.dialogSuccess ) ) {
              settings.dialogSuccess.call( this );
            }
          } else {
            if ( $.isFunction( settings.dialogFail ) ) {
              settings.dialogFail.call( this );
            }
          }
        });
      }

      // Canvas scrollTo function
      function scrollto(y, speed){
        FB.Canvas.getPageInfo(function(pageInfo){
          $({y: pageInfo.scrollTop}).animate(
            {y: y},
            {duration: speed, step: function(offset){
              FB.Canvas.scrollTo(0, offset);
            }
          });
        });
      }

      $('.fb-scrollto').on('click',function(e){
        e.preventDefault(e);
        var offset = $(this).data('offset'),
            speed = $(this).data('speed');
        scrollto(offset, speed);
      });

      $.fn.fbStarter.externalScrollto = function(exY, exSpeed) {
        scrollto(exY, exSpeed);
      };

      // Canvas setSize function
      function setsize(newHeight){
        FB.Canvas.setSize({ width: 810, height: newHeight });
      }

      $('.fb-setsize').on('click',function(e){
        e.preventDefault(e);
        var newHeight = $(this).data('height');
            // newWidth  = $(this).data('width');
        setsize(newHeight);
      });

      $.fn.fbStarter.externalSetsize = function(exNewHeight) {
        setsize(exNewHeight);
      };

      // Canvas auto resize
      function autoresize(){
        FB.Canvas.setDoneLoading( function() {
          FB.Canvas.setSize({height:600});
          setTimeout(function () {
            FB.Canvas.setAutoGrow();
          }, 300);
        });
      }

      $('.fb-autoresize').on('click',function(e){
        e.preventDefault(e);
        autoresize();
      });

      $.fn.fbStarter.externalAutoresize = function() {
        autoresize();
      };

    });
  };

})( jQuery );