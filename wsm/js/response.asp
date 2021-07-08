<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001"%>
<!DOCTYPE html>
<meta http-equiv=X-UA-Compatible content="IE=Edge">
<!--[if lt IE 9]><html class="no-js lt-ie9" lang="en" dir="ltr"><![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" lang="en" dir="ltr">
<!--<![endif]-->
<head>
<meta charset="utf-8">
<!-- Web Experience Toolkit (WET4.0.12) / Boîte à outils de l'expérience Web (BOEW4.0.12)
wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html -->
<title>Sending email / L'envoi de courriel</title>
<meta content="width=device-width,initial-scale=1" name="viewport">
<!-- Meta data -->
<meta name="dcterms.title" content="Sending email / L'envoi de courriel" />
<meta name="dcterms.language" title="ISO639-2" content="eng" />
<meta name="dcterms.issued" title="W3CDTF" content="2016-08-15"/>
<meta name="dcterms.modified" title="W3CDTF" content="2016-08-15" />
<meta name="dcterms.valid" title="W3CDTF" content="2016-08-15/2017-08-15" />
<meta name="robots" content="" />
<meta name="dcterms.audience" title="CRAaudience" content=""/>
<meta name="dcterms.type" title="gctype" content="" />
<meta name="dcterms.spatial" title="CRAgeonames" content="" />
<!-- Meta data-->
<!--[if gte IE 9 | !IE ]><!-->
<link href="/wet40/assets/favicon.ico" rel="icon" type="image/x-icon">
<link rel="stylesheet" href="/wet40/css/wet-boew.min.css">
<!--<![endif]-->
<link rel="stylesheet" href="/wet40/css/theme.min.css">
<!--[if lt IE 9]>
<link href="/wet40/assets/favicon.ico" rel="shortcut icon" />
<link rel="stylesheet" href="/wet40/css/ie8-wet-boew.min.css" />
<link rel="stylesheet" href="/wet40/intranet/css/custom.css"/>
<link rel="stylesheet" href="/wet40/fa/css/fa.css">
<script src="/wet40/js/ie8-jquery.js"></script>
<script src="/wet40/js/ie8-wet-boew.min.js"></script>
<![endif]-->
<noscript>
<link rel="stylesheet" href="/wet40/css/noscript.min.css" />
</noscript>
<link rel="stylesheet" href="/wet40/intranet/css/custom.css"/>
<link rel="stylesheet" href="/wet40/fa/css/fa.css">
</head><body vocab="http://schema.org/" typeof="WebPage">
<ul id="wb-tphp">
  <li class="wb-slc"> <a class="wb-sl" href="#wb-cont">Skip to main content</a> </li>
  <li class="wb-slc visible-sm visible-md visible-lg"> <a class="wb-sl" href="#wb-info">Skip to "About this site"</a> </li>
</ul>
<header role="banner">
  <div id="wb-bnr">
    <div id="wb-bar">
      <div class="container">
        <div class="row"> <img id="gcwu-sig" tabindex="-1" src="/wet40/assets/sig-en.png" alt="Canada Revenue Agency" />
          <section id="wb-lng">
            <h2>Language selection</h2>
            <ul class="list-inline">
              <li><a lang="fr" href="/francais/r1713497/rsc/cntnt/wbnlts_sr2-f.html">Fran&ccedil;ais</a></li>
            </ul>
          </section>
          <section class="wb-mb-links col-xs-12 visible-sm visible-xs" id="wb-glb-mn">
            <h2>Search and menus</h2>
            <ul class="pnl-btn list-inline text-right">
              <li><a href="#mb-pnl" title="Search and menus" aria-controls="mb-pnl" class="overlay-lnk btn btn-sm btn-default" role="button"><span class="glyphicon glyphicon-search"><span class="glyphicon glyphicon-th-list"><span class="wb-inv">Search and menus</span></span></span></a></li>
            </ul>
            <div id="mb-pnl"></div>
          </section>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div id="wb-sttl" class="col-md-12"> <a href="/english/frames/main/menu-e.asp"> <span>InfoZone</span> </a> <img src="/wet40/assets/wmms-intra.png" alt="Symbol of Government of Canada" id="wmms" tabindex="-1" /> </div>
        <!--Update the link below with the include file of the corresponding Branch-->
        <!--#include virtual="/gbl/search_includes/srch-pab-e.htm"-->
      </div>
    </div>
  </div>
  <nav role="navigation" id="wb-bc" property="breadcrumb">
    <h2>You are here:</h2>
    <div class="container">
      <div class="row">
      </div>
    </div>
  </nav>
  <span data-trgt="mb-pnl" class="wb-menu hide"></span> </header>
<!-- SEARCH CONTENT BEGINS / CONTENU RECHERCHE COMMENCE -->
<main role="main" property="mainContentOfPage" class="container">
  <h1 id="wb-cont" property="name" class="page-header">Sending email / L'envoi de courriel</h1>
<%
Server.Execute("/scripts/form-to-email/response.vbs")

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
   
  <!-- SEARCH CONTENT ENDS / CONTENU RECHERCHE TERMINE -->
  <dl id="wb-dtmd">
    <dt>Last updated:&#32;</dt>
    <dd>
      <time property="dateModified">2016-08-15</time>
    </dd>
  </dl>
</main>
<footer role="contentinfo" id="wb-info" class="visible-sm visible-md visible-lg wb-navcurr">
<!--#include virtual="/wet_templates/footerlinks-e.htm" -->
</footer>
<!--[if gte IE 9 | !IE ]><!-->
<script src="/wet40/js/jquery.js"></script>
<script src="/wet40/js/wet-boew.min.js"></script>
<!--<![endif]-->
<!--[if lt IE 9]>
<script src="/wet40/js/ie8-wet-boew2.min.js"></script>
<![endif]-->
<script src="/wet40/js/theme.min.js"></script>
</body>
</html>