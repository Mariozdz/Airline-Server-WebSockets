

create or replace procedure prc_insert_user(Puser in varchar2,
 Ppassword in varchar2,
 Pname in varchar2,
 Psurnames in varchar2,
 Platitud in Float,
 Plongitud in Float,
 Pcellphone in varchar2,
 Pusertype in number)
 is begin
  insert into AUser (ID, Password,Name, Surnames,Latitud,Longitud,Cellphone, UserType) values(Puser,Ppassword,Pname,Psurnames,Platitud,Plongitud,Pcellphone, Pusertype);
  commit;
end prc_insert_user;
/
show error

create or replace procedure prc_insert_typeplane(Pmodel in varchar2,
 Pbrand in varchar2,
 Prow in number,
 Pcol in number)
 is begin
  insert into TypePlane (ID, Model,Brand, NumberRow ,NumberColums) values(TypePlane_sec.nextval,Pmodel,Pbrand,Prow,Pcol);
  commit;
end prc_insert_typeplane;
/
show error

create or replace procedure prc_insert_plane(
 PtypePlane in number)
 is begin
  insert into Plane(ID, typePlaneid) values(Plane_sec.nextval,Ptypeplane);
  commit;
end prc_insert_plane;
/
show error

create or replace procedure prc_insert_route(Pduration in number,
 Porigenid in number,
 Pdestinoid in number,
 Pprice in Float,
 Pdiscount in Float)
 is begin
  insert into route (ID, Duration, OrigenId, DestinoId, Price, Discount ) values(Route_sec.nextval,Pduration,Porigenid,Pdestinoid,Pprice, Pdiscount);
  commit;
end prc_insert_route;
/
show error

create or replace procedure prc_insert_schedule(
 Prouteid in number,
 Pstime in number,
 Pdate in date
 )
 is begin
  insert into Schedule (ID,RouteId, STime,SDate) values(Schedule_sec.nextval,Prouteid,Pstime,Pdate);
  commit;
end prc_insert_schedule;
/
show error

create or replace procedure prc_insert_flight(Poutbound in number,
 Poutbounddate in DATE,
 PplaneId in number,
 Parrivetime in date)
 is begin
  insert into Flight (ID,Outbound,OutboundDate, PlaneId,ArriveTime) values(Flight_sec.nextval,Poutbound,Poutbounddate,PplaneId,Parrivetime);
  commit;
end prc_insert_flight;
/
show error

create or replace procedure prc_insert_purchase(Pflightid in number,
 Puserid in varchar2,
 Ptotalprice in Float,
 Ptickets in number,
 PreturnFlightid in number)
 is begin
  insert into Purchase (ID, FlightId, UserId,TotalPrice, Tickets, ReturnFlightId) values(Purchase_sec.nextval,Pflightid,Puserid,Ptotalprice,Ptickets,PreturnFlightid);
  commit;
end prc_insert_purchase;
/
show error

create or replace procedure prc_insert_ticket(Pscolum in number,
 Psrow in number,
 Ppurchaseid in number,
 Pisreturn in number)
 is begin
  insert into Ticket (ID, Scolum, Srow, PurchaseId, IsReturn) values(Ticket_sec.nextval, Pscolum,Psrow,Ppurchaseid, Pisreturn);
  commit;
end prc_insert_ticket;
/
show error

create or replace procedure prc_insert_country(Pname in varchar2)
 is begin
  insert into Country (ID, Name) values(Country_sec.nextval, Pname);
  commit;
end prc_insert_country;
/
show error