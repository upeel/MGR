<%-- 
    Document   : ServiceReportPDF
    Created on : 29 Aug, 2019, 6:03:00 PM
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
            <jsp:param name="formTitle" value="Service Report PDF"></jsp:param>
        </jsp:include>
        
        <form method="POST" action="ServiceReportPDF">
            <input type="button" id="btnSubmit" value="submit">
        </form>
    </body>
</html>
