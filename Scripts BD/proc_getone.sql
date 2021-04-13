-- La wea en modo unique 

CREATE OR REPLACE FUNCTION fn_getone_user(Pid in varchar2)
RETURN SYS_REFCURSOR
AS
    user_cursor SYS_REFCURSOR;
BEGIN
    OPEN user_cursor FOR
        SELECT ID, Password, Name, Surnames, Latitud, Longitud , Cellphone, UserType FROM AUser where ID = Pid;
RETURN user_cursor;
CLOSE user_cursor;
END;
/

CREATE OR REPLACE FUNCTION fn_getone_typeplane(Pid in number)
RETURN SYS_REFCURSOR
AS
    typeplane_cursor SYS_REFCURSOR;
BEGIN
    OPEN typeplane_cursor FOR
        SELECT ID, model, brand, NumberRow, NumberColums FROM TypePlane where ID = Pid;
RETURN typeplane_cursor;
CLOSE typeplane_cursor;
END;
/

CREATE OR REPLACE FUNCTION fn_getone_plane(Pid in number)
RETURN SYS_REFCURSOR
AS
    plane_cursor SYS_REFCURSOR;
BEGIN
    OPEN plane_cursor FOR
        SELECT ID, TypePlaneId FROM Plane where ID = Pid;
RETURN plane_cursor;
CLOSE plane_cursor;
END;
/

CREATE OR REPLACE FUNCTION fn_getone_route(Pid in number)
RETURN SYS_REFCURSOR
AS
    route_cursor SYS_REFCURSOR;
BEGIN
    OPEN route_cursor FOR
        SELECT ID, Duration, OrigenId, DestinoId, Price, Discount FROM Route where ID = Pid;
RETURN route_cursor;
CLOSE route_cursor;
END;
/

CREATE OR REPLACE FUNCTION fn_getone_schedule(Pid in number)
RETURN SYS_REFCURSOR
AS
    schedule_cursor SYS_REFCURSOR;
BEGIN
    OPEN schedule_cursor FOR
        SELECT ID, RouteId,Stime,Sdate FROM Schedule where ID = Pid;
RETURN schedule_cursor;
CLOSE schedule_cursor;
END;
/

CREATE OR REPLACE FUNCTION fn_getone_flight(Pid in number)
RETURN SYS_REFCURSOR
AS
    flight_cursor SYS_REFCURSOR;
BEGIN
    OPEN flight_cursor FOR
        SELECT ID, Outbound, OutboundDate, PlaneId, ArriveTime FROM Flight where ID = Pid;
RETURN flight_cursor;
CLOSE flight_cursor;
END;
/

CREATE OR REPLACE FUNCTION fn_getone_purchase(Pid in number)
RETURN SYS_REFCURSOR
AS
    purchase_cursor SYS_REFCURSOR;
BEGIN
    OPEN purchase_cursor FOR
        SELECT ID ,FlightId, UserId, TotalPrice, Tickets, ReturnFlightId FROM Purchase where ID = Pid;
RETURN purchase_cursor;
CLOSE purchase_cursor;
END;
/

CREATE OR REPLACE FUNCTION fn_getone_ticket(Pid in number)
RETURN SYS_REFCURSOR
AS
    ticket_cursor SYS_REFCURSOR;
BEGIN
    OPEN ticket_cursor FOR
        SELECT ID, Scolum, Srow, PurchaseId, IsReturn FROM Ticket where ID = Pid;
RETURN ticket_cursor;
CLOSE ticket_cursor;
END;
/

CREATE OR REPLACE FUNCTION fn_getone_country(Pid in number)
RETURN SYS_REFCURSOR
AS
    country_cursor SYS_REFCURSOR;
BEGIN
    OPEN country_cursor FOR
        SELECT ID, Name FROM Country where ID = Pid;
RETURN country_cursor;
CLOSE country_cursor;
END;
/

create or replace Function fn_get_purchasebyfligh(Pid in number)
RETURN SYS_REFCURSOR
AS
    purchase_cursor SYS_REFCURSOR;
BEGIN
    OPEN purchase_cursor FOR
        SELECT * FROM Purchase where FlightId = Pid;
RETURN purchase_cursor;
CLOSE purchase_cursor;
END;
/