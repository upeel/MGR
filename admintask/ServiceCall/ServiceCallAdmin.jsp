<%-- 
    Document   : ServiceCallAdmin
    Created on : 21 Aug, 2019, 9:46:05 AM
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
        <title>Service Call</title>
        
        <jsp:include page="../include/include.jsp"/>
        
        <!-- CSS JS -->
        <link href="include/css/ServiceCallAdmin.css?v=${Version.VERSION}" rel="stylesheet" type="text/css"/>    
        <script src="include/js/ServiceCallAdmin.js?v=${Version.VERSION}" type="text/javascript"></script>
    </head>
    <body class="mgrBodyBGColor defaultPosition txtStyleSanRegularMgr">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        <input type="text" id="message" value="${param.message}" readonly hidden>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
             <jsp:param name="formTitle" value="Service Call"></jsp:param>
         </jsp:include>
        
        <div class="defaultBodyContent">
            <form method="POST" id="frm" action="ServiceCallAdmin">
                <table class=" defaultPosition mgrBorderRadius tblWdth100 itemDetailSectionDiv tableMGRRounded bodyAndFormBorderMGR mgrSpace40" cellspacing="0" style="overflow: auto !important;">    
                    <thead class="mgrDataTableThead">
                        <tr>
                            <th colspan="4" style="height: 50px !important; border-radius:  5px;margin-bottom: 20px" class="underline mgrPaddingLeft20">Service Call</th>
                        </tr>
                    </thead>
                    
                    <tbody id="tbodyServiceReport">
                        <tr>
                            <input type="hidden" value="${param.serviceCallId}" name="serviceCallId" readonly>
                            <td class="paddingTop paddingBottom mgrPaddingRight20 mgrPaddingLeft20" style="width: 120px">Date</td>
                            <td colspan="3" class="paddingTop paddingBottom mgrPaddingRight20 mgrPaddingLeft20"><input readonly maxlength="50" type="text" id="date" name="date" class="mgrFormDesign date maxWidth" value="${serviceCall.serviceCallHeader.date}"/></td>
                        </tr>   
                        
                        <tr>
                            <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Ticket No.</td>
                            <td colspan="3" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20"><input readonly maxlength="50" type="text" id="ticketNo" name="ticketNo" class="mgrFormDesign ticketNo maxWidth" value="${serviceCall.serviceCallHeader.ticketNo}"/></td>
                        </tr>  
                        
                        <tr>
                            <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Company Name</td>
                            <td colspan="3" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20"><input readonly maxlength="50" type="text" id="company" name="company" class="mgrFormDesign company maxWidth" value="${serviceCall.serviceCallHeader.companyName}"/></td>
                        </tr> 
                        
                        <tr>
                            <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Serial No.</td>
                            <td colspan="3" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20"><input readonly maxlength="50" type="text" id="serialNo" name="serialNo" class="mgrFormDesign serialNo maxWidth" value="${serviceCall.serviceCallHeader.serialNo}"/></td>
                        </tr> 
                        
                        <tr>
                            <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Contact Person</td>
                            <td colspan="3" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20"><input readonly maxlength="50" type="text" id="contactP" name="contactP" class="mgrFormDesign maxWidth" value="${serviceCall.serviceCallHeader.contactP}"/></td>
                        </tr>
                        
                        <tr>
                            <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Contact Number</td>
                            <td colspan="3" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20"><input readonly maxlength="50" type="text" id="contact" name="contact" class="mgrFormDesign maxWidth" value="${serviceCall.serviceCallHeader.contact}"/></td>
                        </tr> 
                        
                        <tr>
                            <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Email</td>
                            <td colspan="3" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20"><input readonly maxlength="50" type="text" id="email" name="email" class="mgrFormDesign maxWidth" value="${serviceCall.serviceCallHeader.email}"/></td>
                        </tr> 
                        
                        <tr>
                            <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Machine Model</td>
                            <td colspan="3" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20"><input readonly maxlength="50" type="text" id="machieModel" name="machieModel" class="mgrFormDesign machieModel maxWidth" value="${serviceCall.serviceCallHeader.machineModel}"/></td>
                        </tr> 
                        
                        <tr>
                            <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Issue<span class="mandatory">*</span></td>
                            <td colspan="3" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                                <select id="ddlIssue" class="ddlMgr" name="ddlIssue">
                                    <option value="" selected disabled>-- Please Select Issue --</option>
                                    <c:forEach var="issue" items="${listOfIssue}">
                                        <option value="${issue.name}" ${serviceCall.serviceCallHeader.issue eq issue.name ? 'selected' : ''}>
                                            ${issue.name}
                                        </option> 
                                    </c:forEach>
                                </select>
                            </td>
                        </tr> 
                        
                        <tr>
                            <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px; vertical-align: text-top">Remarks</td>
                            <td colspan="3" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20"><textarea class="mgrTextAreaOnTable mgrFormDesign" id="txtRemarks" name="txtRemarks" maxlength="300">${serviceCall.serviceCallHeader.remarks}</textarea></td>
                        </tr> 
                        
                        <tr>
                            <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Submitted By<span class="mandatory">*</span></td>
                            <td colspan="3" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20"><input readonly maxlength="50" type="text" id="txtSubmittedBy" name="txtSubmittedBy" class="mgrFormDesign remarks maxWidth" value="${serviceCall.serviceCallHeader.submittedBy}"/></td>
                        </tr>  
                        
                        <c:choose>
                            <c:when test="${fn:length(serviceCall.serviceCallHeader.serviceCallAttachmentList) eq 0}">
                                <tr>
                                    <td></td>
                                    <td colspan="3" class="paddingBottom" style="text-align: center;">No Attachment Uploaded</td>
                                </tr>
                            </c:when>

                            <c:otherwise>
                                <tr>
                                    <td></td>
                                    <td colspan="3" class="paddingBottom" style="text-align: center;">Attachment</td>
                                </tr>
                                <tr>  
                                    <td class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20"></td>
                                    <td colspan="3" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                                        <div id="imgs" class="defaultBodyContent" style="border: 1px solid #b7b7b7;padding: 10px;border-radius: 5px;display: flex ;justify-content: flex-start;margin-top: 0px !important;">
                                            <c:forEach items="${serviceCallAttachmentList}" var="attachment" varStatus="loop">                                                              
                                                 <img onclick="imgClick(${loop.count});" class="myImg" id="myImg_${loop.count}" src="<c:url value="../../GetAttachmentFile?attachmentFilePath=${attachment.file_path}" />" alt="Image Attachment" style="width:auto;cursor: pointer;height:auto;max-width:120px;min-width:120px ;border-radius: 5px;margin: 10px">                                                                                                               
                                             </c:forEach> 
                                        </div>  
                                    </td>
                                </tr> 
                            </c:otherwise>
                        </c:choose>  
                                    
                        <tr>
                            <td class="mgrPaddingLeft20 paddingBottom" style="width: 120px">Accept Call</td>
                            <td colspan="3" class="paddingBottom mgrPaddingLeft20 mgrPaddingRight20">
                                <select id="ddlAcceptCall" name="ddlAcceptCall" class="ddlacceptCall ddlMgr dropdown">
                                    <option value="" selected disabled>-- Please Select Accept Call --</option>
                                    <option value="BILL" ${serviceCall.serviceCallHeader.accept_call_type == "BILL" ? 'selected' : ''}>Bill</option>
                                    <option value="NO BILL" ${serviceCall.serviceCallHeader.accept_call_type == "NO BILL" ? 'selected' : ''}>No Bill</option>
                                </select>
                            </td>
                        </tr> 
                    </tbody>
                </table>     
                <input type="hidden" id="trLength" name="trLength"/>
             
                <input style="margin-bottom: 20px" type="button" id="btnClose" class="closes update mgrFloatRight txtStyleSanRegularMgr" value="Close">   
            <input style="margin-bottom: 20px" type="button" id="btnConfirm" class="confirm update mgrFloatRight txtStyleSanRegularMgr" value="Confirm">
     
            </form> 
            
                
                      
            
            <!-- The Modal -->
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
