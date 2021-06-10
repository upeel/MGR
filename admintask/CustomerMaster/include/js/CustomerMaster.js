 
function openPopUp(url)
{
    var newwindow=window.open(url,'Customer Profile');
    if (window.focus) 
    {
        newwindow.focus();
    }
}

function bindValidateFileTypeOnChange() {
    $('#file').change(function() {
        var fileValue = $(this).val();
       var fileType = fileValue.substring(fileValue.lastIndexOf("."), fileValue.length);
       if(fileType.toLowerCase() !== ".txt") {
           alert('Please Choose .txt type file!');
           $(this).val("");
           return false;
       }
    });
}

function bindImportMyobCustomerOnClick() {
    $('#btnImport').click(function() {
        
        var entity = $('#ddlEntityId');
        var file = $('#file');

        if(entity.val() === '0' || entity.val() === null) {
            
            alert('Please Choose Your Entity!');
            return false;
        }
        
        if(file.val() === '') {
            alert('Please Upload Customer File!');
            return false;
        }
        
        var confirmation = window.confirm("Are You Sure Wanna Import Customer Data?");
        if(!confirmation) {
            return false;
        }
        
        $('#frm').submit();
    });
}

 $(document).ready(function()
{
//    makeButtonSideBySide();
    initializeDataTableEvent("dtSummaryTable");
    var list = document.getElementById("dtSummaryTable_length"); 
    list.parentNode.removeChild(list);
    $('#dtSummaryTable th input').remove();    
    bindChosenDDLMulitpleSelectEvent('ddlEntityId');
    bindImportMyobCustomerOnClick();
    bindValidateFileTypeOnChange();      
    refreshUrlParameter();
});

