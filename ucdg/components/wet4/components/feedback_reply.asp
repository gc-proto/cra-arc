<!DOCTYPE html>
<html class="no-js" lang="en" dir="ltr">
   <head>
      <meta charset="utf-8">
      <!-- Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW) wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html -->
      <title>Thank you for your comments – WET4 – CRA user-centred design guide – Canada.ca</title>
      <meta content="width=device-width,initial-scale=1" name="viewport">
      <meta name=”robots” content=”noindex”>
      <!-- Meta data -->
      <!-- Meta data-->
      <!-- Load closure template scripts -->
      <script type="text/javascript" src="https://www.canada.ca/etc/designs/canada/cdts/gcweb/v4_0_39/cdts/compiled/soyutils.js"></script>
      <script type="text/javascript" src="https://www.canada.ca/etc/designs/canada/cdts/gcweb/v4_0_39/cdts/compiled/wet-en.js"></script>
      <link href="https://test.canada.ca/covid-19-guidance/proto/css/alpha-beta-banner.css" rel="stylesheet">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous" />
      <!-- Write closure template -->
      <script type="text/javascript">
         document.write(wet.builder.refTop({
         }));
      </script>
      <link rel="stylesheet" href="https://www.canada.ca/etc/designs/canada/wet-boew/css/theme.min.css"/>
      <link rel="stylesheet" href="../../../css/provisional-topic.css"/>
      <link rel="stylesheet" href="../../../css/wsm.css"/>
      <link rel="stylesheet" href="../../../css/step-list.css"/>
      <link rel="stylesheet" href="../../../css/stacked-header.css"/>
   </head>
   <body vocab="http://schema.org/" typeof="WebPage" class="cnt-wdth-lmtd">
      <div id="def-top"> </div>
      <!-- Write closure template --> 
      <script type="text/javascript">
         var defTop = document.getElementById("def-top");
         defTop.outerHTML = wet.builder.top({
           lngLinks: [{
         
             lang: "fr",
             href: "http://test.canada.ca/cra-arc/wsm/../gcau/index.html",
             text: "Français"
           }],
           breadcrumbs: [{
             title: "CRA user-centred design guide",
             href: "../../../index.html"},{title: "Components and patterns",href: "../../index.html"},{title: "WET4 components and patterns",href: "../index.html"},{title: "WET4 components",href: "index.html"
           }],
           
           search: false,
           siteMenu: false,
           showPreContent: true
         });
      </script>
      <main role="main" property="mainContentOfPage" class="container">
<!-- CONTENT STARTS -->
                   <h1 property="name" class="wb-inv" id="wb-cont" dir="ltr">Thank you for your comments – WET4 – CRA user-centred design guide</h1>
<div aria-hidden="true">
<p class="lead mrgn-tp-md mrgn-bttm-0 text-muted">CRA user-centred design guide</p>
<h1 class="gc-thickline mrgn-tp-0">Thank you for your comments – WET4</h1>
</div>

<p>Please note that you will not receive a reply. If you have any questions or additional comments, please send an <a href="mailto:Gabriel.Portillo@cra-arc.gc.ca">email to Gabriel Portillo</a>.</p>


<%
Server.Execute("http://test.canada.ca/cra-arc/wsm/js/response.vbs")

Function getHTML (strUrl, submitType)
    Set xmlHttp = Server.CreateObject("MSXML2.ServerXMLHTTP")
    xmlHttp.Open submitType, strUrl, False
    xmlHttp.setRequestHeader "User-Agent", "asp httprequest"
    xmlHttp.setRequestHeader "content-type", "application/x-www-form-urlencoded"
    xmlHttp.Send Request
'	If xmlHttp.status = 200 Then
      getHTML = xmlHttp.responseText
'      xmlHttp.abort()
'	End If
    set xmlHttp = Nothing 
End Function

Function getNextPage(fieldName, fieldValue)
  getNextPage = vbNullString
  If LCase(fieldName) = "reply" Then
    getNextPage = fieldValue
  End If
End Function
%>
<%If Request.Form("reply") <> vbNullString Or Request.QueryString("reply") <> vbNullString Then

Dim nextPage
Dim j
	
'Loop to find each variable name and variable value
nextPage = vbNullString
If Request.Form.Count > 0 Then
  For j = 1 to Request.Form.Count
    nextPage = getNextPage(Request.Form.Key(j), Request.Form.Item(j))
    If nextPage <> vbNullstring Then
      Exit For
    End If
  Next
ElseIf Request.Querystring.Count > 0 Then
  For Each key In Request.Querystring
    nextPage = getNextPage(key, Request.Querystring(key))
    If nextPage <> vbNullstring Then
      Exit For
    End If
  Next 
End If

If nextPage <> vbNullString And nextPage <> Request.ServerVariables("URL") Then
  If Left(nextPage, 1) = "/" Then
    nextPage = "http://" & Request.ServerVariables("server_name") & nextPage
  End If
'  If LCase(Left(nextPage, 7)) = "http://" Then
'    getHTML nextPage, submitType
'  Else
    Response.Redirect nextPage
'  End If
End If
End If
%>

  <!-- CONTENT ENDS -->
 
		<div id="def-preFooter"></div>
         <!-- Write closure template -->
         <script type="text/javascript">
            var defPreFooter = document.getElementById("def-preFooter");
            defPreFooter.outerHTML = wet.builder.preFooter({
            dateModified: "2020-05-05",
            showPostContent: true,
            showFeedback: false,
            showShare: false
            });
         </script>
      </main>
      <div id="def-footer">
      </div>
      <!-- Write closure template -->
      <script type="text/javascript">
         var defFooter = document.getElementById("def-footer");
         defFooter.outerHTML = wet.builder.footer({
         showFooter: true,
         showFeatures: false
         });
      </script>
      <!-- Write closure template -->
      <script type="text/javascript">
         document.write(wet.builder.refFooter({
         }));
      </script>
      <script src="https://test.canada.ca/cra/js/alpha-banner.js"></script>
	   <script src="../../../js/components.js"></script>
   </body>
</html>