<%-- 
    Document   : ItemMasterImportData
    Created on : 11 Oct, 2019, 4:04:53 PM
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
        <title>Item Master Import Data</title>
        
        <!-- include link,src file --> 
        <jsp:include page="../include/include.jsp"/>
        
        <!-- resource css, js -->
        <script src="./include/js/ItemMasterImportData.js" type="text/javascript"></script>
    </head>
    <body class="mgrBodyBGColor defaultPosition">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="Item Master Import Data"></jsp:param>
        </jsp:include>
        
        <div class="defaultPosition divFormMGR contractDetailSectionDiv bodyAndFormBorderMGR mgrSpace40" style="margin-top: 20px;">
            <form id="frm" method="POST" action="ItemMasterImportData" enctype="multipart/form-data">
                <table>
                    <tr>
                        <td>
                            <select id="ddlEntityId" name="ddlEntityId">
                                <c:forEach var="entity" items="${listOfEntityHeaders}">
                                    <option value="${entity.id}">
                                        ${entity.name}
                                    </option>
                                </c:forEach>
                            </select>
                        </td>
                        
                        <td>
                            <input type="file" id="file" name="file" accept=".xlsx">
                        </td>
                        
                        <td>
                            <input type="button" id="btnImport" name="btnImport" class="btnMGRStyle" value="Import">
                        </td>
                    </tr>
                </table>                                
            </form>
        </div>
    </body>
</html>
