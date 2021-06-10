<%-- 
    Document   : DeliveryAcknowledgement
    Created on : Aug 15, 2019, 11:58:05 PM
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
        <meta name="viewport" content="height=device-height; width=device-width">
        <title>Delivery Acknowledgement</title>
        
        <jsp:include page="../include/include.jsp"/>
        
        <!-- CSS JS -->
        <link href="include/css/DeliveryAcknowledgement.css?v=${Version.VERSION}" rel="stylesheet" type="text/css"/> 
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/admintask/MGRHeader/include/css/MGRHeader.css">
        <script src="include/js/DeliveryAcknowledgement.js?v=${Version.VERSION}" type="text/javascript"></script>
        
        <!-- signature pad resource helper -->
        <link rel="stylesheet" href="${pageContext.request.contextPath}/include/css/jquery.signaturepad.css?v=${Version.VERSION}">  
        <script src="${pageContext.request.contextPath}/include/js/jquery.signaturepad.min.js?v=${Version.VERSION}"></script>
        <script src="${pageContext.request.contextPath}/include/jtable/external/json2.min.js?v=${Version.VERSION}"></script>
    </head>
    
    <body class="mgrBodyBGColor defaultPosition txtStyleSanRegularMgr">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        <input type="text" id="message" value="${param.message}" readonly hidden>
        
        <div style="width: 100%; background-color: #FFFFFF;">
            <table class="formTableForLogoAndTable" style="width: 100%;">
                <tr>
                    <td class="formLogoTableCell">
                        <img class="formLogoImage logoMGR" src="${pageContext.request.contextPath}/include/mgr/include/images/MGR-LOGO/Logo mgr.png" alt="Logo">
                    </td>
                    
                    <td class="formTitleTableCell logoMGRTitleResp">
                        <h2 class="logoMGRTitleResp" style="font-size: 16px;">Delivery Acknowledgement</h2>
                    </td>
                </tr>
            </table>
        </div>
        
        <div class="defaultBody">
            <form method="POST" id="frm" action="DeliveryAcknowledgement">
                <input type="hidden" value="${deliveryAcknowledgementHeader.id}" id="txtDeliveryAcknowledgementId" name="txtDeliveryAcknowledgementId" readonly>
                <input type="hidden" value="${deliveryAcknowledgementHeader.delivery_order_id}" id="txtDeliveryOrderId" name="txtDeliveryOrderId" readonly>
                <div class="defaultPosition mgrBorderRadius tableMGRStyle tableMGRRounded bodyAndFormBorderMGR txtStyleSanRegularMgr" style="overflow: auto !important;">                     
                    <div>
                        <div class="row">
                            <div class="paddingTop mgrPaddingRight20 mgrPaddingLeft20 col-25">
                                Customer Name
                            </div>
                            
                            <div class="col-75 paddingTop paddingBottom mgrPaddingRight20 mgrPaddingLeft20">
                                <input readonly maxlength="50" type="text" id="customerName" name="customerName" class="mgrFormDesign underline inputNo customerName maxWidth" value="${deliveryAcknowledgementHeader.customer_name}">
                            </div>
                        </div>
                            
                        <div class="row">
                            <div class="paddingBottom mgrPaddingRight20 mgrPaddingLeft20 col-25">
                                Delivery Date
                            </div>
                            
                            <div class="paddingBottom mgrPaddingRight20 mgrPaddingLeft20 col-75">
                                <input readonly type="text" class="mgrFormDesign underline inputNo deliveryDate maxWidth" value="${deliveryAcknowledgementHeader.delivery_date}">
                            </div>
                        </div>
                            
                        <div class="row">
                            <div class="paddingBottom mgrPaddingRight20 mgrPaddingLeft20 col-25">
                                DO No.
                            </div>
                            
                            <div class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20 col-75">
                                <input readonly type="text" class="mgrFormDesign underline inputNo invoiceNo maxWidth" value="${deliveryAcknowledgementHeader.do_no}">
                            </div>
                        </div>
                            
                        <div class="row">
                            <div class="paddingBottom mgrPaddingRight20 mgrPaddingLeft20 col-25">
                                Order No.
                            </div>
                            
                            <div class="paddingBottom mgrPaddingRight20 mgrPaddingLeft20 col-75">
                                <input readonly type="text" class="mgrFormDesign underline inputNo orderNo maxWidth" value="${deliveryAcknowledgementHeader.order_no}">
                            </div>
                        </div>
                            
                        <div class="row">
                            <div class="paddingBottom mgrPaddingRight20 mgrPaddingLeft20 col-25">
                                
                            </div>
                            
                            <div style="padding-bottom: 30px !important;" class="paddingBottom mgrPaddingRight20 mgrPaddingLeft20 col-75">
                                <input readonly type="text" class="mgrFormDesign underline inputNo paymentMode maxWidth" value="${deliveryAcknowledgementHeader.payment_mode}">
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- item detail section -->
                <div class="div1 mgrSpace40">
                    <div class="div2">
                        <input type="hidden" id="txtTotalDeliveryItemDetails" name="txtTotalDeliveryItemDetails" value="${totalItem}" readonly>
                        <table id="doItemDetail" class="defaultPosition mgrBorderRadius tblWdth100 itemDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace40" cellspacing="0" style="overflow: auto !important;">
                            <thead class="mgrDataTableThead">
                                <tr>                            
                                    <th style="height: 50px; border-top-left-radius:5px; margin-bottom: 20px; border-right: 1px solid #197b30 !important;" class="mgrPaddingLeft20 textLeft">#</th>
                                    <th class="mgrPaddingLeft20 textLeft" style="min-width: 100px !important; border-right: 1px solid #197b30 !important;">Part No.</th>
                                    <th class="mgrPaddingLeft20 textLeft" style="height: 50px; border-right: 1px solid #197b30 !important;">Item Description</th>
                                    <th class="mgrPaddingLeft20 textLeft" style="height: 50px; border-right: 1px solid #197b30 !important;">Uom</th>
                                    <th class="mgrPaddingLeft20 textLeft" style="height: 50px; min-width: 100px !important; border-right: 1px solid #197b30 !important;">Delivery Qty</th>
                                    <th class="mgrPaddingLeft20 textLeft mgrPaddingRight20" style="height: 50px; border-top-right-radius:5px; min-width: 100px !important">Received Qty</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                <c:forEach var="item" items="${deliveryAcknowledgementHeader.listOfDeliveryOrderItemDetails}" varStatus="loop">
                                    <tr>
                                        <td class="paddingTop paddingBottom mgrPaddingLeft20" >
                                            ${loop.count}.
                                        </td>

                                        <td class="paddingTop paddingBottom mgrPaddingLeft20" >
                                            ${item.part_no}
                                        </td>

                                        <td class="paddingTop paddingBottom mgrPaddingLeft20">
                                            ${item.item_name}
                                        </td>

                                        <td class="paddingTop paddingBottom mgrPaddingLeft20">
                                            ${item.uom}
                                        </td>

                                        <td class="paddingTop paddingBottom mgrPaddingLeft20" style="text-align: right;">
                                            <fmt:formatNumber value="${item.delivery_quantity}" maxFractionDigits="1" groupingUsed="false"/>
                                        </td>

                                        <td class="paddingTop paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                                            <input type="hidden" id="txtDoItemId_${loop.count}" name="txtDoItemId_${loop.count}" value="${item.id}" readonly>
                                            <input type="hidden" id="txtPartNo_${loop.count}" name="txtPartNo_${loop.count}" value="${item.part_no}" readonly>
                                            <input ${deliveryAcknowledgementHeader.status == 'NEED_ACKNOWLEDGEMENT' ? '' : 'readonly'} 
                                                style="text-align: right;" 
                                                type="number"  
                                                id="txtReceivedQty_${loop.count}" 
                                                name="txtReceivedQty_${loop.count}" 
                                                class="mgrFormDesign receiveQty maxWidth"               
                                                data-current="<fmt:formatNumber value="${item.receive_quantity}" maxFractionDigits="1"/>"
                                                value="<fmt:formatNumber value="${item.receive_quantity}" maxFractionDigits="1" groupingUsed="false"/>">    
                                            <input type="hidden" 
                                                   id="txtDeliveryQty_${loop.count}"
                                                   name="txtDeliveryQty_${loop.count}"
                                                   readonly
                                                   value="<fmt:formatNumber value="${item.delivery_quantity}" maxFractionDigits="1" groupingUsed="false"/>">
                                        </td>
                                    </tr>
                                </c:forEach>       
                                    
                            </tbody>
                        </table>
                    </div>
                </div>
              
                <c:choose>
                    <c:when test="${deliveryAcknowledgementHeader.status == 'NEED_LOADED'}">
                        <input style="margin-bottom: 20px" type="button" id="btnLoad" class="update mgrFloatRight txtStyleSanRegularMgr" value="Load">
                    </c:when>

                    <c:when test="${deliveryAcknowledgementHeader.status == 'NEED_ACKNOWLEDGEMENT'}">
                        <table class="mgrSpace40">    
                            <tr>
                                <td>
                                    <label class="checkBoxMgrContainer itemCategory" style="padding-bottom: 5px; ">
                                        Check if Payment has been collected               
                                        <input type="checkbox" class="chkCollected" id="chkCollected" name="chkCollected" data-checked="" value="1">
                                        <span class="checkmarkMgr"></span>                      
                                    </label> 
                                </td>
                            </tr>                        
                        </table>

                        <!-- Acknowledgement addtitional remark -->
                        <table class="mgrSpace40 tblWdth100">    
                            <tr>
                                <td class="mgrPaddingRight20" style="width: 150px;">
                                    <label for="txtAcknowledgementRemarks">Additional Remarks</label>
                                </td>
                            </tr>

                            <tr>
                                <td class="paddingTop1 paddingBottom">
                                    <textarea class="mgrTextAreaOnTable mgrFormDesign" id="txtAcknowledgementRemarks" name="txtAcknowledgementRemarks" maxlength="300"></textarea>
                                </td>
                            </tr>
                        </table>

                        <!--signature section--> 
                        <table class="mgrSpace40 tblWdth100">    
                            <tr>
                                <td class="mgrPaddingRight20" style="width: 150px;">
                                    Customer Signature
                                </td>
                            </tr>
                            <tr>
                                <td class="paddingTop1 paddingBottom">
                                    <div class="sigPad" id="sigPad">
                                        <div class="typed"></div>
                                        <canvas class="pad" style="width: 300px; border: 1px solid #b7b7b7; border-radius: 5px; overflow: hidden;"></canvas>
                                        <input type="hidden" id="txtAcknowledgementSignature" name="txtAcknowledgementSignature" class="output">                                        
                                        <ul class="sigNav">
                                            <li class="clearButton" style="left: 0;">
                                                <a href="#clear" class="txtStyleSanRegularMgr" id="clearSig">Clear</a>
                                            </li>
                                        </ul>
                                    </div> 
                                    
                                </td>
                            </tr>
                        </table>

                        <input style="margin-bottom: 20px" type="button" id="btnConfirm" class="update mgrFloatRight txtStyleSanRegularMgr" value="Confirm">
                    </c:when>
                        
                    <c:otherwise>
                        <table class="mgrSpace40">    
                            <tr>
                                <td>
                                    <label class="checkBoxMgrContainer itemCategory" style="padding-bottom: 5px; ">
                                        Check if Payment has been collected               
                                        <input type="checkbox" class="chkCollected" id="chkCollected" name="chkCollected" data-checked="" value="1" ${deliveryAcknowledgementHeader.payment_collected_status eq 1 ? 'checked' : ''} disabled>
                                        <span class="checkmarkMgr"></span>                      
                                    </label> 
                                </td>
                            </tr>                        
                        </table>

                        <!-- Acknowledgement addtitional remark -->
                        <table class="mgrSpace40 tblWdth100">    
                            <tr>
                                <td class="mgrPaddingRight20" style="width: 150px;">
                                    <label for="txtAcknowledgementRemarks">Additional Remarks</label>
                                </td>
                            </tr>

                            <tr>
                                <td class="paddingTop1 paddingBottom">
                                    <textarea class="mgrTextAreaOnTable mgrFormDesign" id="txtAcknowledgementRemarks" name="txtAcknowledgementRemarks" maxlength="300" disabled>${deliveryAcknowledgementHeader.remarks}</textarea>
                                </td>
                            </tr>
                        </table>

                        <!--signature section--> 
                        <table class="mgrSpace40 tblWdth100">    
                            <tr>
                                <td class="mgrPaddingRight20" style="width: 150px;">
                                    Customer Signature
                                </td>
                            </tr>
                            <tr>
                                <td class="paddingTop1 paddingBottom">
                                    <img src="../../GetAttachmentFile?attachmentFilePath=${deliveryAcknowledgementHeader.signature_photo_file_path}" alt="signature" style="width: 300px;">                                     
                                </td>
                            </tr>
                        </table>
                    </c:otherwise>
                </c:choose>   
            </form>
        </div>     
    </body>
</html>

