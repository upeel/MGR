<%-- 
    Document   : ItemMaster
    Created on : 5 Jul, 2019, 10:33:18 AM
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
        <title>Item Details</title>        
        <!-- include link, src file -->
        <jsp:include page="../include/include.jsp"/>
        
        <!-- css and js -->
        <link rel="stylesheet" type="text/css" href="./include/css/ItemMasterDetail.css">
        <script type="text/javascript" src="./include/js/ItemMasterDetail.js"></script>
    </head>
    <body class="mgrBodyBGColor defaultPosition">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="Item Details"></jsp:param>
        </jsp:include>
        
        <form id="frm" method="POST" action="ItemMasterDetail">
        <div class="defaultBodyContent">
            <!-- item master tab section -->
            <div style="margin: 20px 0;">
                <main>
                    <label class="horizontalLineMgr">
                        &nbsp;
                    </label>
                    
                    <!-- item detail tab section -->
                    <input id="tab1" type="radio" class="tabz" name="tabs" checked>
                    <label for="tab1" class="tabs">
                        <span class="spanLabelMgr" data-value="item_details">
                            <img src="../../include/mgr/include/images/MGR-LOGO/Item Detail Icon.png" alt="item_details" id="item_details" class="logoItemMgr">
                            Item Details
                        </span>
                    </label>
                    <!-- end section -->
                    
                    <!-- item inventory tab section -->
                    <input id="tab2" type="radio" class="tabz" name="tabs">
                    <label for="tab2" class="tabs">
                        <span class="spanLabelMgr" data-value="inventory_details">
                            <img src="../../include/mgr/include/images/MGR-LOGO/Inventory Details Icon.png" alt="inventory_details" id="inventory_details" class="logoItemMgr">
                            Inventory Details
                        </span>
                    </label>
                    <!-- end section -->
                    
                    <!-- stock adjustment tab section -->
                    <input id="tab3" type="radio" class="tabz" name="tabs" hidden>
                    <label for="tab3" class="tabs" hidden>
                        <span class="spanLabelMgr" data-value="stock_adjustment">
                            <img src="../../include/mgr/include/images/MGR-LOGO/Stock Adjustment Icon.png" alt="stock_adjustment" id="stock_adjustment" class="logoItemMgr">
                            Stock Adjustment
                        </span>
                    </label>
                    <!-- end section -->
                    
                    <!-- stock movement tab section -->
                    <input id="tab4" type="radio" class="tabz" name="tabs" hidden>
                    <label for="tab4" class="tabs">
                        <span class="spanLabelMgr" data-value="stock_movement">
                            <img src="../../include/mgr/include/images/MGR-LOGO/Stock Movement Icon.png" alt="stock_movement" id="stock_movement" class="logoItemMgr">
                            Inventory Movement
                        </span>
                    </label>
                    <!-- end section -->
                    
                   
                        <!-- item details content -->
                        <section id="content1">
                            
                            <jsp:include page="./ItemDetails.jsp"/>
                            
                        </section>

                        <!-- inventory details content -->
                        <section id="content2">
                            <jsp:include page="./InventoryDetails.jsp"/>
                        </section>

                        <!-- stock adjustment content -->
                        <section id="content3">
                            <jsp:include page="./StockAdjustment.jsp"/>
                        </section>

                        <!-- stock movement content -->
                        <section id="content4">
                            <jsp:include page="./StockMovement.jsp"/>
                        </section>
                                       
                    <c:choose>
                        <c:when test="${param.txtItemMasterId != null}">
                            <!-- button container -->
                            <div class="mgrSpace100">
                                <input type="button" id="btnUpdateItemDetails" class="mgrFloatRight" value="Update">
                            </div>
                        </c:when>
                        <c:otherwise>
                            <!-- button container -->
                            <div class="mgrSpace100">
                                <input type="button" id="btnUpdateItemDetails" class="mgrFloatRight" value="Create">
                            </div>
                        </c:otherwise>
                    </c:choose>
                    <!-- end section -->
                </main>
            </div>
            <!-- end section -->           
        </div>
        </form>
    </body>
</html>
