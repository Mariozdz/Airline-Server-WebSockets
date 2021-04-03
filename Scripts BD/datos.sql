

insert into Country(ID, Name) values(Country_sec.nextval, 'Costa Rica');
insert into Country(ID, Name) values(Country_sec.nextval, 'Argentina');
insert into Country(ID, Name) values(Country_sec.nextval, 'España');
insert into Country(ID, Name) values(Country_sec.nextval, 'Estados Unidos');
insert into Country(ID, Name) values(Country_sec.nextval, 'China');
insert into Country(ID, Name) values(Country_sec.nextval, 'Australia');
insert into Country(ID, Name) values(Country_sec.nextval, 'Canada');
insert into Country(ID, Name) values(Country_sec.nextval, 'Chile');


insert into AUser (ID, Password, Name, Surnames, Latitud, Longitud, Cellphone) values ('Mariozdz', '123', 'Mario',' Arguello', 9.965939, -84.116679, '83834649');
insert into AUser (ID, Password, Name, Surnames, Latitud, Longitud, Cellphone) values ('Brazza', '123', 'Braslin', ' Rodriguez ' , 9.965939, -84.116679, '83834649');
insert into AUser (ID, Password, Name, Surnames, Latitud, Longitud, Cellphone) values ('User3', '123', 'User3', 'User3', 9.965939, -84.116679, '83834649');
insert into AUser (ID, Password, Name, Surnames, Latitud, Longitud, Cellphone) values ('User4', '123', 'User4',' User4' , 9.965939, -84.116679, '83834649');


insert into TypePlane(ID,Model,Brand,NumberRow,NumberColums) VALUES (TypePlane_sec.nextval, 'Boeing', '747', 10,4);
insert into TypePlane(ID,Model,Brand,NumberRow,NumberColums) VALUES (TypePlane_sec.nextval, 'Boeing', '777', 10,6);
insert into TypePlane(ID,Model,Brand,NumberRow,NumberColums) VALUES (TypePlane_sec.nextval, 'Airbus', 'A340', 10,7);
insert into TypePlane(ID,Model,Brand,NumberRow,NumberColums) VALUES (TypePlane_sec.nextval, 'Boeing', '767', 10,4);
insert into TypePlane(ID,Model,Brand,NumberRow,NumberColums) VALUES (TypePlane_sec.nextval, 'Boeing', 'A330', 10,4);
insert into TypePlane(ID,Model,Brand,NumberRow,NumberColums) VALUES (TypePlane_sec.nextval, 'Boeing', '757', 10,4);
insert into TypePlane(ID,Model,Brand,NumberRow,NumberColums) VALUES (TypePlane_sec.nextval, 'McDonnell', 'MD-80', 10,7);

insert into Plane(ID,typePlaneid) values ('100',8);
insert into Plane(ID,typePlaneid) values ('101',9);
insert into Plane(ID,typePlaneid) values ('102',10);
insert into Plane(ID,typePlaneid) values ('103',11);
insert into Plane(ID,typePlaneid) values ('104',12);
insert into Plane(ID,typePlaneid) values ('105',13);
insert into Plane(ID,typePlaneid) values ('106',14);


PROMPT CR - ARG
insert into Route(ID,Duration,OrigenId,DestinoId,Price,Discount)
 values (Route_sec.nextval, 3 , 108, 109, 950.0, 0.0);
 PROMPT arg - cr
insert into Route(ID,Duration,OrigenId,DestinoId,Price,Discount)
 values (Route_sec.nextval, 3 , 109, 108, 780.0, 0.0);
 PROMPT cr - canada
insert into Route(ID,Duration,OrigenId,DestinoId,Price,Discount)
 values (Route_sec.nextval, 6 , 108, 114, 1100.0, 0.0);
 PROMPT canada - cr
insert into Route(ID,Duration,OrigenId,DestinoId,Price,Discount)
 values (Route_sec.nextval, 6 , 114, 108, 980.0, 0.0);
 PROMPT est - china
 insert into Route(ID,Duration,OrigenId,DestinoId,Price,Discount)
 values (Route_sec.nextval, 13 , 111, 112, 2200.0, 0.0);
 PROMPT china - est
insert into Route(ID,Duration,OrigenId,DestinoId,Price,Discount)
 values (Route_sec.nextval, 13 , 112, 111, 2400.0, 0.0);
 PROMPT chile - ARG
 insert into Route(ID,Duration,OrigenId,DestinoId,Price,Discount)
 values (Route_sec.nextval, 1 , 115, 109, 60.0, 0.0);
 PROMPT arg - chile
insert into Route(ID,Duration,OrigenId,DestinoId,Price,Discount)
 values (Route_sec.nextval, 1 , 109, 115, 90.0, 0.0);
 

create table Schedule(
 ID number PRIMARY KEY NOT NULL,
 PlaneId varchar2(10) not null,
 RouteId number not null,
 STime number not null,
 Sdate date not null
);

insert into Schedule(ID,PlaneId,RouteId,STime,Sdate) 
 values(Schedule_sec.nextval, '100',  1, 3, TO_DATE('2003/05/03 15:30', 'yyyy/mm/dd hh24:mi'));
 insert into Schedule(ID,PlaneId,RouteId,STime,Sdate) 
 values(Schedule_sec.nextval, '101',  2, 2, TO_DATE('2003/05/03 21:00', 'yyyy/mm/dd hh24:mi'));
 insert into Schedule(ID,PlaneId,RouteId,STime,Sdate) 
 values(Schedule_sec.nextval, '102',  3, 4, TO_DATE('2003/05/03 7:30', 'yyyy/mm/dd hh24:mi'));
 insert into Schedule(ID,PlaneId,RouteId,STime,Sdate) 
 values(Schedule_sec.nextval, '103',  4, 5, TO_DATE('2003/05/03 10:40', 'yyyy/mm/dd hh24:mi'));
 insert into Schedule(ID,PlaneId,RouteId,STime,Sdate) 
 values(Schedule_sec.nextval, '104',  5, 7, TO_DATE('2003/05/03 12:00', 'yyyy/mm/dd hh24:mi'));
 insert into Schedule(ID,PlaneId,RouteId,STime,Sdate) 
 values(Schedule_sec.nextval, '105',  6, 1, TO_DATE('2003/05/03 13:30', 'yyyy/mm/dd hh24:mi'));
 insert into Schedule(ID,PlaneId,RouteId,STime,Sdate) 
 values(Schedule_sec.nextval, '106',  7, 3, TO_DATE('2003/05/03 19:30', 'yyyy/mm/dd hh24:mi'));
 insert into Schedule(ID,PlaneId,RouteId,STime,Sdate) 
 values(Schedule_sec.nextval, '101',  8, 2, TO_DATE('2003/05/03 20:30', 'yyyy/mm/dd hh24:mi'));
 insert into Schedule(ID,PlaneId,RouteId,STime,Sdate) 
 values(Schedule_sec.nextval, '101',  2, 4, TO_DATE('20:30', 'hh24:mi'));


commit;
