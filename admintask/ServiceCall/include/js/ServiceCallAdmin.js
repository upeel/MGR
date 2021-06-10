/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    bindBtnConfirmOnClick();
    bindBtnCloseOnClick();    
});

window.onunload = function(){
  window.opener.location.reload();
};

function bindBtnConfirmOnClick() {
    $('#btnConfirm').click(function() {
        // validate first
        var issue = $('#ddlIssue');
        var acceptCall = $('#ddlAcceptCall');
        
        if(issue.children('option:selected').val() === '') {
            alert('Please Select Issue!');
            scrollTo(issue.attr('id'));
            issue.focus();
            return false;
        }
        
        if(acceptCall.children('option:selected').val() === '') {
            alert('Please Select Service Accept Call.');
            scrollTo(acceptCall.attr('id'));
            acceptCall.focus();
            return false;
        }
        
        showLoading();
        injectIntentionInputElementIntoForm('CONFIRM');
        var confirmation = window.confirm('Are you sure want to confirm this service call?');
        if(!confirmation)
        {
            $("#dvLoading").hide();
            $("#overlay").hide();
            return false;
        }
        $('#frm').submit();
    });
}

function bindBtnCloseOnClick() {
    $('#btnClose').click(function() {
        showLoading();
        injectIntentionInputElementIntoForm('CLOSE');
        var confirmation = window.confirm('Are you sure want to terminate this service call?');
        if(!confirmation)
        {
            $("#dvLoading").hide();
            $("#overlay").hide();
            return false;
        }
        $('#frm').submit();
    });
}

var current;

document.addEventListener("keyup", function(event){
   if(event.keyCode === 39)
   {
       var currentImg = $('#img01').attr('src');
       var lastImg = $('#imgs img:last').attr('src');
       if(currentImg !== lastImg)
       {
           $(".next").click();
       }       
   }
   else if(event.keyCode === 37)
   {
       var currentImg = $('#img01').attr('src');
       var firstImg = $('#imgs img:first').attr('src');
       if(currentImg !== firstImg)
       {
           $('.previous').click();
       }        
   }
   else if(event.keyCode === 27)
   {
        zoomOut();
   }
});

function zoomOut(){
    $('.modal img').removeClass('zoomIn');
    $('.modal img').addClass('zoomOut');
    $('.modal').fadeOut();
    $('.next').removeClass('zoomIn');
    $('.next').addClass('zoomOut');
    $('.previous').removeClass('zoomIn');
    $('.previous').addClass('zoomOut');    
    $('.next').fadeOut('fast');
    $('.previous').fadeOut('fast');
    $('.close').removeClass('zoomIn');
    $('.close').addClass('zoomOut');
    $('.close').fadeOut();
}

function zoomin(){
    $('.modal img').removeClass('zoomOut');
    $('.modal img').addClass('zoomIn');
    $('.modal').fadeIn('fast');
    $('.next').removeClass('zoomOut');
    $('.next').addClass('zoomIn');
    $('.previous').removeClass('zoomOut');
    $('.previous').addClass('zoomIn');    
    $('.next').fadeIn('fast');
    $('.previous').fadeIn('fast');
    $('.close').removeClass('zoomOut');
    $('.close').addClass('zoomIn');
    $('.close').fadeIn();
}

function hidePrev(){
    $('.previous').removeClass('zoomIn');
    $('.previous').addClass('zoomOut');
    $('.previous').fadeOut('fast');
}

function showPrev(){
    $('.previous').removeClass('zoomOut');
    $('.previous').addClass('zoomIn');
    $('.previous').fadeIn('fast');
}

function hideNext(){
    $('.next').removeClass('zoomIn');
    $('.next').addClass('zoomOut');
    $('.next').fadeOut('fast');
}

function showNext(){
    $('.next').removeClass('zoomOut');
    $('.next').addClass('zoomIn');
    $('.next').fadeIn('fast');
}

function imgClick(id){ 
        var checkImg = $('#imgs img').length;
        var firstImage = $('#imgs img:first').attr('src');
        var lastImage = $('#imgs img:last').attr('src');
        var wow = $('#myImg_'+id);  
        $('#img01').removeAttr('src');        
        $('#img01').attr('src', $(wow).attr('src'));
        zoomin();
        
        if($(wow).attr('src') === lastImage)
            {
                $('.next').hide();
            }
            
        if($(wow).attr('src') === firstImage)
            {
                $('.previous').hide();
            }
        if (parseInt(checkImg) === 1)
            {
                $('.next').hide();
                $('.previous').hide();
            }
            current = id;
            onClick();
}

function onClick(){
     $('#next_1').on('click', function(event){
            showPrev();
            var lastImage = $('#imgs img:last').attr('src');            
            var wow = $('img#myImg_' + current).next();            
            current++;
            $('#img01').removeAttr('src');        
            $('#img01').attr('src', wow.attr('src'));    
            if($('#img01').attr('src') === lastImage)
            {
                hideNext();                
            }
            event.stopImmediatePropagation();
        });
        
        $('.previous').on('click', function(event){
            showNext();
            
            var firstImage = $('#imgs img:first').attr('src');
            var wow = $('img#myImg_' + current).prev();         
            current--;
            $('#img01').removeAttr('src');            
            $('#img01').attr('src', wow.attr('src'));
            if($('#img01').attr('src') === firstImage)
            {
                hidePrev();
            }
            event.stopImmediatePropagation();
        });
        
        $('.close').click(function(){
            zoomOut();
        });
        
        $('#myModal').click(function(){
            zoomOut();
        });
}


