<%-- 
    Document   : message
    Created on : Jul 10, 2017, 4:08:00 PM
    Author     : See Rong
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html>
    <head>
        <link rel="icon" href="../favicon.ico"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Message</title>
        <script type="text/javascript">
            var url = '${url}';
            var inv_id = '${inv_id}';
            var messages = '${message}';
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
            
            function refreshParent() {
                if(window.opener && window.opener.document) {
                    window.opener.location.href = window.opener.location;
                }
            }
            
            function openMaxWindow(url, name) {
                window.open("../../GetAttachmentFile?attachmentFilePath=" + url , '_blank', getWindowsArgument());
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
            
            function closeMe() {
                var win = window.open("", "_self");
                win.close();
            }
        </script>
    </head>
    <body>
        <!--this will fire when the message is passed via request forwarding-->
        <!--E.g. request.setAttribute("message", "some message");-->
        <c:if test="${not empty message}"> 
            <script type="text/javascript">
                alert("<c:out value="${message}"/>");
                
                if(inv_id !== '') {
                    fnOpenPopUpWindow('Invoice', '../Invoice/Invoice?inv_id='+inv_id);
                }
                if(url !== '')
                {
                    openMaxWindow(url, '');
                }   
                closeMe();
            </script>
        </c:if>

        <!--this will fire when the message is passed via response redirect-->
        <!--E.g. message.jsp?message=some message-->
        <c:if test="${not empty param.message}">
            <script type="text/javascript">
                alert("<c:out value="${param.message}"/>");
                if(inv_id !== '') {
                    fnOpenPopUpWindow('Invoice', './Invoice/Invoice?inv_id='+inv_id);
                }
                if(url !== '') 
                {
                    openMaxWindow(url, '');
                }
//                refreshParent();             
                closeMe();
            </script>
        </c:if>
    </body>
</html>
