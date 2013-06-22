Fbpagestarter is front-end starter kit that makes it easy to create a page tab on Facebook.

##  Demo & Documentation

[https://www.facebook.com/PageStartKit/app_263301367106483](https://www.facebook.com/PageStartKit/app_263301367106483)

##  Features

- Loading and initialization Facebook's JS SDK
- Facebook login (permissions)
- Dialogs (add page tab, Feed, OAuth, Requests, Send)
- Canvas Methods (setSize, setAutoGrow, scrollTo)
- 810px Grid system

##  How it works?

###  Add a class "page-container" to your application main wrapper

    <div id="application" class="page-container"></div>


###  Play with class "row" and "col1" ~ "col12"

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


##  Browser Compatibility

Chrome, Firefox 3.5+, Safari 4+, IE7+, Opera 9+



## 810 Timeline Grid is licensed under MIT license:

MIT license:
http://www.opensource.org/licenses/mit-license.php
