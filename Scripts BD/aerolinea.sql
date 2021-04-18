
drop table AUser cascade constraint;
drop table TypePlane cascade constraint;
drop table plane cascade constraint;
drop table Route cascade constraint;
drop table Schedule cascade constraint;
drop table Flight cascade constraint;
drop table Purchase cascade constraint;
drop table Ticket cascade constraint;
drop table Country cascade constraint;


drop sequence Ticket_sec;
drop sequence TypePlane_sec;
drop sequence Route_sec;
drop sequence Schedule_sec;
drop sequence Flight_sec;
drop sequence Purchase_sec;
drop sequence Country_sec;
drop sequence Plane_sec;


create sequence Ticket_sec start with 1 increment by 1;
create sequence TypePlane_sec start with 1 increment by 1;
create sequence Route_sec start with 1 increment by 1;
create sequence Schedule_sec start with 1 increment by 1;
create sequence Flight_sec start with 1 increment by 1;
create sequence Purchase_sec start with 1 increment by 1;
create sequence Country_sec start with 100 increment by 1;
create sequence Plane_sec start with 100 increment by 1;


PROMPT users
create table AUser(
 ID varchar2(12) PRIMARY KEY not null,
 Password varchar2(100) not null,
 Name varchar2(20) not null,
 Surnames varchar2(30) not null,
 Latitud Float not null,
 Longitud Float not null,
 Cellphone varchar(10),
 UserType number
);

PROMPT type
create table TypePlane(
 ID number  PRIMARY KEY not null,
 Model varchar2(10) not null,
 Brand varchar2(10) not null,
 NumberRow number not null,
 NumberColums number not null
);

PROMPT brand model en typeplane latitud y longitud en usuario

PROMPT plane
create table Plane(
	ID number PRIMARY KEY not null,
	typePlaneid number(10) not null
);
alter table Plane add constraint FK_TypePlane FOREIGN KEY (typePlaneid) REFERENCES TypePlane(ID);

Prompt Country

create table Country(
	ID number PRIMARY KEY not null,
	Name varchar2(50) not null
);


PROMPT route
create table Route(
 ID number NOT NULL,
 Duration number not null,
 OrigenId number not null,
 DestinoId number not null,
 Price FLOAT not null,
 Discount FLOAT,
 PRIMARY KEY(ID)
);
alter table Route add constraint FK_COUNTRY1 FOREIGN KEY (OrigenId) REFERENCES Country(ID);
alter table Route add constraint FK_COUNTRY2 FOREIGN KEY (DestinoId) REFERENCES Country(ID);

PROMPT Schedule
create table Schedule(
 ID number PRIMARY KEY NOT NULL,
 RouteId number not null,
 STime number not null,
 Sdate date not null
);
alter table Schedule add constraint FK_ROUTEID FOREIGN KEY (RouteId) REFERENCES Route(ID);


PROMPT flight
create table Flight(
 ID number PRIMARY KEY NOT NULL,
 Outbound number not null,
 Outbounddate date not null,
 PlaneId number not null,
 ArriveTime date
);
alter table Flight add constraint FK_PLANEID FOREIGN KEY (PlaneId) REFERENCES Plane(ID);
alter table Flight add constraint fk_leave foreign key(Outbound) REFERENCES Schedule(ID);


PROMPT purchase
create table Purchase(
 ID number PRIMARY KEY NOT NULL,
 FlightId number not null,
 UserId varchar2(12) not null,
 TotalPrice FLOAT not null,
 Tickets number not null,
 ReturnFlightId number
);
alter table Purchase add constraint fk_flight foreign key(FlightID) REFERENCES Flight(ID);
alter table Purchase add constraint fk_returnflight foreign key(ReturnFlightID) REFERENCES Flight(ID);
alter table Purchase add constraint fk_user foreign key(UserID) REFERENCES AUser(ID);

PROMPT ticket
create table Ticket(
 ID number PRIMARY KEY NOT NULL,
 Scolum number not null,
 Srow number not null,
 PurchaseId number not null
);
alter table Ticket add constraint fk_Purchase foreign key(PurchaseID) REFERENCES Purchase(ID);

alter table Ticket add IsReturn Number default 0;
alter table Purchase add PurchaseDate DATE default to_date('10-01-21','DD-MM-yy');
