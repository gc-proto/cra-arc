/**
 * @title WET-BOEW Input range plugin
 * @overview Plugin to display current value on an input of type range
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 */
( function ( $, window, wb ) {
    "use strict";
    /*
     * Variable and function definitions.
     * These are global to the plugin - meaning that they will be initialized once per page,
     * not once per instance of plugin on the page. So, this is a good place to define
     * variables that are common to all instances of the plugin on a page.
     */
    var componentName = "wb-input-range",
        selector = "." + componentName,
        tooltipName = componentName + "-tooltip", 
        initEvent = "wb-init" + selector,
        $document = wb.doc,
        defaults = {},
        /**
         * @method init
         * @param {jQuery Event} event Event that triggered the function call
         */
        init = function( event ) {
          // Start initialization
          // returns DOM object = proceed with init
          // returns undefined = do not proceed with init (e.g., already initialized)
          var elm = wb.init( event, componentName, selector ),
              $elm,
              settings;

            if ( elm ) {
                $elm = $( elm );
                // ... Do the plugin initialisation
                // Get the plugin JSON configuration set on attribute data-wb-input-range
                settings = $.extend(
                    true,
                    {},
                    defaults,
                    window[componentName],
                    wb.getData( $elm, componentName )
                );

                // Call my custom event
                $elm.trigger( "wb-input-range", settings );
                // Identify that initialization has completed
                wb.ready( $elm, componentName );
            }
        }, 
        getFuncValue = function( funcName, inputParam ) {
            let funcArr, fnElem;

            if ( funcName.includes( "." ) === true ) {
                funcArr = funcName.split( "." );
                fnElem = {};
                for ( let i = 0; i <= funcArr.length - 1; i = i + 1 ) {
                    if ( i === 0 ) {
                        fnElem = funcArr[ i ];
                    } else if ( i === funcArr.length - 1 && typeof window [ fnElem ] !== "undefined" && funcArr[ i ] in window[ fnElem ] && typeof window [ fnElem ][ funcArr [ i ] ] === "function" ) {
                        return window [ fnElem ][ funcArr [ i ] ] ( inputParam );
                    } else if ( typeof window [ fnElem ] !== "undefined" && funcArr[ i ] in window[ fnElem ] === true ) {
                        fnElem = fnElem[ funcArr[ i ] ];
                    }
                }
            } else if ( typeof window[ funcName ] === "function" ) {
                return window[ funcName ]( inputParam );
            }
            return inputParam;
        }, 
        updateTooltipPos = function ( inputRangeElm, displayElm, groupElm ) {
            const thumbWidth = 14; 
            const sideOffset = 4;
            let tooltipPos, 
                inputRangeElmWidth = inputRangeElm.getBoundingClientRect().width, 
                displayElmWidth = displayElm.getBoundingClientRect().width;

                if ( displayElm.classList.contains( tooltipName ) ) {
                    tooltipPos = ( ( ( inputRangeElm.valueAsNumber - Number( inputRangeElm.min ) ) / ( Number( inputRangeElm.max ) - Number( inputRangeElm.min ) ) ) * ( ( inputRangeElm.getBoundingClientRect().width - ( thumbWidth / 2 ) ) - ( thumbWidth / 2 ) ) );

                groupElm.style.setProperty( "--tooltipArrow", "solid" );
                tooltipPos = tooltipPos + ( thumbWidth / 2 ) - ( displayElmWidth / 2 );
                if ( tooltipPos < 0 && tooltipPos + displayElmWidth > inputRangeElmWidth ) {
                    // if tooltip is larger then slider track then center over slider track
                    tooltipPos = ( inputRangeElmWidth / 2 ) - ( displayElmWidth / 2 );
                    groupElm.style.setProperty( "--tooltipArrow", "none" );
                } else if ( tooltipPos <= 0 || inputRangeElmWidth === 0 ) {
                    tooltipPos = -sideOffset;
                    groupElm.style.setProperty( "--tooltipArrow", "none" );
                } else if ( tooltipPos + displayElmWidth > inputRangeElmWidth ) {
                    tooltipPos = inputRangeElmWidth - displayElmWidth + sideOffset;
                    groupElm.style.setProperty( "--tooltipArrow", "none" );
                }
                displayElm.style.setProperty( "--HTooltipPos", tooltipPos + "px" );
            }
        }, 
        updateValElm = function ( inputRangeElm, displayElm, groupElm ) {
            let displayText, outputData;

            if ( displayElm !== null ) {
                outputData = wb.getData( displayElm, "wb-input-range" );
                if ( typeof outputData !== "undefined" && Object.prototype.hasOwnProperty.call( outputData, "fn" ) === true ) {
                    displayText = getFuncValue( outputData.fn, inputRangeElm.value );
                } else {
                    displayText = inputRangeElm.value;
                }
                if ( displayElm.tagName === "INPUT" || displayElm.tagName === "TEXTAREA" ) {
                    displayElm.value = displayText;
                } else {
                    displayElm.innerHTML = displayText;
                    updateTooltipPos( inputRangeElm, displayElm, groupElm );
                    window.onresize = function () {
                        updateTooltipPos( inputRangeElm, displayElm, groupElm );
                    };
                }
            }
        }, 
        setRangeValue = function( inputRange ) {
            let groupElm = document.getElementById( inputRange.parentId ), 
                targetArr = wb.getData( inputRange, "wb-input-range" );

            if ( typeof targetArr !== "undefined" && Object.prototype.hasOwnProperty.call( targetArr, "target" ) === true ) {
                targetArr.target.forEach( function( currentId ) {
                    updateValElm( inputRange, document.getElementById( currentId ), groupElm );
                }, inputRange, groupElm );
            }
        }, 
        updateRangeFromField = function( elm ) {
            let adjustedInputVal, outputData,
                rangeElm = document.getElementById( elm.rangeId );

            outputData = wb.getData( elm, "wb-input-range" );
            if ( typeof outputData !== "undefined" && Object.prototype.hasOwnProperty.call( outputData, "fn" ) === true ) {
                adjustedInputVal = getFuncValue( outputData.fn, parseInt( $( elm ).val(), 10 ) );
            } else {
                adjustedInputVal = parseInt( $( elm ).val(), 10 ) || parseInt( elm.min, 10 );
            }
            if ( adjustedInputVal < parseInt( elm.min, 10 ) ) {
                $( rangeElm ).val( parseInt( elm.min, 10 ) );
            } else if ( adjustedInputVal > parseInt( elm.max, 10 ) ) {
                $( rangeElm ).val( parseInt( elm.max, 10 ) );
            } else {
                $( rangeElm ).val( Math.round( adjustedInputVal / parseInt( elm.step, 10 ) ) * parseInt( elm.step, 10 ) );
            }
        };

    // Add your plugin event handler
    $document.on( "wb-input-range", selector, function( event, data ) {
        var targetArr, 
            groupElm = event.currentTarget, 
            $rangeElm = $( groupElm ).find( "input[type=range]" ), 
            rangeElm = $rangeElm[ 0 ];

        rangeElm.params = [ ];
        rangeElm.params = data.target;
        if ( !groupElm.hasAttribute( "id" ) ) {
            groupElm.id = wb.getId();
        }
        rangeElm.parentId = groupElm.id;
        setRangeValue( rangeElm );
        targetArr = wb.getData( rangeElm, "wb-input-range" );
        if ( typeof targetArr !== "undefined" && Object.prototype.hasOwnProperty.call( targetArr, "target" ) === true ) {
            targetArr.target.forEach( function ( currentId ) {
                let displayElm = document.getElementById( currentId );

                if ( displayElm !== null && ( displayElm.tagName === "INPUT" || displayElm.tagName === "TEXTAREA" ) ) {
                    if ( !displayElm.hasAttribute( "id" ) ) {
                        rangeElm.id = wb.getId();
                    }
                    displayElm.rangeId = rangeElm.id;

                    $( displayElm ).on( "change input", function() {
                        let newTargetArr = targetArr.target.slice();

                        updateRangeFromField( this );
                        for ( let i = 0; i <= newTargetArr.length - 1; i = i + 1 ) {
                            if ( document.getElementById( newTargetArr[i] ).tagName !== "INPUT" && document.getElementById( newTargetArr[i] ).tagName !== "TEXTAREA" ) {
                                updateValElm( rangeElm, document.getElementById( newTargetArr[i] ), document.getElementById( rangeElm.parentId ) );                   
                            }
                        }
                    } );
                }
            }, rangeElm, targetArr );
        }
    } );

    $( ".wb-input-range" ).on( "change input", "input[type=range]", function() {
        setRangeValue( this );
    } );
    
    // disable mouse wheel scroll of slider which only occurs in some browsers
    $( ".wb-input-range" ).on( "wheel", "input[type=range]", function( event ) {
        window.scrollTo( window.scrollX, window.scrollY + event.originalEvent.deltaY );
        event.preventDefault();
        event.stopPropagation();
    } );

    $document.on( "update" + selector, function( event ) {
        setRangeValue( event.target );
    } );
    // Bind the init event of the plugin
    $document.on( "timerpoke.wb " + initEvent, selector, init );
    // Add the timer poke to initialize the plugin
    wb.add( selector );
} )( jQuery, window, wb );
