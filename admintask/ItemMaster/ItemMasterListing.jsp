<%-- 
    Document   : ItemMasterListing
    Created on : 5 Jul, 2019, 10:33:04 AM
    Author     : SteWildanven
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
        <title>Item Master</title>
        
        <!-- include link,src file --> 
        <jsp:include page="../include/include.jsp"/>

        <!-- css and js-->
        <link rel="stylesheet" href="./include/css/ItemMasterDetail.css" type="text/css">
        <script type="text/javascript" src="./include/js/ItemMaster.js"></script>
    </head>
    <body class="mgrBodyBGColor defaultPosition">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="Item Master"></jsp:param>
        </jsp:include>
        
        <div class="defaultBodyContent">
            <form id="frm" method="GET" action="ItemMaster">
                
            </form>
        </div>
    </body>
</html>
