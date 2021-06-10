<%-- 
    Document   : ContractMasterDetail
    Created on : 14 Jun, 2019, 12:35:13 PM
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
        <meta name="viewport" content="height=device-height,width=device-width">
        <title>Contract Details</title>
        
        <!-- include link, src file --> 
        <jsp:include page="../include/include.jsp"/>
        
        <!-- css and js-->
        <link rel="stylesheet" href="./include/css/ContractMasterDetail.css" type="text/css">
        <script type="text/javascript" src="./include/js/ContractMasterDetail.js"></script>
        
        <!-- attachment section -->
        <jsp:include page="./ContractMasterAttachment.jsp"/>
        
        <script type="text/javascript">
            // customer
            var listOfCustomerMastersJson = ${listOfCustomerMastersJson};
            // shipping
            var listOfShippingByCustomerJson = ${listOfShippingByCustomerJson};
            // product and services
            var listOfProductAndServicesJson = ${listOfProductAndServicesJson};
        </script>
    </head>
    <body class="mgrBodyBGColor defaultPosition">
        <div id="dvLoading"></div>
        <div id="overlay" class="web_dialog_overlay"></div>
        
        <jsp:include page="../MGRHeader/MGRHeader.jsp">
            <jsp:param name="formTitle" value="Contract Details"></jsp:param>
        </jsp:include>
        
        <form id="frm" method="POST" action="ContractMasterDetail">
            <div class="defaultBodyContent">
                <div class="defaultPosition divFormMGR bodyAndFormBorderMGR">
                    <table class="tblWdth100 mgrFormBorderSpacing txtStyleSanRegularMgr">
                        <tr>
                            <td class="width20Percentage">
                                <input type="text" id="txtContractMasterId" name="txtContractMasterId" value="${contractMaster.contractMasterHeader.id}" readonly hidden>
                                <input type="text" id="txtCustomerId" name="txtCustomerId" value="${contractMaster.contractMasterHeader.customer_id}" readonly hidden>
                                Customer Name <span class="mandatory">*</span>
                            </td>
                            
                            <td class="width25Percentage">
                                <input type="text" id="txtCustomerName" class="mgrFormDesign" name="txtCustomerName" value="${contractMaster.contractMasterHeader.customer_name}">
                            </td>
                            
                            <td class="mgrfrmInputSpc"></td>
                            
                            <td class="width25Percentage">
                                Status
                            </td>
                            
                            <td class="width25Percentage">
                                <c:choose>
                                    <c:when test="${contractMaster.contractMasterHeader.status eq null}">
                                        <input type="text" value="New" class="mgrFormDesign" readonly>
                                    </c:when>
                                    
                                    <c:otherwise>
                                        <select id="ddlStatus" name="ddlStatus" onchange="dropdownStatusContractSalesRemarks();">
                                            <option value="">-- Please Select Status --</option>
                                            <option value="Active" ${contractMaster.contractMasterHeader.status eq 'Active' ? 'selected' : ''}>Active</option>
                                            <option value="Expired" ${contractMaster.contractMasterHeader.status eq 'Expired' ? 'selected' : ''}>Expired</option>
                                            <option value="Terminated" ${contractMaster.contractMasterHeader.status eq 'Terminated' ? 'selected' : ''}>Terminated</option>
                                        </select>
                                    </c:otherwise>
                                </c:choose>                               
                            </td>
                        </tr>
                        
                        <tr>
                            <td>
                                Customer Code <span class="mandatory">*</span>
                            </td>
                            
                            <td>
                                <input type="text" id="txtCustomerCode" class="mgrFormDesign" name="txtCustomerCode" value="${contractMaster.contractMasterHeader.customer_code}" readonly>
                            </td>
                            
                            <td></td>
                            
                            <td>
                                Sales Agreement No
                            </td>
                            
                            <td>
                                <input type="text" id="txtSalesAgreementNo" class="mgrFormDesign" name="txtSalesAgreementNo" value="${contractMaster.contractMasterHeader.sales_agreement_no}" readonly>
                            </td>
                        </tr>
                        
                        <tr>
                            <td>
                                Address <span class="mandatory">*</span>
                            </td>
                            
                            <td>
                                <input type="text" id="txtCustomerAddress1" class="mgrFormDesign" name="txtCustomerAddress1" value="${contractMaster.contractMasterHeader.customer_address_1}" readonly>
                            </td>
                            
                            <td></td>
                            
                            <td>
                               Sales Date
                            </td>
                            
                            <td>
                                <input type="text" id="txtSalesDate" class="mgrFormDesign" name="txtSalesDate" value="<javatime:format value="${contractMaster.contractMasterHeader.sales_date}" pattern="dd/MM/yyyy"/>" readonly>
                            </td>
                        </tr>
                        
                        <tr>
                            <td></td>
                            
                            <td>
                                <input type="text" id="txtCustomerAddress2" class="mgrFormDesign" name="txtCustomerAddress2" value="${contractMaster.contractMasterHeader.customer_address_2}" readonly>
                            </td>
                            
                            <td></td>
                            
                            <td>
                                Contact Person
                            </td>
                            
                            <td>
                                <input type="text" id="txtCustomerContactPerson" class="mgrFormDesign" name="txtCustomerContactPerson" value="${contractMaster.contractMasterHeader.customer_contact_person}" maxlength="50">
                            </td>
                        </tr>
                        
                        <tr>
                            <td></td>
                            
                            <td>
                                <input type="text" id="txtCustomerAddress3" class="mgrFormDesign" name="txtCustomerAddress3" value="${contractMaster.contractMasterHeader.customer_address_3}" readonly>
                                <input type="text" id="txtCustomerAddress4" class="mgrFormDesign" name="txtCustomerAddress4" value="${contractMaster.contractMasterHeader.customer_address_4}" readonly hidden>
                            </td>
                            
                            <td></td>
                            
                            <td>
                                Tel.
                            </td>
                            
                            <td>
                                <input type="text" id="txtCustomerTel" maxlength="50" class="mgrFormDesign" name="txtCustomerTel" value="${contractMaster.contractMasterHeader.customer_tel}">
                            </td>
                        </tr>
                        
                        <tr>
                            <td>
                                Postal Code <span class="mandatory">*</span>
                            </td>
                            
                            <td>
                                <input type="text" id="txtCustomerPostalCode" class="mgrFormDesign" name="txtCustomerPostalCode" value="${contractMaster.contractMasterHeader.customer_postal}" readonly>
                            </td>
                            
                            <td></td>
                            
                            <td>
                                Email
                            </td>    

                            <td>
                                <input type="text" id="txtCustomerEmail" class="mgrFormDesign" name="txtCustomerEmail" value="${contractMaster.contractMasterHeader.customer_email}">
                            </td>
                        </tr>
                    </table>
                </div>
                
                <div style="margin: 20px 0;">
                    <main>                                      
                        <label class="horizontalLineMgr">
                            &nbsp;
                        </label>
                        
                        <input id="tab1" type="radio" class="tabz" name="tabs" checked>                        
                        <label for="tab1" class="tabs">
                            <span class="spanLabelMgr" data-value="sales">
                                <img src="../../include/mgr/include/images/MGR-LOGO/Sales Info.png" id="sales" class="logoContractMgr">
                                Sales Information
                            </span>
                        </label>
                        
                        <input id="tab2" class="tabz" type="radio" name="tabs">
                        <label for="tab2" class="tabs">                      
                            <span class="spanLabelMgr" data-value="lease">
                                <img src="../../include/mgr/include/images/MGR-LOGO/Lease Info.png" id="lease" class="logoContractMgr">
                                Lease Information
                            </span>
                        </label>
                        
                        <input id="tab3" class="tabz" type="radio" name="tabs">
                        <label for="tab3" class="tabs">
                            <span class="spanLabelMgr" data-value="mds">
                                <img src="../../include/mgr/include/images/MGR-LOGO/MDS Info.png" id="mds" class="logoContractMgr">
                                MDS Information
                            </span>
                        </label>          
                                                               
                        <section id="content1">
                            <jsp:include page="ContractMasterSales.jsp" />
                        </section>
                        
                        <section id="content2">
                            <jsp:include page="ContractMasterLease.jsp" />
                        </section>
                        
                        <section id="content3">
                            <jsp:include page="ContractMasterMds.jsp" />
                        </section>
                        
                        <!-- attachment section -->
                        <table id="tableAttachment" class="defaultPosition mgrBorderRadius tblWdth100 contractDetailSectionDiv tableMGRStyle mgrSpace50 tableMGRRounded bodyAndFormBorderMGR txtStyleSanRegularMgr" cellspacing="0"> 
                             <thead class="mgrDataTableThead">
                                 <tr>
                                     <th class="mgrTdPadTopBot20" colspan="2">
                                         Attachment
                                     </th>
                                 </tr>
                             </thead>

                             <tbody class="bgWhite">                                                       
                                 <tr>
                                    <td class="mgrTdPadTopBot20 width10Percentage mgrPaddingLeft20" style="color: #000;">                                             
                                        Attach Files
                                    </td>
                                                 
                                    <td class="mgrTdPadTopBot20">                                                      
                                        <div id="dropzone" class="fade well" style="border-radius: 30px; border: none; margin-left: 0;">
                                            <div id="contractDropZoneContainer">Drop Files Here / Click to Browse</div>
                                        </div>                                       
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td colspan="2" class="mgrPaddingLeft20">
                                        <table id="uploaded-files">
                                            <thead>
                                               <tr>
                                                   <th class="txtStyleSanRegularMgr" style="padding-left: 0;">File Name</th>
                                                   <th class="txtStyleSanRegularMgr">Uploaded By</th>
                                                   <th class="txtStyleSanRegularMgr">Date & Time</th>
                                                   <th>&nbsp;</th>
                                               </tr>
                                            </thead>

                                            <tbody>
                                               <c:forEach items="${contractMaster.contractMasterHeader.listOfContractAttachmentDetails}" var="contractAttachment">
                                                   <tr>
                                                       <td class="txtStyleSanRegularMgr" style="padding-left: 0;">
                                                           <c:url value="../../GetAttachmentFile" var="contractDetail">
                                                               <c:param name="attachmentFilePath" value="${contractAttachment.file_path}"/>
                                                           </c:url>
                                                           <a href="#${contractAttachment.file_name}" onclick="fnOpenPopUpWindow('ContractAttachment', '${contractDetail}');">${contractAttachment.file_display_name}</a>
                                                       </td>

                                                       <td class="txtStyleSanRegularMgr">
                                                           ${contractAttachment.uploaded_by_user_name}
                                                       </td>

                                                       <td class="txtStyleSanRegularMgr">
                                                           ${contractAttachment.display_uploaded_date_time_format}
                                                       </td>

                                                       <td>
                                                           <img class="logoTbodyTableMgr" id="btnDeleteAttachment" src="../../include/mgr/include/images/MGR-LOGO/delete.png" alt="delete attachment" onclick="bindContractAttachmentOnClickDeleteEvent(${contractAttachment.id}, '${contractAttachment.file_name}', ${contractAttachment.contract_id}, $(this));">
                                                       </td>
                                                   </tr>
                                               </c:forEach>
                                            </tbody>                                                 
                                        </table>
                                    </td>                                    
                                </tr>
                             </tbody>
                         </table>
                        
                        <div class="mgrSpace100">
                            <input type="button" id="btnSubmitContractDetail" class="mgrButtonSpacing mgrFloatRight" value="Submit">
                            <input type="button" id="btnBackContractDetail" class="mgrFloatRight" value="Back">
                        </div>
                    </main>
                </div>
            </div>
        </form>
                        
        <!-- attachment part -->
        <form id="file_upload" action="ContractDetailAttachment" method="POST" enctype="multipart/form-data">
            <input type="hidden" id="contractId" name="contractId" value="${contractMaster.contractMasterHeader.id}">
            
            <input id="file_1" type="file" name="file_1" accept=".pdf, .xls, .xlsx" multiple hidden disabled>
        </form>        
    </body>
</html>
