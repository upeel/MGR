/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    bindFileUploadUIEvent();
});

// intention for upload file form
function injectIntentionIntoUploadFileForm(intention) {
    $('#txtIntention').remove();
    
    var intentionInput = $('<input>')
            .attr('id', 'txtIntention')
            .attr('name', 'txtIntention')
            .attr('type', 'text')
            .attr('hidden', true)
            .val(intention);
    
    intentionInput.appendTo('#file_upload');
}

// initialize dropzone
function bindFileUploadUIEvent() {
    
    $('#dropzone').click(function() {
        if (validationAttachment()) {
        injectIntentionIntoUploadFileForm('UPLOAD');
        $('#file_1').trigger('click');
    }
    });
    limitImages();
    $('#file_upload').fileUploadUI({
       dataType: 'json',
       namespace: 'file_upload',
       fileInputFilter: '#file_1',
       dropZone: $('#dropzone'),
       uploadTable: $('#uploaded-files'),
       downloadTable: $('#uploaded-files'),
       buildDownloadRow: function(data) {
           try {

                   bindUploadAttachmentList(data);
          
           } catch(e) {
               alert('Upload Fail!');
           }
       },
       buildUploadRow: function(files, index) {
            var file = files[index].type;
            if(file === 'application/pdf') {
                injectIntentionIntoUploadFileForm('UPLOAD');
                var row = '<tr>';
                row += '<td>' + files[index].name + '</td>';
                row += '<td class="file_upload_progress"><div></div></td>';
                row += '<td class="file_upload_cancel"><button style="width:50px;" class="ui-state-default ui-corner-all" title="cancel"><span style="width:50px;" class="ui-icon ui-icon-cancel">Cancel</span></button></tr>';
                row += '</tr>';
                return $(row);
            }              
       }
    }).bind('file_uploadsubmit', function(e, data) {
        alert('hai');
    });
}

function bindAttachmentOnClickDeleteEvent(serviceCallAttachmentId, fileName, serviceCallId, thisElement) {
    var confirmation = window.confirm("Are You Sure Wanna Delete This Attachment?");
    if(confirmation) {
        showLoading();
        injectIntentionIntoUploadFileForm('DELETE');
        var txtIntention = $('#txtIntention').val();

        var jqXHR = $.ajax({
           url: 'ServiceCallAttachments',
           type: 'POST',
           data: {
                txtIntention,
                fileName,
                serviceCallAttachmentId, 
                serviceCallId
           }       
        });

        jqXHR.done(function(data) {
            try {
                thisElement.closest('tr').remove();
            } catch(e) {
                console.log('Fail Delete Attachment!');
            }
        });

        jqXHR.fail(function(data) {
            console.log('Failed Deleting Attachment!');
        });

        jqXHR.always(function() {
            hideLoading();
        });
    }    
}

// append list of attachments
function bindUploadAttachmentList(listOfServiceCallAttachmentJson) {
    var imgLength = $('.img').length + 1;
    for(var index in listOfServiceCallAttachmentJson) {
        
        var tbodyUploadFile = $('#imgs');
        var serviceCallAttachmentRow = '<tr><td>';
        //serviceCallAttachmentRow += '<div id="imgs" class="defaultBodyContent" style="border: 1px solid #b7b7b7;padding: 10px;border-radius: 5px;display: flex ;justify-content: flex-start;margin-top: 0px !important;">';
        //serviceCallAttachmentRow += '<td class="txtStyleSanRegularMgr" style="padding-left: 0;"><a href="#'+listOfServiceCallAttachmentJson[index].file_name+'" onclick="fnOpenPopUpWindow(\'ServiceCallAttachment\', \'../../GetAttachmentFile?attachmentFilePath='+encodeURIComponent(listOfServiceCallAttachmentJson[index].file_path)+'\');">'+listOfServiceCallAttachmentJson[index].file_display_name+"</a></td>";
        //serviceCallAttachmentRow += '<div style="position: relative;">';
        serviceCallAttachmentRow += '<span><img class="logoTbodyTableMgr" id="btnDeleteAttachment" src="../../include/mgr/include/images/MGR-LOGO/delete.png" alt="delete attachment" onclick="bindAttachmentOnClickDeleteEvent('+listOfServiceCallAttachmentJson[index].id+', \''+listOfServiceCallAttachmentJson[index].file_name+'\', '+listOfServiceCallAttachmentJson[index].service_call_id+', $(this))"></span>';
        serviceCallAttachmentRow += '<img src="../../GetAttachmentFile?attachmentFilePath='+listOfServiceCallAttachmentJson[index].file_path+'" onclick="imgClick('+imgLength+')" id="myImg_'+imgLength+'" alt="Image Attachment" class="img" style="width:auto;height:auto;max-width:120px;min-width:120px;border-radius: 5px;margin: 10px">';
        //serviceCallAttachmentRow += '</div>';
        //serviceCallAttachmentRow += '</div>';
        serviceCallAttachmentRow += '</td></tr>';
        
        tbodyUploadFile.append(serviceCallAttachmentRow);
        imgLength++;
    }
    
}

function limitImages() {
$("#file_1").on("change", function(){
    if($("#file_1")[0].files.length > 3) {
        alert("you can select only 3 images");
        $(this).val('');
    } 
});
}

function validationAttachment() {
    var isvalid = true;
    var rows = document.getElementById("imgs").getElementsByTagName("tr").length;
    if(rows === 3)
    {
        document.getElementById("file_1").disabled = true;
        alert("cannot upload more than 3 attachments");
        isvalid = false;
    }
    else if(rows<3){
        document.getElementById("file_1").disabled = false;
    }
    return isvalid;
}
