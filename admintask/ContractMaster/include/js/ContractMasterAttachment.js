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
//    injectIntentionIntoUploadFileForm('UPLOAD');
    
    $('#dropzone').click(function() {
        injectIntentionIntoUploadFileForm('UPLOAD');
        $('#file_1').trigger('click');
    });
    
    $('#file_upload').fileUploadUI({
       dataType: 'json',
       namespace: 'file_upload',
       fileInputFilter: '#file_1',
       dropZone: $('#dropzone'),
       uploadTable: $('#uploaded-files'),
       downloadTable: $('#uploaded-files'),
       buildDownloadRow: function(data) {
           try {
               if(data[0].uploaded_by_user_id !== 0) {
                   bindUploadAttachmentList(data);
               } else {
                   var file_name = data[0].file_name;
                   alert(file_name + " Is Not An Pdf Or Excel File!");
               }              
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

function bindContractAttachmentOnClickDeleteEvent(contractAttachmentId, fileName, contractId, thisElement) {
    var confirmation = window.confirm("Are You Sure Wanna Delete This Attachment?");
    if(confirmation) {
        showLoading();
        injectIntentionIntoUploadFileForm('DELETE');
        var txtIntention = $('#txtIntention').val();

        var jqXHR = $.ajax({
           url: 'ContractDetailAttachment',
           type: 'POST',
           data: {
                txtIntention,
                fileName,
                contractAttachmentId, 
                contractId
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
            console.log('Fail Deleting Attachment!');
        });

        jqXHR.always(function() {
            hideLoading();
        });
    }    
}

// append list of attachments
function bindUploadAttachmentList(listOfContractAttachmentJson) {
    
    for(var index in listOfContractAttachmentJson) {
        var tbodyUploadFile = $('#uploaded-files');
        var contractAttachmentRow = '<tr>';
        if(listOfContractAttachmentJson[index].file_display_name.split('.')[1] === 'pdf' || listOfContractAttachmentJson[index].file_display_name.split('.')[1] === 'PDF') {
            contractAttachmentRow += '<td class="txtStyleSanRegularMgr" style="padding-left: 0;"><a target="_self" href="#'+listOfContractAttachmentJson[index].file_name+'" onclick="fnOpenPopUpWindow(\'ContractAttachment\', \'../../GetAttachmentFile?attachmentFilePath='+encodeURIComponent(listOfContractAttachmentJson[index].file_path)+'\');">'+listOfContractAttachmentJson[index].file_display_name+"</a></td>";
        } else {
            contractAttachmentRow += '<td class="txtStyleSanRegularMgr" style="padding-left: 0;"><a href="../../GetAttachmentFile?attachmentFilePath='+encodeURIComponent(listOfContractAttachmentJson[index].file_path)+'">'+listOfContractAttachmentJson[index].file_display_name+'</a></td>';
        }        
        contractAttachmentRow += '<td class="txtStyleSanRegularMgr">'+listOfContractAttachmentJson[index].uploaded_by_user_name+'</td>';
        contractAttachmentRow += '<td class="txtStyleSanRegularMgr">'+listOfContractAttachmentJson[index].display_uploaded_date_time_format+'</td>';
        contractAttachmentRow += '<td><img class="logoTbodyTableMgr" id="btnDeleteAttachment" src="../../include/mgr/include/images/MGR-LOGO/delete.png" alt="delete attachment" onclick="bindContractAttachmentOnClickDeleteEvent('+listOfContractAttachmentJson[index].id+', \''+listOfContractAttachmentJson[index].file_name+'\', '+listOfContractAttachmentJson[index].contract_id+', $(this));"></td>';
        contractAttachmentRow += '</tr>';
        
        tbodyUploadFile.append(contractAttachmentRow);
        
    }
}