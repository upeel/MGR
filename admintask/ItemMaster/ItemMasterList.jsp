<%-- 
    Document   : ItemList
    Created on : 8 Jul, 2019, 2:47:23 PM
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
        <title>Item Master List</title>
        
        <!-- include link,src file --> 
        <jsp:include page="../include/include.jsp"/>
        
        <!-- css and js-->
        <link rel="stylesheet" href="./include/css/ItemMasterList.css" type="text/css">
        <script type="text/javascript" src="./include/js/ItemMasterList.js"></script>
    </head>
    <body class="mgrBodyBGColor defaultPosition">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="Item Master List"></jsp:param>
        </jsp:include>
        
        <div class="defaultBodyContent">   
            <form id="frm" method="POST" action="../ItemMasterImportData/ItemMasterImportData" enctype="multipart/form-data">
            <table id="asd" style="width: 10%;">
                    <tr>
                        <td style="padding-left: 10px;">
                            <input type="file" id="file" name="file" accept=".xlsx">
                        </td>
                        
                        <td>
                            <input type="button" id="btnImport" name="btnImport" class="btnMGRStyle" style="width: 70px !important;" value="Import">
                        </td>
                        <td style="width: 10%;">
                            <input type="button" value="New" id="btnAddNew" class="btnMGRStyle asd" onclick="fnOpenPopUpWindow('ItemMasterDetail','ItemMasterDetail')"> 
                        </td>
                    </tr>
                </table>
            </form>
            <table id="dtItemMasterList" class="formTable compact hover tableMGRStyle" style="bottom: 110px !important; position: relative">
                <thead class="mgrDataTableThead">
                    <tr>
                        <th hidden></th>
                        <th class="mgrTxtAlignLeft">No.</th>
                        <th class="mgrTxtAlignLeft">Item Code</th>
                        <th class="mgrTxtAlignLeft">Item Name</th>
                        <th class="mgrTxtAlignLeft">Item Description</th>
                        <th class="mgrTxtAlignLeft">Item Type</th>
                        <th class="mgrTxtAlignLeft">Item Group</th>
                        <th class="mgrTxtAlignLeft">Stock At Hand</th>
<!--                        <th class="mgrTxtAlignLeft">Myob Code</th>-->
                        <th class="mgrTxtAlignLeft">Status</th>
                    </tr>
                </thead>      
                
                <tfoot style="display: none !important;">
                    <tr>
                        <th hidden></th>
                        <th class="mgrTxtAlignLeft">No.</th>
                        <th class="mgrTxtAlignLeft">Item Code</th>
                        <th class="mgrTxtAlignLeft">Item Name</th>
                        <th class="mgrTxtAlignLeft">Item Description</th>
                        <th class="mgrTxtAlignLeft">Item Type</th>
                        <th class="mgrTxtAlignLeft">Item Group</th>
                        <th class="mgrTxtAlignLeft">Stock At Hand</th>
<!--                        <th class="mgrTxtAlignLeft">Myob Code</th>-->
                        <th class="mgrTxtAlignLeft">Status</th>
                    </tr>
                </tfoot>                
                <tbody>
                    <c:forEach items="${listOfItemMaster}" var="itemMaster" varStatus="loop">
                        <tr onclick="fnOpenPopUpWindow('ItemMasterDetail','ItemMasterDetail?txtItemMasterId=${itemMaster.id}')">
                            <td hidden><input type="hidden" id="txtItemMasterId" name="txtItemMasterId" value="${itemMaster.id}"></td>
                            <td>${loop.count}</td>
                            <td>${itemMaster.code}</td>
                            <td>${itemMaster.name}</td>
                            <td>${itemMaster.description}</td>
                            <td>${itemMaster.item_type_name}</td>
                            <td>${itemMaster.item_group_name}</td>
<!--                            <td>${itemMaster.myob_code}</td>-->
                            <td>
                                <fmt:formatNumber value="${itemMaster.itemBalance}" type="number" minFractionDigits="2"/></td>
                            <td>${itemMaster.statusName}</td>
                        </tr>
                    </c:forEach>
                    
                </tbody>
            </table>
        </div>
    </body>
</html>
