
create or replace function fn_login(Pid in varchar2, Ppassword in varchar2) return number as
Vcant number;
begin
	select count(*)
	into Vcant
	from AUser
	where ID = Pid and Password = Ppassword ;
	
  if Vcant > 0 then
	return (1);
  else 
	return (-1);
  end if;
end fn_login;
/

CREATE OR REPLACE FUNCTION fn_login_get(Pid in varchar2, Ppassword in varchar2)
RETURN SYS_REFCURSOR
AS
    login_cursor SYS_REFCURSOR;
BEGIN
    OPEN login_cursor FOR
        SELECT ID, Password, Name, Surnames, Latitud, Longitud, Cellphone FROM AUser where ID = Pid and Password = Ppassword;
RETURN login_cursor;
END;
/


create or replace view rep_country as 
select p.ID, p.TypePlaneId, T.Model, T.Brand, T.NumberRow, T.NumberColums 
from Plane p, TypePlane T
where p.TypePlaneId = T.ID;


CREATE OR REPLACE FUNCTION fn_get_planeandtype
RETURN SYS_REFCURSOR
AS
    get_cursor SYS_REFCURSOR;
BEGIN
    OPEN get_cursor FOR
        SELECT * from rep_country;
RETURN get_cursor;
END;
/

create or replace view rep_flight as 
select f.ID, f.PlaneId, s.Stime, to_char(s.Sdate,'hh24:mi') Sdate,to_char(f.ArriveTime,'hh24:mi') arrivetime, r.Duration,r.price,r.Discount, c1.name origen, c2.name destino, (t.NumberRow * t.NumberColums) cantidadasientos
from Flight f, Schedule s, Route r, Country c1, Country c2, Plane p, TypePlane t
where f.outbound = s.ID and s.RouteId = r.ID and r.OrigenId = c1.ID and r.DestinoId = c2.ID and f.PlaneId = p.ID and p.TypePlaneId = t.ID;


CREATE OR REPLACE FUNCTION fn_get_completeflight
RETURN SYS_REFCURSOR
AS
    get_cursor SYS_REFCURSOR;
BEGIN
    OPEN get_cursor FOR
        SELECT * from rep_flight;
RETURN get_cursor;
END;
/


create or replace function fn_cantida_espacios(Pid in number) return number as
Vcant number;
begin
	select sum(Tickets)
	into Vcant
	from Purchase
	where FlightId =  pid;
	return Vcant;
  
end fn_cantida_espacios;
/


create or replace view rep_schedule as 
select s.ID,to_char(s.Sdate,'hh24:mi') Sdate, s.Stime,s.RouteId, r.Duration,r.price,r.Discount, c1.name origen, c2.name destino
from Schedule s, Route r, Country c1, Country c2
where s.RouteId = r.ID and r.OrigenId = c1.ID and r.DestinoId = c2.ID;


CREATE OR REPLACE FUNCTION fn_schedule
RETURN SYS_REFCURSOR
AS
    get_cursor SYS_REFCURSOR;
BEGIN
    OPEN get_cursor FOR
        SELECT * from rep_schedule;
RETURN get_cursor;
END;
/