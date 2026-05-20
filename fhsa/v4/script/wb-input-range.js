/**
 * @title WET-BOEW Input range plugin
 * @overview Plugin to display current value on an input of type range
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 */
( function( $, window, wb ) {
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

            if ( elm !== null && typeof elm !== "undefined" ) {
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

                // Recalculate position on window resize
                window.addEventListener( "resize", function() {
                    // Find the range and display elements and refresh positions
                    var range = elm.querySelector( "input[type=range]" );
                    if ( range !== null ) {
                        setRangeValue( range );
                    }
                } );

                // Call my custom event
                $elm.trigger( "wb-input-range", settings );
                // Identify that initialization has completed
                wb.ready( $elm, componentName );
            }
        }, 
        /**
         * Resolves a function string into an executable function from the window scope and returns the execution results with the given parameters.
         * Supports nested functions (e.g., "namespace.subFunction").
         *
         * @param {string} funcNameArr An array of the names of the functions to be executed.
         * @param {*} inputParam The value to be passed to the resolved function.
         * @returns {*} The result of the function execution or the original inputParam if the function execution fails.
         */
        getFuncValue = function( funcNameArr, inputParam ) {
            const calledFunction = funcNameArr.split( "." ).reduce( function( fnElem, fnItem ) {
                if ( fnElem !== null && typeof fnElem !== "undefined" && typeof fnElem[ fnItem ] !== "undefined" ) {
                    return fnElem[ fnItem ];
                } else {
                    return inputParam;
                }
            }, window, inputParam );

            if ( typeof calledFunction === "function" ) {
                return calledFunction( inputParam );
            } else {
                return inputParam;
            }
        }, 
        /**
         * Returns the provided attribute value or a default value if the attribute is empty/invalid.
         *
         * @param {string|number} atr The attribute value.
         * @param {string|number} defaultVal The value to return if the attribute value is empty.
         * @returns {string|number} The attribute value or the default value.
         */
        attributeDefaultSet = function( atr, defaultVal ) {
            if ( atr === "" || typeof atr === "undefined" || atr === null ) {
                return defaultVal;
            }
            return atr;
        }, 
        /**
         * Calculates and sets the CSS variables for Updating the position of the tooltip relative to the range input's thumb.
         *
         * @param {HTMLElement} inputRangeElm The input type="range" element.
         * @param {HTMLElement} displayElm The element displaying the value (tooltip).
         * @param {HTMLElement} groupElm The parent grouping element.
        */
        updateTooltipPos = function( inputRangeElm, displayElm, groupElm ) {
            const thumbSize = 16, 
                edgeOffset = 4;
            let tooltipPos, inputRangeElmSize, displayElmSize, 
                inputMin = parseFloat( attributeDefaultSet( inputRangeElm.min, 0 ) ), 
                inputMax = parseFloat( attributeDefaultSet( inputRangeElm.max, 100 ) ), 
                percentage = 0, 
                inputRangeobj = wb.getData( inputRangeElm, componentName ), 
                vertWriteStyles = ["vertical-lr", "vertical-rl", "sideways-rl", "sideways-lr"], 
                isVertical = false, 
                inputElmStyle = window.getComputedStyle( inputRangeElm );

            if ( vertWriteStyles.indexOf( inputElmStyle.writingMode ) !== -1 || ( typeof inputRangeobj !== "undefined" && Object.prototype.hasOwnProperty.call( inputRangeobj, "orientation" ) === true && inputRangeobj.orientation === "vertical" ) ) {
                isVertical = true;
            }

            if ( isVertical === true ) {
                inputRangeElmSize = inputRangeElm.getBoundingClientRect().height;
                displayElmSize = displayElm.getBoundingClientRect().height;
            } else {
                inputRangeElmSize = inputRangeElm.getBoundingClientRect().width;
                displayElmSize = displayElm.getBoundingClientRect().width;
            }
            if ( displayElm.classList.contains( tooltipName ) === true ) {

                if ( inputMax - inputMin !== 0 ) {
                    percentage = ( inputRangeElm.valueAsNumber - inputMin ) / ( inputMax - inputMin );
                }
                if ( inputElmStyle.writingMode === "sideways-lr" || inputElmStyle.direction === "rtl" || ( typeof inputRangeobj !== "undefined" && Object.prototype.hasOwnProperty.call( inputRangeobj, "reversed" ) === true && inputRangeobj.reversed === true ) ) {
                    tooltipPos = ( ( 1 - percentage ) * ( inputRangeElmSize - thumbSize ) ) + ( thumbSize / 2 ) + ( displayElmSize / 2 );
                } else {
                    tooltipPos = ( percentage * ( inputRangeElmSize - thumbSize ) ) + ( thumbSize / 2 ) - ( displayElmSize / 2 );
                }
                groupElm.style.setProperty( "--tooltipArrow", "solid" );

                // Adjust position if tooltip goes out of bounds
                if ( tooltipPos < 0 && tooltipPos + displayElmSize > inputRangeElmSize ) {
                    // if tooltip is larger then slider track then center over slider track
                    tooltipPos = ( inputRangeElmSize / 2 ) - ( displayElmSize / 2 );
                    groupElm.style.setProperty( "--tooltipArrow", "none" );
                } else if ( isVertical === true && ( tooltipPos <= ( thumbSize / 2 ) + ( displayElmSize / 2 ) || inputRangeElmSize === 0 ) ) {
                    // Align top
                    tooltipPos = ( thumbSize / 2 ) + ( displayElmSize / 2 ) + edgeOffset;
                    groupElm.style.setProperty( "--tooltipArrow", "none" );
                } else if ( isVertical === false && ( tooltipPos <= 0 || inputRangeElmSize === 0 ) ) {
                    // Align left
                    tooltipPos = -edgeOffset;
                    groupElm.style.setProperty( "--tooltipArrow", "none" );
                } else if ( isVertical === true && ( tooltipPos + ( ( displayElmSize ) / 2 ) - thumbSize > inputRangeElmSize ) ) {
                    // Align bottom
                    tooltipPos = inputRangeElmSize + edgeOffset;
                    groupElm.style.setProperty( "--tooltipArrow", "none" );
                } else if ( isVertical === false && ( tooltipPos + displayElmSize > inputRangeElmSize ) ) {
                    // Align right
                    tooltipPos = inputRangeElmSize - displayElmSize + edgeOffset;
                    groupElm.style.setProperty( "--tooltipArrow", "none" );
                }
                if ( isVertical === true ) {
                    displayElm.style.setProperty( "--VTooltipPos", tooltipPos + "px" );
                } else {
                    displayElm.style.setProperty( "--HTooltipPos", tooltipPos + "px" );
                }
            }
        }, 
        /**
         * Returns the formatted display value.
         * 
         * @param {HTMLInputElement} inputRangeElm The input type="range" element.
         * @param {HTMLElement} displayElm - The element where the value will be displayed.
         * @returns {string|number|undefined} Returns the processed function value or the input value.
         */
        getDisplayValue = function( inputRangeElm, displayElm ) {
            let outputData;

            if ( displayElm !== null ) {
                outputData = wb.getData( displayElm, componentName );
                if ( typeof outputData !== "undefined" && Object.prototype.hasOwnProperty.call( outputData, "fn" ) === true ) {
                    return getFuncValue( outputData.fn, inputRangeElm.value );
                } else {
                    return inputRangeElm.value;
                }
            }
        }, 
        /**
         * Updates the value displayed in the target element (output/input/tooltip) with the range value.
         *
         * @param {HTMLElement} inputRangeElm The input type="range" element.
         * @param {HTMLElement} displayElm The element where the value will be displayed.
         * @param {HTMLElement} groupElm The parent grouping element.
         */
        updateValElm = function( inputRangeElm, displayElm, groupElm ) {
            if ( displayElm !== null ) {
                if ( displayElm.tagName === "INPUT" || displayElm.tagName === "TEXTAREA" ) {
                    displayElm.value = getDisplayValue( inputRangeElm, displayElm );
                } else {
                    displayElm.innerHTML = getDisplayValue( inputRangeElm, displayElm );
                    // Tooltip specific positioning
                    updateTooltipPos( inputRangeElm, displayElm, groupElm );
                }
            }
        }, 
        /**
         * Replaces placeholders in a string with the range input properties.
         * 
         * @param {HTMLInputElement} rangeElm The input type="range" element.
         * @param {string} title The string containing the placeholders (e.g., "\({min}", "\){value}").
         * @returns {string} The formatted string with placeholders replaced by values.
         */
        updateTitle = function( rangeElm, title ) {
            const data = { min: rangeElm.min, 
                           max: rangeElm.max, 
                           step: rangeElm.step, 
                           value: getDisplayValue( rangeElm, rangeElm ) };

            // A safe way to replace placeholders
            return title.replace( /\${(\w+)}/g, function(match, key) {
                return data[key];
            } );
        }, 
        /**
         * Triggers updates for the value of all target elements linked to a range input.
         *
         * @param {HTMLElement} inputRange The input type="range" element.
         */
        setRangeValue = function( inputRange ) {
            let targetArr = wb.getData( inputRange, componentName ), 
                groupElm = document.getElementById( targetArr.parentId );

            // Generate title attribute on input range
            if ( Object.prototype.hasOwnProperty.call( targetArr, "title" ) === true && targetArr.title !== "" ) {
                inputRange.title = updateTitle( inputRange, targetArr.title );
            }

            if ( typeof targetArr !== "undefined" && Object.prototype.hasOwnProperty.call( targetArr, "target" ) === true ) {
                targetArr.target.forEach( function( currentId ) {
                    let displayElm = document.getElementById( currentId );

                    updateValElm( inputRange, displayElm, groupElm );
                }, inputRange, groupElm );
            }
        }, 
        /**
         * Updates the range input position when a linked text field value changes.
         *
         * @param {HTMLElement} elm The linked input or textarea element.
         */
        updateRangeFromField = function( elm ) {
            let adjustedInputVal, outputData, 
                elmMin = parseFloat( attributeDefaultSet( elm.min, 0 ) ), 
                elmMax = parseFloat( attributeDefaultSet( elm.max, 100 ) ), 
                elmStep = parseFloat( attributeDefaultSet( elm.step, 1 ) ), 
                rangeElm = document.getElementById( elm.rangeId );

            outputData = wb.getData( elm, componentName );

            if ( typeof outputData !== "undefined" && Object.prototype.hasOwnProperty.call( outputData, "fn" ) === true ) {
                adjustedInputVal = parseFloat( getFuncValue( outputData.fn, parseInt( $( elm ).val(), 10 ) ) );
            } else {
                // Use jQuery val() to handle potential issues with native element value in cross-browser scenarios
                adjustedInputVal = parseFloat( $( elm ).val() ) || elmMin;
            }

            // Ensure value is between min/max values and round to step
            if ( adjustedInputVal < elmMin ) {
                $( rangeElm ).val( elmMin );
            } else if ( adjustedInputVal > elmMax ) {
                $( rangeElm ).val( elmMax );
            } else if ( elmStep === 0 ) {
                $( rangeElm ).val( adjustedInputVal );
            } else {
                $( rangeElm ).val( Math.round( adjustedInputVal / elmStep ) * elmStep );
            }
        }, 
        /**
         * Creates and populates datalist options using a document fragment for performance.
         * Includes IE9 compatibility wrappers for option elements.
         * 
         * @param {Array} datalistObj - Array of objects containing 'value' and optional 'label'.
         * @param {HTMLElement} datalistElm - The <datalist> element to be populated.
         */
        createDatalistOptions = function( datalistObj, datalistElm ) {
            let fragment = document.createDocumentFragment();

            fragment.appendChild( document.createComment( "[if lte IE 9]><select><![endif]" ) );
            datalistObj.forEach( function( tickmarkObj ) {
                let optionElm;

                if ( Object.prototype.hasOwnProperty.call( tickmarkObj, "value" ) === true ) {
                    optionElm = document.createElement( "option" );
                    optionElm.value = tickmarkObj.value;
                    if ( Object.prototype.hasOwnProperty.call( tickmarkObj, "label" ) === true ) {
                        optionElm.label = tickmarkObj.label;
                    }
                    fragment.appendChild( optionElm );
                }
            }, fragment );
            fragment.appendChild( document.createComment( "[if lte IE 9]></select><![endif]" ) );
            if ( datalistElm.innerHTML !== fragment.innerHTML ) {
                datalistElm.innerHTML = "";
                datalistElm.appendChild( fragment );
            }
        }, 
        /**
         * Creates a new <datalist> element, populates it, and links it to a range input.
         * 
         * @param {HTMLElement} rangeElm - The <input type="range"> element to link.
         * @param {Array} datalistArr - Data used to generate the tick mark options.
         */
        createDatalist = function( rangeElm, datalistArr ) {
            let datalistElm = document.createElement( "datalist" );

            datalistElm.id = wb.getId();
            datalistElm.classList.add( "d-flex" );
            createDatalistOptions( datalistArr, datalistElm );
            rangeElm.after( datalistElm );
            rangeElm.setAttribute( "list", datalistElm.id );
        }, 
        /**
         * Synchronizes existing datalist options with a new data set.
         * Efficiently adds, updates, or removes options to match the provided data.
         * 
         * @param {Array} datalistObj New data set for tickmarks.
         * @param {HTMLDataListElement} datalistElm - The existing <datalist> element.
         */
        updateDatalistOptions = function( datalistObj, datalistElm ) {
            let datalistOption, validKeys, optionKey, datalistVal, 
                lastOption = datalistElm.querySelector( "option" );

            validKeys = new Set( datalistObj.map( function( option ) {
                let optionElm, 
                    datalistOption = datalistElm.querySelector( "option[value=\"" + option.value + "\"]" );

                if ( datalistOption === null ) {
                    optionElm = document.createElement( "option" );
                    optionElm.value = option.value;
                    if ( option.label !== "" && typeof option.label !== "undefined" ) {
                        optionElm.label = option.label;
                    }
                    if ( lastOption !== null ) {
                        lastOption.insertAdjacentElement( "afterend", optionElm );
                        lastOption = datalistElm.querySelector( "option[value=\"" + option.value + "\"]" );
                    }
                } else {
                    if ( option.label !== datalistOption.label ) {
                        if ( Object.prototype.hasOwnProperty.call( option, "label" ) === false || option.label === "" ) {
                            datalistOption.removeAttribute( "label" );
                        } else {
                            datalistOption.label = option.label;
                        }
                    }
                    lastOption = datalistOption;
                }

                if ( Object.prototype.hasOwnProperty.call( option, "label" ) === true && option.label !== "" ) {
                    return option.value + "|" + option.label;
                } else {
                    return option.value;
                }
            }, lastOption ) );

            if ( lastOption !== null ) {
                for ( let i = datalistElm.options.length - 1; i >= 0; i = i - 1 ) {
                    datalistOption = datalistElm.options[i];

                    if ( isNaN( parseFloat( datalistOption.value ) ) === true ) {
                        datalistVal = datalistOption.value;
                    } else {
                        datalistVal = parseFloat( datalistOption.value );
                    }
                    if ( datalistOption.getAttribute("label") !== null && datalistOption.label !== "" ) {
                        optionKey = datalistVal + "|" + datalistOption.label;
                    } else {
                        optionKey = datalistVal;
                    }
                    // Check if the current option's key exists in the set of valid keys
                    if ( validKeys.has( optionKey ) === false ) {
                        // If it does not match, remove the option from the datalist
                        datalistElm.removeChild( datalistOption );
                    }
                }
            }
        };

    /**
    * Primary event handler for wb-input-range event.
    * Manages tooltip creation, UI orientation, and event binding.
    */
    $document.on( "wb-input-range", selector, function( event, data ) {
        let targetArr, tooltipElm, rangeDataAtr, 
            tooltipObj = {}, 
            groupElm = event.currentTarget, 
            $rangeElm = $( groupElm ).find( "input[type=range]" ), 
            rangeElm = $rangeElm[ 0 ];

        // Store target data on the range element itself for easier access later
        if ( groupElm.hasAttribute( "id" ) === false ) {
            groupElm.id = wb.getId();
        }
        targetArr = wb.getData( rangeElm, componentName );
        targetArr.parentId = groupElm.id;
        rangeElm.dataset.wbInputRange = JSON.stringify( targetArr );

        // Initial value setting
        setRangeValue( rangeElm );

        if ( typeof targetArr !== "undefined" && Object.prototype.hasOwnProperty.call( targetArr, "target" ) === true ) {

            // Generate tooltip
            if ( Object.prototype.hasOwnProperty.call( targetArr, "tooltip" ) === true && groupElm.getElementsByClassName( "wb-input-range-tooltip" ).length === 0 ) {
                tooltipElm = document.createElement( "div" );
                tooltipElm.id = wb.getId();
                tooltipElm.classList.add( "wb-input-range-tooltip" );
                tooltipElm.setAttribute( "aria-hidden", "true" );
                if ( Object.prototype.hasOwnProperty.call( targetArr, "fn" ) === true ) {
                    tooltipObj.fn = targetArr.fn;
                }
                if ( Object.prototype.hasOwnProperty.call( targetArr, "tooltipArrow" ) === true && targetArr.tooltipArrow !== "" ) {
                        tooltipObj.arrow = targetArr.tooltipArrow;
                }
                if ( Object.keys( tooltipObj ).length > 0 ) {
                    tooltipElm.dataset.wbInputRange = JSON.stringify( tooltipObj );
                }

                // Update the data attribute on the range input to include the new tooltip ID as a target
                rangeDataAtr = JSON.parse( rangeElm.dataset.wbInputRange || "{}" );
                if ( Object.prototype.hasOwnProperty.call( rangeDataAtr, "target" ) === true ) {
                    targetArr.target.push( tooltipElm.id );
                    rangeDataAtr.target.push( tooltipElm.id );
                    rangeElm.dataset.wbInputRange = JSON.stringify( rangeDataAtr );
                }
                rangeElm.parentNode.insertBefore( tooltipElm, rangeElm );
            }

            // UI Orientation Logic
            if ( Object.prototype.hasOwnProperty.call( targetArr, "reversed" ) === true ) {
                if( targetArr.reversed === true ) {
                    rangeElm.style.direction = "rtl";
                } else {
                    rangeElm.style.direction = "ltr";
                }
            }

            if ( Object.prototype.hasOwnProperty.call( targetArr, "orientation" ) === true ) {
                if ( targetArr.orientation === "vertical" ) {
                    rangeElm.style.writingMode = "vertical-lr";
                } else {
                    rangeElm.style.writingMode = "horizontal-tb";
                }
            }

            // Generate tick marks
            if ( groupElm.querySelector( "datalist" ) === null && Object.prototype.hasOwnProperty.call( targetArr, "datalist" ) === true ) {
                createDatalist( rangeElm, targetArr.datalist );
            }

            // Bind events for all target elements
            targetArr.target.forEach( function( currentId ) {
                let displayElm = document.getElementById( currentId );

                if ( displayElm !== null ) {
                    if ( displayElm.tagName === "INPUT" || displayElm.tagName === "TEXTAREA" ) {
                        // Linked text/textarea input
                        if ( rangeElm.hasAttribute( "id" ) === false ) {
                            rangeElm.id = wb.getId();
                        }
                        displayElm.rangeId = rangeElm.id;

                        $( displayElm ).off( "change.wb-range input.wb-range" ).on( "change.wb-range input.wb-range", function() {
                            let updateElm, 
                                newTargetArr = targetArr.target.slice();

                            updateRangeFromField( this );
                            // Update all non-text targets after range value is set
                            for ( let j = 0; j < newTargetArr.length; j = j + 1 ) {
                                updateElm = document.getElementById( newTargetArr[ j ] );
                                if ( updateElm.tagName !== "INPUT" && updateElm.tagName !== "TEXTAREA" ) {
                                    updateValElm( rangeElm, updateElm, document.getElementById( targetArr.parentId ) );
                                }
                            }
                        } );
                    } else {
                        // Linked non-input (e.g., div, span, output)
                        updateValElm( rangeElm, displayElm, groupElm );
                    }
                }
            }, rangeElm, groupElm, targetArr );
        }
    } );

    /**
    * Listens for interaction on range inputs to update linked displays.
    */
    $( selector ).on( "change input", "input[type=range]", function() {
        setRangeValue( this );
    } );

    // Prevents mouse wheel scroll of slider when interacting with the range which occurs in some browsers
    $( selector ).on( "wheel", "input[type=range]", function( event ) {
        window.scrollTo( window.scrollX, window.scrollY + event.originalEvent.deltaY );
        event.preventDefault();
        event.stopPropagation();
    } );

    // Handler for dynamic updates to range data (e.g., updating datalist tickmarks)
    $document.on( "update" + selector, function( event, parameterObj ) {
        let rangeElm, datalistElm;

        if ( event.target.tagName.toLowerCase() === "input" && Object.prototype.hasOwnProperty.call( event.target, "type" ) === true && event.target.getAttribute( "type" ) === "range" ) {
            rangeElm = event.target;
        } else {
            rangeElm = event.target.querySelector( "input[type=range]" );
        }

        if ( Object.prototype.hasOwnProperty.call( parameterObj, "datalist" ) === true ) {
            if ( rangeElm !== null && Object.prototype.hasOwnProperty.call( rangeElm, "list" ) === true ) {
                // range selected with list element
                datalistElm = rangeElm.list;
            } else if ( event.target.tagName.toLowerCase() === "datalist" ) {
                // datalist selected 
                datalistElm = event.target;
            } else {
                // search parent element for datalist 
                datalistElm = event.target.parentElement.querySelector( "datalist" );
            }

            if ( datalistElm === null ) {
                createDatalist( rangeElm, parameterObj.datalist );
            } else {
                updateDatalistOptions( parameterObj.datalist, datalistElm );
            }
        }
        setRangeValue( event.target );
    } );

    // Bind the init event of the plugin
    $document.on( "timerpoke.wb " + initEvent, selector, init );

    // Add the timer poke to initialize the plugin
    wb.add( selector );
} )( jQuery, window, wb );
