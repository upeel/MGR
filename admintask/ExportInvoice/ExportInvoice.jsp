<%-- 
    Document   : ExportInvoice
    Created on : 31 Jul, 2019, 8:55:38 AM
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
        <title>Export Invoice</title>        
        <jsp:include page="../include/include.jsp"/>        
        <!-- CSS JS -->
        <link href="include/css/ExportInvoice.css" rel="stylesheet" type="text/css"/>    
        <script src="include/js/ExportInvoice.js" type="text/javascript"></script>        
    </head>
    
    <body class= "mgrBodyBGColor defaultPosition txtStyleSanRegularMgr">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        <input type="text" id="txtPromptExported" value="${promptExported}" readonly hidden>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
             <jsp:param name="formTitle" value="Export Invoice"></jsp:param>
        </jsp:include>
        
        <div class="defaultBodyContent  divFormMGR bodyAndFormBorderMGR" style="margin-left: 20px; margin-right: 20px; margin-top: 20px; margin-bottom: 20px;" >
            <form id="frm" method="GET" action="ExportInvoice">
                <table class="mgrFormBorderSpacing" style="width: 50%;">
                    <tr>
                        <td>Business Entity: </td>
                        <td class="mgrFormBorderSpacing"></td>
                        <td>
                            <select id="ddlEntityId" name="ddlEntityId">
                                <option value="0" selected disabled>--- Please Select Business Entity ---</option>
                                <c:forEach items="${listOfEntities}" var="entity">
                                    <option value="${entity.id}" ${business_entity_id eq entity.id ? 'selected' : ''}>
                                        ${entity.name}
                                    </option>
                                </c:forEach>
                            </select>
                        </td>
                    </tr>
                    
                    <tr>
                        <td>Invoice Date:</td>
                        <td class="mgrFormBorderSpacing"></td>
                        <td>
                            <input type="text" id="txtInvoiceDate" name="txtInvoiceDate" class="mgrFormDesign" value="${currentDate}" readonly>
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="mgrFormBorderSpacing"></td>
                        <td class="mgrFormBorderSpacing"></td>
                        <td> 
                            <input type="button" id="btnExportInvoice" class="mgrFloatRight" value="Export">
                        </td>
                    </tr>
                </table>               
            </form>              
        </div>
    </body>
</html>
