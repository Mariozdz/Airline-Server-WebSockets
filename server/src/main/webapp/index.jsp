<%@ page import="Logic.Country" %>
<%@ page import="Logic.Auser" %>
<%@ page import="Model.UserModel" %>
<%@ page import="com.google.gson.JsonObject" %>
<%@ page import="com.google.gson.Gson" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.List" %>
<%@ page import="Model.CountryModel" %>
<%@ page import="org.json.JSONArray" %>
<%@ page import="Model.PlaneModel" %>
<%@ page import="java.util.Calendar" %>
<%@ page import="java.sql.Date" %>
<%@ page import="Auxiliar.ConvertDate" %>
<%@ page import="Datos.*" %>
<%@ page import="Logic.Flight" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<% ConnectionSQL.getInstance();  %>

<%  FlightDao dao = new FlightDao();

    Flight f = new Flight();

   /* f.setOutbound(17);
    f.setOutbounddate(ConvertDate.getInstance().getDate("2018-04-23 15:30"));
    f.setPlaneid(107);
    f.setArrivetime(ConvertDate.getInstance().getDate("2018-04-23 15:57"));*/



%>

<!DOCTYPE html>
<html>
<head>
    <title>GG</title>
</head>
<body>
<h1>
</h1>
<br/>
<a href="hello-servlet">Hello Servlet</a>
</body>
</html>