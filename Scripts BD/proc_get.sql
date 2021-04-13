
CREATE OR REPLACE FUNCTION fn_get_user
RETURN SYS_REFCURSOR
AS
    user_cursor SYS_REFCURSOR;
BEGIN
    OPEN user_cursor FOR
        SELECT ID, Password, Name, Surnames, Latitud, Longitud, Cellphone, UserType FROM AUser;
RETURN user_cursor;
CLOSE user_cursor;
END;
/

CREATE OR REPLACE FUNCTION fn_get_typeplane
RETURN SYS_REFCURSOR
AS
    typeplane_cursor SYS_REFCURSOR;
BEGIN
    OPEN typeplane_cursor FOR
        SELECT ID, model, brand, NumberRow, NumberColums FROM TypePlane;
RETURN typeplane_cursor;
CLOSE typeplane_cursor;
END;
/

CREATE OR REPLACE FUNCTION fn_get_plane
RETURN SYS_REFCURSOR
AS
    plane_cursor SYS_REFCURSOR;
BEGIN
    OPEN plane_cursor FOR
        SELECT ID, TypePlaneId FROM Plane;
RETURN plane_cursor;
CLOSE plane_cursor;
END;
/

CREATE OR REPLACE FUNCTION fn_get_route
RETURN SYS_REFCURSOR
AS
    route_cursor SYS_REFCURSOR;
BEGIN
    OPEN route_cursor FOR
        SELECT ID, Duration, OrigenId, DestinoId, Price , Discount FROM Route;
RETURN route_cursor;
CLOSE route_cursor;
END;
/

CREATE OR REPLACE FUNCTION fn_get_schedule
RETURN SYS_REFCURSOR
AS
    schedule_cursor SYS_REFCURSOR;
BEGIN
    OPEN schedule_cursor FOR
        SELECT ID, RouteId,Stime,to_char(Sdate, 'hh24:mi') Sdate FROM Schedule;
RETURN schedule_cursor;
CLOSE schedule_cursor;
END;
/

CREATE OR REPLACE FUNCTION fn_get_flight
RETURN SYS_REFCURSOR
AS
    flight_cursor SYS_REFCURSOR;
BEGIN
    OPEN flight_cursor FOR
        SELECT ID, Outbound, OutBoundDate, PlaneID, ArriveTime FROM Flight;
RETURN flight_cursor;
CLOSE flight_cursor;
END;
/

CREATE OR REPLACE FUNCTION fn_get_purchase
RETURN SYS_REFCURSOR
AS
    purchase_cursor SYS_REFCURSOR;
BEGIN
    OPEN purchase_cursor FOR
        SELECT ID, FlightId , UserId, TotalPrice, Tickets, ReturnFlightId FROM Purchase;
RETURN purchase_cursor;
CLOSE purchase_cursor;
END;
/

CREATE OR REPLACE FUNCTION fn_get_ticket
RETURN SYS_REFCURSOR
AS
    ticket_cursor SYS_REFCURSOR;
BEGIN
    OPEN ticket_cursor FOR
        SELECT ID, Scolum, Srow, PurchaseId, IsReturn FROM Ticket;
RETURN ticket_cursor;
CLOSE ticket_cursor;
END;
/

CREATE OR REPLACE FUNCTION fn_get_country
RETURN SYS_REFCURSOR
AS
    country_cursor SYS_REFCURSOR;
BEGIN
    OPEN country_cursor FOR
        SELECT ID, Name FROM Country;
RETURN country_cursor;
CLOSE country_cursor;
END;
/


