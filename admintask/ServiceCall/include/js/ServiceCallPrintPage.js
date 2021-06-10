/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


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
