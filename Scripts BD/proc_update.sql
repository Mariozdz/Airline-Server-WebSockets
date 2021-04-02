
create or replace procedure prc_update_user(Puser in varchar2,
 Ppassword in varchar2,
 Pname in varchar2,
 Psurnames in varchar2,
 Platitud in Float,
 Plongitud in FLOAT,
 Pcellphone in varchar2)
 is begin
  update AUser set Password = Ppassword, Name= Pname, Surnames = Psurnames, Latitud = Platitud, Longitud = Plongitud, Cellphone = Pcellphone where ID = Puser;
  commit;
end prc_update_user;
/
show error

create or replace procedure prc_update_typeplane(Pid in number,
 Pmodel in varchar2,
 Pbrand in varchar2,
 Prow in number,
 Pcol in number)
 is begin
  update TypePlane set model = Pmodel, brand = Pbrand, NumberRow = Prow, NumberColums = Pcol where ID = Pid;
  commit;
end prc_update_typeplane;
/
show error

create or replace procedure prc_update_plane(Pid in varchar2,
 PtypePlane in number)
 is begin
  update Plane set typePlaneid = PtypePlane where ID = Pid;
  commit;
end prc_update_plane;
/
show error

create or replace procedure prc_update_route(Pid in number,
 Pduration in number,
 Porigenid in number,
 Pdestinoid in varchar2,
 Pprice in Float,
 Pdiscount in Float)
 is begin
  Update Route set Duration = Pduration, OrigenId = Porigenid, DestinoId = Pdestinoid, Price = Pprice, Discount = Pdiscount where ID = Pid;
  commit;
end prc_update_route;
/
show error

create or replace procedure prc_update_schedule(Pid in number,
 Pplaneid in varchar2,
 Prouteid in number,
 Pstime in number,
 Pdate in date
 )
 is begin
  Update Schedule set PlaneId = Pplaneid, RouteId = Prouteid, STime = Pstime, SDate = Pdate where ID = Pid;
  commit;
end prc_update_schedule;
/
show error

create or replace procedure prc_update_flight(Pid in number,
Pleave in number,
 Parrive in number,
 Patime in date,
 Pltime in date)
 is begin
  update Flight set Leave = Pleave, Arrive = Parrive, Atime = Patime, Ltime = Pltime where ID = Pid;
  commit;
end prc_update_flight;
/
show error

create or replace procedure prc_update_purchase(Pid in number,
 Pflightid in number,
 Puserid in varchar2,
 Ptotalprice in Float)
 is begin
  Update Purchase set FlightId = Pflightid, UserId = Puserid, TotalPrice = Ptotalprice where ID = Pid;
  commit;
end prc_update_purchase;
/
show error

create or replace procedure prc_update_ticket(Pid in number,
 Pscolum in number,
 Psrow in number,
 Ppurchaseid in number)
 is begin
  Update Ticket set Scolum = Pscolum, Srow = Psrow, PurchaseId = Ppurchaseid where ID = Pid;
  commit;
end prc_update_ticket;
/
show error

create or replace procedure prc_update_country(Pid in number,
 Pname in number)
 is begin
  Update Country set Name = Pname where ID = Pid;
  commit;
end prc_update_country;
/
show error