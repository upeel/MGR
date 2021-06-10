<%-- 
    Document   : DeliveryAcknowledgementMessageResponsive
    Created on : 26 Aug, 2019, 9:47:17 AM
    Author     : Wildan
--%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://sargue.net/jsptags/time" prefix="javatime" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="height=device-height,width=device-width">
        <title>Delivery Acknowledgement</title>
        
        <jsp:include page="../include/include.jsp"/>
    </head>
    <body class="mgrBodyBGColor defaultPosition txtStyleSanRegularMgr" style="line-height: 100%;"> 
        <style>
            .box {
            width:400px;
            background-color: #ffffff;
            height:200px;
            position:fixed;
            margin-left:-200px; /* half of width */
            margin-top:-100px;  /* half of height */
            top:50%;
            left:50%;
        }
        </style>
        <table class="box defaultPosition mgrBorderRadius tblWdth100 itemDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace40" cellspacing="0" style="overflow: auto !important;">
            <tr>
                <td style="text-align: center;"> 
                    ${message}
                </td>
            </tr>            
        </table>
    </body>
</html>
