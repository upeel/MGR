<%-- 
    Document   : ServiceCallAtInitiator
    Created on : 7 Aug, 2019, 2:48:44 PM
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
        <meta name="viewport" content="height=device-height,width=device-width">
        <title>Service Call</title>
        
        <jsp:include page="../include/include.jsp"/>
        
        <!-- attachment section -->
        <jsp:include page="./ServiceCallAttachment.jsp"/>
        
        <!-- CSS JS -->
        <link href="./include/css/ServiceCallAtInitiator.css?v=${Version.VERSION}" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/admintask/MGRHeader/include/css/MGRHeader.css">
        <script src="./include/js/ServiceCallAtInitiator.js" type="text/javascript"></script>
        
    </head>
    <body class="mgrBodyBGColor defaultPosition">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        
     <div style="width: 100%; background-color: #ffffff;">
            <table class="formTableForLogoAndTable" style="width: 100%;">
                <tr>
                    <td class="formLogoTableCell">
                        <img class="formLogoImage logoImageMGRResp" src="${pageContext.request.contextPath}/include/mgr/include/images/MGR-LOGO/Logo mgr.png" alt="Logo">
                    </td>
                    
                    <td class="formTitleTableCell logoMGRTitleResp">
                        <h2 class="logoMGRTitleResp">Service Call</h2>
                    </td>
                </tr>
            </table>
        </div>
        
        <form id="frm" method="POST" action="ServiceCallAtInitiator">
        <div class="defaultBody">
            <div class="defaultPosition mgrBorderRadius tableMGRStyle tableMGRRounded bodyAndFormBorderMGR txtStyleSanRegularMgr" cellspacing="0">
                <div class="mgrDataTableThead">           
                    <div class="mgrTdPadTopBot20" style="text-align: center; width: 100%;">
                        Service Call
                    </div>
                </div>
                
                <div class="divFormMGR">
                    <div class="row">
                       <div class="mgrTdPadTopBot20 col-25">

                           <label for="date">Date</label>
                       </div>

                       <div class="col-75 mgrTdPadTopBot15">
                           <input type="hidden" id="txtMdsMachineId" name="txtMdsMachineId" value="${param.contract_mds_id}" readonly>
                           <input type="hidden" id="txtCustomerId" name="customer_id" value="${param.customer_id}" readonly>
                           <input type="hidden" id="txtReferenceNo" name="txtReferenceNo" value="${refNo}" readonly>
                           <input type="text" id="txtDate" class="mgrFormDesign" name="txtDate" value="<javatime:format value="${dateNow}" pattern="dd/MM/yyyy"/>" readonly>

                       </div>
                    </div>
                           
                    <div class="row">
                        <div class="mgrTdPadTopBot20 col-25">
                            <label for="ticketNo">Ticket No.</label>
                        </div>

                        <div class="col-75 mgrTdPadTopBot15">
                           <input type="text" id="txtTicket" class="mgrFormDesign" name="txtTicket" value="${ticketNo}" readonly>                 
                        </div>
                    </div>
                        
                    <div class="row">
                        <div class="mgrTdPadTopBot20 col-25">
                            <label for="companyName">Company Name</label>
                        </div>

                        <div class="col-75 mgrTdPadTopBot15">
                            <input type="text" id="txtCompanyName" class="mgrFormDesign" name="txtCompanyName" value="${compName}" readonly>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="mgrTdPadTopBot20 col-25">
                            <label for="serialNo">Serial No</label>
                        </div>

                        <div class="col-75 mgrTdPadTopBot15">
                            <input type="text" id="txtSerial" class="mgrFormDesign" name="txtSerial" value="${serialNo}" readonly>
                        </div>
                    </div>
                        
                    <div class="row">
                        <div class="mgrTdPadTopBot20 col-25">
                            <label for="contactPerson">Contact Person <span class="mandatory">*</span></label>
                        </div>

                        <div class="col-75 mgrTdPadTopBot15">
                            <input type="text" id="txtContactP" class="mgrFormDesign" name="txtContactP" value="">
                        </div>
                    </div>    
                        
                    <div class="row">
                        <div class="mgrTdPadTopBot20 col-25">
                            <label for="contact">Contact Number <span class="mandatory">*</span></label>
                        </div>

                        <div class="col-75 mgrTdPadTopBot15">
                            <input type="text" id="txtContact" class="mgrFormDesign" name="txtContact" value="">
                        </div>
                    </div>    
                    
                    <div class="row">
                        <div class="mgrTdPadTopBot20 col-25">
                            <label for="email">Email</label>
                        </div>

                        <div class="col-75 mgrTdPadTopBot15">
                            <input type="text" id="txtEmail" class="mgrFormDesign" onchange="emailValidation(this);" name="txtEmail" value="">
                        </div>
                    </div>    
                        
                    <div class="row">
                        <div class="mgrTdPadTopBot20 col-25">
                            <label for="machineModel">Machine Model</label>
                        </div>

                        <div class="col-75 mgrTdPadTopBot15">
                            <input type="text" id="txtMachineModel" class="mgrFormDesign" name="txtMachineModel" value="${machineModel}" readonly>
                        </div>
                    </div>
                        
                    <div class="row">
                        <div class="mgrTdPadTopBot20 col-25">
                            <label for="issue">Issue <span class="mandatory">*</span></label> 
                        </div>

                        <div class="col-75 mgrTdPadTopBot15">
                            <select id="txtIssue" class="ddlMgr" name="txtIssue" >
                                <option value="" selected disabled>--Please select an issue--</option>
                                <c:forEach var="issue" items="${listOfIssue}">
                                    <option value="${issue.name}" ${manageServiceCallIssueHeader.id eq issue.id ? 'selected' : ''}>
                                        ${issue.name}
                                    </option> 
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                       
                    <div class="row">
                        <div class="mgrTdPadTopBot20 col-25">
                            <label for="remarks">Remarks <span id="show" class="mandatory" hidden>*</span></label>
                        </div>

                        <div class="col-75 mgrTdPadTopBot15">
                            <textarea id="txtRemarks" class="mgrTextAreaOnTable mgrFormDesign" name="txtRemarks" maxlength="300"> </textarea>
                        </div>
                    </div>
                        
                    <div class="row">
                        <div class="mgrTdPadTopBot20 col-25">
                            <label for="submittedBy">Submitted By <span class="mandatory">*</span></label> 
                        </div>

                        <div class="col-75 mgrTdPadTopBot15">
                            <input type="text" id="txtSubmittedBy" class="mgrFormDesign" name="txtSubmittedBy" maxlength="50" value="">
                        </div>
                    </div>
                        
                    <div class="row">
                        <div class="mgrTdPadTopBot20 col-25">
                            <label for="attachment">Attachment</label>
                        </div>    
                         <div class="col-75">                                                      
                            <div id="dropzone" class="fade well" style="border-radius: 30px; border: none; margin-left: 0;">
                                <div id="contractDropZoneContainer">Click to Browse</div>
                            </div>                                       
                         </div >
                    </div>
                        
                    <div class="row">
                       <div class=" mgrTdPadTopBot20 col-100">
                           <table id="uploaded-files">
                               <thead>
                                    <tr>
                                       <th colspan="2" class="paddingBottom" style="text-align: center;">Attachment</th>
                                       
                                    </tr>
                                </thead>

                                <tbody class="bgWhite">
                                    
                                        <tr>
                                            <td>
                                                <div class="div1">
                                                    <div class="div2">
                                                         <div id="imgs" class="defaultBody col-100" style="padding: 10px;display: flex ;justify-content: flex-start;margin-top: 0px !important;"></div> 
                                                    </div>
                                                </div>
                                            </td>                 
                                        </tr>
                                    
                                </tbody>                                                 
                           </table>
                       </div>                     
                   </div>
                        
                  <div class="buttons">
                      <input type="button" id="btnSubmitServiceCall" value="Submit">
                  </div>
                  <br/>
            </div>
         </div>
         </div>
        </form>
                <!-- The Modal -->
            <div id="myModal" class="modal">
                             
                <img class="zoomIn modalImg modal-content" id="img01">
                                
            </div>
            <span style="border-radius: 6px;display: none !important;position: fixed;z-index: 1;padding: 10px;" class="close">&times;</span>
                  
                <!-- attachment part -->
        <form id="file_upload" action="ServiceCallAttachments" method="POST" enctype="multipart/form-data">
            <input type="hidden" id="serviceCallId" name="serviceCallId" value="${serviceCall.serviceCallHeader.id}">
            
            <input id="file_1" type="file" name="file_1" accept="image/*" multiple hidden>
        </form>     
    </body>
</html>
