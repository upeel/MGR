<%-- 
    Document   : ServiceCallAtConfirmation
    Created on : 7 Aug, 2019, 2:50:27 PM
    Author     : Wildan
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://sargue.net/jsptags/time" prefix="javatime" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<%@ page import="com.bizmann.utility.Version" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
        <title>Service Call</title>
        
        <jsp:include page="../include/include.jsp"/>
        
        <!-- CSS JS -->
        <link href="include/css/ServiceCallAtConfirmation.css?v=${Version.VERSION}" rel="stylesheet" type="text/css"/>    
        <script src="include/js/ServiceCallAtConfirmation.js?v=${Version.VERSION}" type="text/javascript"></script>
        
    </head>
    <body class="mgrBodyBGColor defaultPosition">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="Service Call"></jsp:param>
        </jsp:include>
        
        <form id="frm" method="POST" action="ServiceCallAtConfirmation">
         <div class="defaultBodyContent">
             <div class="defaultPosition">
                    <table class="defaultPosition mgrBorderRadius tblWdth100 divFormMGR tableMGRStyle mgrSpace50 tableMGRRounded bodyAndFormBorderMGR txtStyleSanRegularMgr" cellspacing="0">
                        <tr>
                            <td class="mgrTdPadTopBot20">
                                <input type="hidden" value="${param.serviceCallId}" name="serviceCallId" readonly>
                                Date
                            </td>
                            
                            <td class="mgrTdPadTopBot20">
                                <input type="text" id="txtDate" class="mgrFormDesign" name="txtDate" value="${serviceCall.serviceCallHeader.date}" readonly>
                            </td>
                        </tr>
                        <tr>
                            <td class="mgrTdPadTopBot20">
                                Ticket No.
                            </td>
                            
                            <td class="mgrTdPadTopBot20">
                               <input type="text" id="txtTicket" class="mgrFormDesign" name="txtTicket" value="${serviceCall.serviceCallHeader.ticketNo}" readonly>                 
                            </td>
                        </tr>
                        <tr>
                            <td class="mgrTdPadTopBot20">
                                Company Name
                            </td>
                            
                            <td class="mgrTdPadTopBot20">
                                <input type="text" id="txtCompanyName" class="mgrFormDesign" name="txtCompanyName" value="${serviceCall.serviceCallHeader.companyName}" readonly>
                            </td>
                        </tr>
                        <tr>
                            <td class="mgrTdPadTopBot20">
                                Serial No
                            </td>
                            
                            <td class="mgrTdPadTopBot20">
                                <input type="text" id="txtSerial" class="mgrFormDesign" name="txtSerial" value="${serviceCall.serviceCallHeader.serialNo}" readonly>
                            </td>
                        </tr>
                        
                        <tr>
                            <td class="mgrTdPadTopBot20">
                                Contact Person
                            </td>
                            
                            <td class="mgrTdPadTopBot20">
                                <input type="text" id="txtContactP" class="mgrFormDesign" name="txtContactP" value="${serviceCall.serviceCallHeader.contactP}" readonly>
                            </td>
                        </tr>
                        
                        <tr>
                            <td class="mgrTdPadTopBot20">
                                Contact Number
                            </td>
                            
                            <td class="mgrTdPadTopBot20">
                                <input type="text" id="txtContact" class="mgrFormDesign" name="txtContact" value="${serviceCall.serviceCallHeader.contact}" readonly>
                            </td>
                        </tr>
                        <tr>
                            <td class="mgrTdPadTopBot20">
                               Machine Model
                            </td>
                            
                            <td class="mgrTdPadTopBot20">
                                <input type="text" id="txtMachineModel" class="mgrFormDesign" name="txtMachineModel" value="${serviceCall.serviceCallHeader.machineModel}" readonly>
                            </td>
                        </tr>
                        
                        <tr>
                            <td class="mgrTdPadTopBot20">
                                Issue <span class="mandatory">*</span>
                            </td>
                            
                            <td class="mgrTdPadTopBot20">
                                <select id="txtIssue" class="mgrFormDesign dropdown" name="txtIssue" >
                    
                                    <c:forEach var="issue" items="${listOfIssue}">
                                        <option value="${issue.name}" ${serviceCall.serviceCallHeader.issue eq issue.name ? 'selected' : ''} disabled>
                                            ${issue.name}
                                        </option> 
                                    </c:forEach>
                                </select>
                            </td>
                        </tr>
                        
                        <tr>
                            <td class="mgrTdPadTopBot20">
                                Remarks
                            </td>
                            
                            <td class="mgrTdPadTopBot20">
                                <input type="text" id="txtRemarks" class="mgrFormDesign" name="txtRemarks" value="${serviceCall.serviceCallHeader.remarks}" readonly>
                            </td>
                        </tr>
                        
                        <tr>
                            <td class="mgrTdPadTopBot20">
                                Submitted By <span class="mandatory">*</span>
                            </td>
                            
                            <td class="mgrTdPadTopBot20">
                                <input type="text" id="txtSubmittedBy" class="mgrFormDesign" name="txtSubmittedBy" value="${serviceCall.serviceCallHeader.submittedBy}" readonly>
                            </td>
                        </tr>
                        <tr>
                            <td class="mgrTdPadTopBot20">
                                Attachment
                            </td>    
                            <td class="mgrTdPadTopBot20">                                                      
                                        <c:forEach items="${serviceCallAttachmentList}" var="serviceCallAttachment">
                                                   <tr>
                                                       <td class="txtStyleSanRegularMgr" style="padding-left: 0;">
                                                           <c:url value="../../GetAttachmentFile" var="serviceCall">
                                                               <c:param name="attachmentFilePath" value="${serviceCallAttachment.file_path}"/>
                                                           </c:url>
                                                           <a href="#${serviceCallAttachment.file_name}" onclick="fnOpenPopUpWindow('ServiceCallAttachment', '${serviceCall}');">${serviceCallAttachment.file_display_name}</a>
                                                       </td>
                                                   </tr>
                                               </c:forEach>                                
                            </td> 
                        </tr>
                        <tr>
                            <td class="mgrTdPadTopBot20">
                                Accept Call
                            </td>
                            <td class="mgrTdPadTopBot20">
                                <select id="acceptCall" name="acceptCall" class="mgrFormDesign">
                                    <option value="BILL">Bill</option>
                                    <option value="NO BILL">No Bill</option>
                                </select>
                            </td>
                        </tr>
                      
                   </table>
                  <c:if test="${serviceCall.serviceCallHeader.status == 'Reported'}">
                  <div class="buttons">
                   <input type="button" id="btnConfirm" value="Confirm">
                   <input type="button"  id="btnClose" value="Close">
                  </div>
                  </c:if>
                  <br/>
            <br/>
             </div>
         </div>
        </form>
    </body>
</html>
