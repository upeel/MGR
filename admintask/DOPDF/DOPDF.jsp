<%-- 
    Document   : DOPDF
    Created on : 31 Jul, 2019, 12:00:30 PM
    Author     : Wildan
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://sargue.net/jsptags/time" prefix="javatime" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
         <!-- include link,src file --> 
        <jsp:include page="../include/include.jsp"/>
        <script type="text/javascript">
            $(document).ready(function() {
               $('#btnSubmit').click(function() {
                   $('form').submit();
               });
            });
        </script>
    </head>
    <body class="mgrBodyBGColor defaultPosition">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="DO PDF"></jsp:param>
        </jsp:include>
        
        <form method="POST" action="DOPDF">
            <input type="button" id="btnSubmit" value="submit">
        </form>
    </body>
</html>
