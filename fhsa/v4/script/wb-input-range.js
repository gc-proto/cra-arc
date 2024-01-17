  /**
 * @title WET-BOEW Input range plugin
 * @overview Plugin to display current value on an input of type range 
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 */
(function($, window, wb) {
  "use strict";
  /*
   * Variable and function definitions.
   * These are global to the plugin - meaning that they will be initialized once per page,
   * not once per instance of plugin on the page. So, this is a good place to define
   * variables that are common to all instances of the plugin on a page.
   */
  var componentName = "wb-input-range",
      selector = "." + componentName,
      initEvent = "wb-init" + selector,
      $document = wb.doc,
      defaults = {},
      /**
       * @method init
       * @param {jQuery Event} event Event that triggered the function call
       */
      init = function(event) {
          // Start initialization
          // returns DOM object = proceed with init
          // returns undefined = do not proceed with init (e.g., already initialized)
          var elm = wb.init(event, componentName, selector),
              $elm,
              settings;
            if (elm) {
                $elm = $(elm);
                // ... Do the plugin initialisation
                // Get the plugin JSON configuration set on attribute data-wb-input-range
                settings = $.extend(
                    true,
                    {},
                    defaults,
                    window[componentName],
                    wb.getData($elm, componentName)
                );

                // Call my custom event
                $elm.trigger("wb-input-range", settings);
                // Identify that initialization has completed
                wb.ready($elm, componentName);
            }
      }, 
      doRangeFunc = function(funcName, inputParam) {
          let funcArr, fnElem;

          if ( funcName.includes( "." ) === true ) {
            funcArr = funcName.split( "." );
            fnElem = {};
              for ( let i = 0; i <= funcArr.length - 1; i = i + 1 ) {
                  if ( i === funcArr.length - 1 ) {
                  if (i === 0) {
                      fnElem = funcArr[ i ];
                  } else if ( i === funcArr.length - 1 && typeof window [ fnElem ] !== "undefined" && funcArr[ i ] in window[ fnElem ] && typeof window [ fnElem ][ funcArr [ i ] ] === "function" ) {
                      return window [ fnElem ][ funcArr [ i ] ] ( inputParam );
                  } else if (typeof window [ fnElem ] !== "undefined" && funcArr[ i ] in window[ fnElem ] === true ) {
                      fnElem = fnElem[ funcArr[ i ] ];
                  }
              }
          } else {
              if ( typeof window[ funcName ] === "function" ) {
                  return window[ funcName ]( inputParam );
              }
          }
          return inputParam;
      }, 
      setRangeValue = function( inputRange ) {
          inputRange.idArr.forEach(function ( currentId ) {
              let displayText,
              elm = document.getElementById( currentId );

              if ( Object.prototype.hasOwnProperty.call(inputRange, "outputData") === true ) {
                  displayText = doRangeFunc(inputRange.outputData.fn, inputRange.value);
              } else {
                  displayText = inputRange.value;
              }
              if (elm.tagName === "TEXTAREA" || elm.tagName === "INPUT") {
                  elm.value = displayText;
              } else {
                  elm.innerHTML = displayText;
              }
          }, inputRange);
      };
  // Add your plugin event handler
  $document.on("wb-input-range", selector, function(event, data) {
      var elm = event.currentTarget,
          $inputElm = $( elm ).find( "input[type=range]" ), 
          outputData = wb.getData($( elm ).find( ".wb-input-range-display" ), "wb-input-range"), 
          inputElm = $inputElm[ 0 ];
          if ( outputData ) {
              inputElm.outputData = outputData;
          }
          inputElm.idArr = [ ];
          inputElm.idArr = data.target;
          setRangeValue( inputElm );
  });
  $(".wb-input-range").on("change input", "input[type=range]", function( event, data ) {
      setRangeValue( this );
  });
  // Bind the init event of the plugin
  $document.on("timerpoke.wb " + initEvent, selector, init);
  // Add the timer poke to initialize the plugin
  wb.add(selector);
})(jQuery, window, wb);
