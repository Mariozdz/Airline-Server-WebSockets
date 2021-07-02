create or replace view rep_flight as 
select f.ID, f.PlaneId, f.Outbound, s.Stime,f.OutboundDate,  to_char(s.Sdate,'hh24:mi') Sdate,to_char(f.ArriveTime,'hh24:mi') arrivetime, r.Duration,r.price,r.Discount, c1.name origen, c2.name destino, (t.NumberRow * t.NumberColums) cantidadasientos, f.isreturned
from Flight f, Schedule s, Route r, Country c1, Country c2, Plane p, TypePlane t
where f.outbound = s.ID and s.RouteId = r.ID and r.OrigenId = c1.ID and r.DestinoId = c2.ID and f.PlaneId = p.ID and p.TypePlaneId = t.ID;

CREATE OR REPLACE FUNCTION fn_get_flight
RETURN SYS_REFCURSOR
AS
    flight_cursor SYS_REFCURSOR;
BEGIN
    OPEN flight_cursor FOR
        SELECT ID, Outbound, OutBoundDate, PlaneID, ArriveTime, isreturned FROM Flight;
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

create or replace procedure prc_insert_flight(Poutbound in number,
 Poutbounddate in DATE,
 PplaneId in number,
 Parrivetime in date,
 Pisreturned in number)
 is begin
  insert into Flight (ID,Outbound,OutboundDate, PlaneId,ArriveTime,isreturned) values(Flight_sec.nextval,Poutbound,Poutbounddate,PplaneId,Parrivetime,Pisreturned);
  commit;
end prc_insert_flight;
/
show error