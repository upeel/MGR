<%-- 
    Document   : ServiceCallPrintPage
    Created on : Aug 15, 2019, 11:56:29 PM
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
        <title>Service Call</title>
        
        <jsp:include page="../include/include.jsp"/>
        
        <!-- css js -->
        <link rel="stylesheet" type="text/css" href="./include/css/ServiceCallPrintPage.css">
        <script type="text/javascript" src="./include/js/ServiceCallPrintPage.js"></script>
    </head>
    <body class="mgrBodyBGColor defaultPosition txtStyleSanRegularMgr">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        <input type="text" id="message" value="${param.message}" readonly hidden>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
             <jsp:param name="formTitle" value="Service Call"></jsp:param>
        </jsp:include>
        
        <div class="defaultBodyContent">
            <table class="defaultPosition mgrBorderRadius tblWdth100 itemDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace40" cellspacing="0" style="overflow: auto !important;">
                <thead class="mgrDataTableThead">
                    <tr>
                        <th colspan="4" style="height: 50px !important; border-radius: 5px; margin-bottom: 20px;" class="underline mgrPaddingLeft20">
                            Service Call
                        </th>
                    </tr>
                </thead>
                
                <tbody id="tbodyServiceReport">
                    <tr>
                        <input type="hidden" id="txtServiceCallId" value="${serviceCallHeader.id}" readonly hidden> 
                        <td class="paddingTop paddingBottom mgrPaddingRight20 mgrPaddingLeft20" style="width: 120px;">
                            Date
                        </td>
                        
                        <td colspan="3" class="paddingTop paddingBottom mgrPaddingRight20 mgrPaddingLeft20">
                            <input type="text" id="txtDate" class="mgrFormDesign txtDate maxWidth" value="${serviceCallHeader.date}" readonly>
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px;">
                            Ticket No.
                        </td>
                        
                        <td colspan="3" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                            <input type="text" id="txtTicketNo" class="mgrFormDesign" value="${serviceCallHeader.ticketNo}" readonly>
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px;">
                            Company Name
                        </td>
                        
                        <td colspan="3" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                            <input type="text" id="txtCompany" class="mgrFormDesign" value="${serviceCallHeader.companyName}" readonly>
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px;">
                            Serial No.
                        </td>
                        
                        <td colspan="3" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                            <input type="text" id="txtSerialNo" class="mgrFormDesign" value="${serviceCallHeader.serialNo}" readonly>
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px;">
                            Contact Person
                        </td>
                        
                        <td colspan="3" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                            <input type="text" id="txtContactP" class="mgrFormDesign" value="${serviceCallHeader.contactP}" readonly>
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px;">
                            Contact Number
                        </td>
                        
                        <td colspan="3" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                            <input type="text" id="txtContact" class="mgrFormDesign" value="${serviceCallHeader.contact}" readonly>
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px;">
                            Email
                        </td>
                        
                        <td colspan="3" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                            <input type="text" id="txtEmail" class="mgrFormDesign" value="${serviceCallHeader.email}" readonly>
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px;">
                            Machine Model
                        </td>
                        
                        <td colspan="3" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                            <input type="text" id="txtMachineModel" class="mgrFormDesign" value="${serviceCallHeader.machineModel}" readonly>
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px;">
                            Issue
                        </td>
                        
                        <td colspan="3" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                            <input type="text" id="txtIssue" class="mgrFormDesign" value="${serviceCallHeader.issue}" readonly>
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px; vertical-align: text-top;">
                            Remarks
                        </td>
                        
                        <td colspan="3" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                            <textarea class="mgrTextAreaOnTable mgrFormDesign" id="txtRemarks" readonly>${serviceCallHeader.remarks}</textarea>
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px;">
                            Submitted By
                        </td>
                        
                        <td colspan="3" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                            <input type="text" id="txtSubmittedBy" class="mgrFormDesign" value="${serviceCallHeader.submittedBy}" readonly>
                        </td>
                    </tr>
                    
                    <c:choose>
                        <c:when test="${fn:length(serviceCallHeader.serviceCallAttachmentList) == 0}">
                            <tr>
                                <td></td>
                                <td colspan="3" class="paddingBottom" style="text-align: center;">
                                    No Attachment Upload
                                </td>
                            </tr>
                        </c:when>
                        
                        <c:otherwise>
                            <tr>
                                <td></td>
                                <td colspan="3" class="paddingBottom" style="text-align: center;">
                                    Attachment
                                </td>
                            </tr>
                            
                            <tr>
                                <td class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20"></td>
                                <td colspan="3" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                                    <div id="imgs" class="defaultBodyContent" style="border: 1px solid #b7b7b7; padding: 10px; border-radius: 5px; display: flex; justify-content: flex-start; margin-top: 0px !important;">
                                        <c:forEach var="attachment" items="${serviceCallHeader.serviceCallAttachmentList}" varStatus="loop">
                                            <img onclick="imgClick(${loop.count});" class="myImg" id="myImg_${loop.count}" src="../../GetAttachmentFile?attachmentFilePath=${attachment.file_path}" alt="img_${loop.count}" style="width:auto;cursor: pointer;height:auto;max-width:120px;min-width:210px ;border-radius: 5px;margin: 10px;">
                                        </c:forEach>
                                    </div>
                                </td>
                            </tr>
                        </c:otherwise>
                    </c:choose>
                            
                    <tr>
                        <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px;">
                            Accept Call
                        </td>
                        
                        <td colspan="3" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                            <input type="text" id="txtAcceptCall" class="mgrFormDesign" value="${serviceCallHeader.accept_call_type == 'BILL' ? 'Bill' : 'No Bill'}" readonly>
                        </td>
                    </tr>
                    
                    <tr>
                        <td colspan="4" style="text-align: center; text-decoration: underline;" class="mgrPaddingLeft20 paddingBottom mgrPaddingRight20">
                            
                        </td>
                    </tr>
                </tbody>
            </table>
                        
            <table class="defaultPosition mgrBorderRadius tblWdth100 itemDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace40" cellspacing="0" style="overflow: auto !important;">
                <thead class="mgrDataTableThead">
                    <tr>
                        <th colspan="4" style="height: 50px !important; border-bottom: 1px solid #FFFFFF; margin-bottom: 20px;" class="mgrPaddingLeft20">
                            List Of Service Reports.
                        </th>
                    </tr>
                    
                    <tr>
                        <th style="text-align: left; padding-left: 20px; border-bottom: 1px solid #FFFFFF; height: 50px !important; margin-bottom: 20px;" class="underline">
                            No.
                        </th>
                        
                        <th style="text-align: left; padding-left: 20px; border-bottom: 1px solid #FFFFFF; height: 50px !important; margin-bottom: 20px;" class="underline">
                            Job No
                        </th>
                        
                        <th style="text-align: left; padding-left: 20px; border-bottom: 1px solid #FFFFFF; height: 50px !important; margin-bottom: 20px;" class="underline">
                            Verified By
                        </th>
                        
                        <th style="text-align: left; padding-left: 20px; border-bottom: 1px solid #FFFFFF; padding-right: 20px; height: 50px !important; margin-bottom: 20px;" class="underline">
                            Service Date
                        </th>
                    </tr>
                </thead>
                
                <tbody id="tbodyServiceReport">
                    <c:if test="${fn:length(serviceCallHeader.listOfServiceReportHeaders) == 0}">
                        <tr>
                            <td colspan="4" class="paddingTop paddingBottom mgrPaddingLeft20 mgrPaddingRight20" style="text-align: center;">
                                No Service Report Yet On This Service Call
                            </td>
                        </tr>
                    </c:if>
                    
                    <c:if test="${fn:length(serviceCallHeader.listOfServiceReportHeaders) > 0}">
                        <c:forEach var="serviceReport" items="${serviceCallHeader.listOfServiceReportHeaders}" varStatus="loop">
                            <tr>
                                <td class="paddingTop paddingBottom mgrPaddingLeft20">
                                    ${loop.count}.
                                </td>
                                
                                <td class="paddingTop paddingBottom mgrPaddingLeft20">
                                    <a class="removeGarbage" onclick="fnOpenPopUpWindow('Service Report Print Page', '../ServiceReport/ServiceReportPrintPage?service_report_id='+${serviceReport.id})">${serviceReport.job_no}</a>
                                </td>
                                
                                <td class="paddingTop paddingBottom mgrPaddingLeft20">
                                    ${serviceReport.verified_by}
                                </td>
                                
                                <td class="paddingTop paddingBottom mgrPaddingLeft20">
                                    ${serviceReport.service_date}
                                </td>
                            </tr>
                        </c:forEach>
                    </c:if>
                </tbody>
            </table>
                        
            <!-- the modal -->
            <div id="myModal" class="modal">
                <div class="whiteWrapper">
                    <img class="zoomIn modalImg modal-content" id="img01">
                </div>
            </div>
            <span style="border-radius: 6px;display: none !important;position: fixed;z-index: 1;padding: 10px;" class="close">&times;</span>
            <span style="border-radius: 6px;display: none !important;position: fixed;z-index: 1;background-color: green; vertical-align: middle; margin-bottom: 20px" class="next" id="next_1">></span>
            <span style="border-radius: 6px;display: none !important;position: fixed;z-index: 1; background-color: green ; vertical-align: middle; margin-bottom: 20px" class="previous"><</span>
        </div>
    </body>
</html>
