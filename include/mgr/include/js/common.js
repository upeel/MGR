/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function inIframe()
{
    try
    {
        return window.self !== window.top;
    } catch (e)
    {
        return true;
    }
}

function bindErrorMessageToolTipEvent($element, message)
{
    if (inIframe)
    {
        window.parent.$("html, body").animate({
            scrollTop: $element.offset().top
        }, 1000);
    } else
    {
        $('html, body').animate({
            scrollTop: $element.offset().top
        }, 1000);
    }


    $element.addClass("error");
    $element.qtip({
        content: {
            text: message
        },
        position: {
            my: 'top left', // Position my top left...
            at: 'bottom left', // at the bottom right of...
            target: $element // my target
        }
    }).qtip("show");
}

// get numbers with commas
function getQuantityFormattedNumber(number, numberOfDecimalPlaces)
{
    numberOfDecimalPlaces = parseInt(numberOfDecimalPlaces);
    var roundingFactor = Math.pow(10, numberOfDecimalPlaces);
    number = removeNumberFormat(number);
    //round up, and set to 4 decimal places (Eg. 1.34567 -> 1.3457) 
    //add a small epsilon number (0.00000001) 
    //in cases where 554144.445 * 100 = 55414444.49999999
    //that will result in an inaccurate rounding, 
    //adding the epsilon value after mulitpling will fix that
    number = (Math.round((number * roundingFactor) + (0.0001 / roundingFactor)) / roundingFactor).toFixed(numberOfDecimalPlaces);
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

//get price formatted numbers
function getPriceFormattedNumber(number, numberOfDecimalPlaces)
{
    number = removeNumberFormat(number);
    var roundingFactor = Math.pow(10, numberOfDecimalPlaces);
    //round up, and set to 4 decimal places (Eg. 1.34567 -> 1.3457)
    //add a small epsilon number (0.00000001) 
    //in cases where 554144.445 * 100 = 55414444.49999999
    //that will result in an inaccurate rounding, 
    //adding the epsilon value after mulitpling will fix that
    number = (Math.round((number * roundingFactor) + (0.0001 / roundingFactor)) / roundingFactor).toFixed(numberOfDecimalPlaces);
    //format numbers with commas
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return "$" + parts.join(".");
}

//remove all '$' and ',' from the number
function removeNumberFormat(number)
{
    number = number.toString();
    number = number.replace(/,/g, "");
    number = number.replace(/\$/g, "");

    return number;
}

function bindTxtPriceOnChangeEvent(elementId, numberOfDecimalPlaces)
{
    var $txt_price = $("#" + elementId);
    $txt_price.on("blur", function ()
    {
        this.value = getPriceFormattedNumber(this.value, numberOfDecimalPlaces);
    });

    var previousPrice = 0;
    $txt_price.on("focus", function () {
        previousPrice = this.value;
    }).on("change", function ()
    {
        var currentPrice = this.value;
        currentPrice = removeNumberFormat(currentPrice);

        //check if price is valid
        if (isNaN(currentPrice) === true || currentPrice < 0)
        {
            //use previous correct value
            this.value = previousPrice;
            alert("Invalid Value!");
        } else
        {
            this.value = currentPrice;
        }
    });
}

function bindTwoWayTxtPriceOnChangeEvent(elementId, numberOfDecimalPlaces)
{
    var $txt_price = $("#" + elementId);
    $txt_price.on("blur", function ()
    {
        this.value = getPriceFormattedNumber(this.value, numberOfDecimalPlaces);
    });

    var previousPrice = 0;
    $txt_price.on("focus", function () {
        previousPrice = this.value;
    }).on("change", function ()
    {
        var currentPrice = this.value;
        currentPrice = removeNumberFormat(currentPrice);

        //check if price is valid
        if (isNaN(currentPrice) === true)
        {
            //use previous correct value
            this.value = previousPrice;
            alert("Invalid Value!");
        } else
        {
            this.value = currentPrice;
        }
    });
}

function bindTxtQuantityOnChangeEvent(elementId, numberOfDecimalPlaces)
{
   
    var $txt_quantity = $("#" + elementId);
    $txt_quantity.on("blur", function ()
    {
        this.value = getQuantityFormattedNumber(this.value, numberOfDecimalPlaces);
    });

    var previousQuantity = 0;
    $txt_quantity.on("focus", function () {
        previousQuantity = this.value;
    }).on("change", function ()
    {
        var currentQuantity = this.value;
        currentQuantity = removeNumberFormat(currentQuantity);

        //check if quantity is valid
        if (isNaN(currentQuantity) === true || currentQuantity < 0)
        {
            //use previous correct value
            this.value = previousQuantity;
            alert("Invalid Value!");
        } else
        {
            this.value = currentQuantity;
        }
    });
}

function bindTwoWayTxtQuantityOnChangeEvent(elementId, numberOfDecimalPlaces)
{
    var $txt_quantity = $("#" + elementId);
    $txt_quantity.on("blur", function ()
    {
        this.value = getQuantityFormattedNumber(this.value, numberOfDecimalPlaces);
    });

    var previousQuantity = 0;
    $txt_quantity.on("focus", function () {
        previousQuantity = this.value;
    }).on("change", function ()
    {
        var currentQuantity = this.value;
        currentQuantity = removeNumberFormat(currentQuantity);

        //check if quantity is valid
        if (isNaN(currentQuantity) === true)
        {
            //use previous correct value
            this.value = previousQuantity;
            alert("Invalid Value!");
        } else
        {
            this.value = currentQuantity;
        }
    });
}

function bindInputTextCharacterCountdownEvent()
{
    $("input[type=text], textarea").each(function ()
    {
        var $inputText = $(this);
        $inputText.on("input", function ()
        {
            var maxLength = this.maxLength;

            if (maxLength < 0)
            {
                //if there is no max length defined in the attribute, do not count down.
                return;
            }

            var spanElementId = "span_" + this.id;
            //check if the span element exist
            var $span_character_countdown = $("#" + spanElementId);

            //if not create it
            if ($span_character_countdown.length <= 0)
            {
                $(this).after("<small><i><span class='characterCountDown' id='" + spanElementId + "'></span></i></small>");
            }

            //if exist, change the text.
            $span_character_countdown = $("#" + spanElementId);
            var currentLength = this.value.length;
            $span_character_countdown.text((maxLength - currentLength) + " characters remaining.");
        });

        $inputText.blur(function () {
            $("#span_" + this.id).remove();
        });
    });
}

function fnOpenPopUpWindow(windowName, URL)
{
    var availHeight = screen.availHeight;
    var availWidth = screen.availWidth;
    var x = 0, y = 0;
    if (document.all) {
        x = window.screentop;
        y = window.screenLeft;
    } else if (document.layers) {
        x = window.screenX;
        y = window.screenY;
    }
    var windowArguments = 'resizable=1,toolbar=0,location=0,directories=0,addressbar=0,scrollbars=1,status=1,menubar=0,top=0,left=0, ';
    windowArguments += 'screenX = ' + x + ', screenY = ' + y + ', width = ' + availWidth + ', height = ' + availHeight;

    var newWindow = window.open(URL, windowName, windowArguments);
    newWindow.moveTo(0, 0);

    return newWindow;
}

function getWindowsArgument() 
{
    var availHeight = screen.availHeight;
    var availWidth = screen.availWidth;
    var x = 0, y = 0;
    if (document.all) {
        x = window.screentop;
        y = window.screenLeft;
    } else if (document.layers) {
        x = window.screenX;
        y = window.screenY;
    }
    var windowArguments = 'resizable=1,toolbar=0,location=0,directories=0,addressbar=0,scrollbars=1,status=1,menubar=0,top=0,left=0, ';
    windowArguments += 'screenX = ' + x + ', screenY = ' + y + ', width = ' + availWidth + ', height = ' + availHeight;
    return windowArguments;
}

function initializeDataTableEvent(dataTableElementId)
{
    var $datatable = $("#" + dataTableElementId).DataTable({
        "dom": "l<'#dt_searchAndButtonContainer_" + dataTableElementId + "'fB>tip",
        "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        "buttons": [
            'copy', 'csv', 'excel', 'print',
            {
                extend: 'pdfHtml5',
                orientation: 'landscape'
            }
        ],
        "colReorder": true,
        "initComplete": function (settings, json) {
            //show the datatable after initializing
            //In cases where the data to load into the datatable is huge, 
            //it will cause the browser to incur an expensive rendering time
            //only after the data is completely loaded, then show the datatable.
            $('#' + dataTableElementId).show();
        }
    });

    // Setup - add a text input to each footer cell
    $('#' + dataTableElementId + ' tfoot th').each(function () {
        var title = $('#' + dataTableElementId + 'thead th').eq($(this).index()).text();
        $(this).html('<input type="text" placeholder="Search ' + title + ' "/>');
    });

    // Apply the search
    $datatable.columns().every(function () {
        var that = this;

        $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this.value) {
                that
                        .search(this.value)
                        .draw();
            }
        });
    });

    //Move the footer to the top, just below the title of each column
    $('#' + dataTableElementId + ' tfoot tr').appendTo('#' + dataTableElementId + ' thead');

    //rearrange the search all input text to the right and the extension buttons to the left of the table
    $("#dt_searchAndButtonContainer_" + dataTableElementId + " .dataTables_filter").css("float", "left");
    $("#dt_searchAndButtonContainer_" + dataTableElementId + " .dataTables_filter").css("padding-right", "5px");
    $("#dt_searchAndButtonContainer_" + dataTableElementId + " .dt-buttons").css("float", "left");
    $("#dt_searchAndButtonContainer_" + dataTableElementId).css("float", "right");

    //make sure that the datatable is scaled correctly
    $('#' + dataTableElementId).css("width", "100%");
}

function initializeDatePicker(datePickedElementId)
{
    $("#" + datePickedElementId).datepicker({
        dateFormat: "dd/mm/yy"
    });
}

function promptMessageEvent()
{
    var message = $("#message").val();

    if (message === undefined)
    {
        return;
    }

    message = message.trim();

    if (message !== undefined && message !== null && message !== "")
    {
        alert(message.replace("\\n", "\n"));
    }
}

function showLoading()
{
    $("#dvLoading").show();
    $("#overlay").show();
}

function hideLoading()
{
    $("#dvLoading").hide();
    $("#overlay").hide();
}


function injectIntentionInputElementIntoForm(intention)
{
    //clear existing intention
    $("#txtIntention").remove();

    //define the intention
    var $intentionInput = $("<input>")
            .attr("id", "txtIntention")
            .attr("name", "txtIntention")
            .attr("type", "text")
            .attr("hidden", true)
            .val(intention);

    //attach the intention to the form element, so that server side knows which operation to perform
    $intentionInput.appendTo("#frm");
}

function bindChosenDDLMulitpleSelectEvent(elementId, selectAllElementId, deselectAllElementId)
{
    $("#" + elementId).chosen({
        no_results_text: "Oops, nothing found!",
        width: "100%",
        search_contains: true
    });

    $("#" + selectAllElementId).on("click", function ()
    {
        $("#" + elementId + " option").prop("selected", true).trigger("chosen:updated");
    });

    $("#" + deselectAllElementId).on("click", function ()
    {
        $("#" + elementId + " option").prop("selected", false).trigger("chosen:updated");
    });
}


//function initializeDropDownListChosenEvent()
//{
//    $("select").chosen({
//        width: "100%",
//        allow_single_deselect: true
//    });
//}

function bindChosenDDLMulitpleSelectEvent(elementId, selectAllElementId, deselectAllElementId)
{
    $("#" + elementId).chosen({
        no_results_text: "Oops, nothing found!",
        width: "100%",
        search_contains: true
    });

    $("#" + selectAllElementId).on("click", function ()
    {
        $("#" + elementId + " option").prop("selected", true).trigger("chosen:updated");
    });

    $("#" + deselectAllElementId).on("click", function ()
    {
        $("#" + elementId + " option").prop("selected", false).trigger("chosen:updated");
    });
}

// mgr animate scroll for validation
function scrollTo(id)
{
    $('html, body').animate({
        scrollTop: $("#"+id).offset().top
    }, 500);
}

// alert message close for unsaved data
function alertMessageUnSavedData()
{
    window.onbeforeunload = function() 
    {
       return "";
    };
}

// for refresh the url param
function refreshUrlParameter() {
    window.history.pushState(null, null, window.location.pathname);
}

// hide the search bar on each column on datatable
function hideTheSearchBarTheadDataTable() {
    $('.dataTable thead tr:eq(1)').css('display', 'none');
}

$(document).ready(function ()
{
    bindInputTextCharacterCountdownEvent();
//    initializeDropDownListChosenEvent();

    //hide the loading overlay when the page is ready.
    $("#dvLoading").hide();
    $("#overlay").hide();

    //when there a message from the server side, prompt it.
    promptMessageEvent();
});
