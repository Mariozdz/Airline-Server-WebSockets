

insert into Country(ID, Name) values(Country_sec.nextval, 'Costa Rica');
insert into Country(ID, Name) values(Country_sec.nextval, 'Argentina');
insert into Country(ID, Name) values(Country_sec.nextval, 'España');
insert into Country(ID, Name) values(Country_sec.nextval, 'Estados Unidos');
insert into Country(ID, Name) values(Country_sec.nextval, 'China');
insert into Country(ID, Name) values(Country_sec.nextval, 'Australia');
insert into Country(ID, Name) values(Country_sec.nextval, 'Canada');
insert into Country(ID, Name) values(Country_sec.nextval, 'Chile');


insert into AUser (ID, Password, Name, Surnames, Latitud, Longitud, Cellphone, UserType) values ('Mariozdz', '123', 'Mario',' Arguello', 9.965939, -84.116679, '83834649',0);
insert into AUser (ID, Password, Name, Surnames, Latitud, Longitud, Cellphone,UserType) values ('Brazza', '123', 'Braslin', ' Rodriguez ' , 9.965939, -84.116679, '83834649',0);
insert into AUser (ID, Password, Name, Surnames, Latitud, Longitud, Cellphone,UserType) values ('User3', '123', 'User3', 'User3', 9.965939, -84.116679, '83834649',0);
insert into AUser (ID, Password, Name, Surnames, Latitud, Longitud, Cellphone, UserType) values ('User4', '123', 'User4',' User4' , 9.965939, -84.116679, '83834649',0);


insert into TypePlane(ID,Model,Brand,NumberRow,NumberColums) VALUES (TypePlane_sec.nextval, 'Boeing', '747', 10,4);
insert into TypePlane(ID,Model,Brand,NumberRow,NumberColums) VALUES (TypePlane_sec.nextval, 'Boeing', '777', 10,6);
insert into TypePlane(ID,Model,Brand,NumberRow,NumberColums) VALUES (TypePlane_sec.nextval, 'Airbus', 'A340', 10,7);
insert into TypePlane(ID,Model,Brand,NumberRow,NumberColums) VALUES (TypePlane_sec.nextval, 'Boeing', '767', 10,4);
insert into TypePlane(ID,Model,Brand,NumberRow,NumberColums) VALUES (TypePlane_sec.nextval, 'Boeing', 'A330', 10,4);
insert into TypePlane(ID,Model,Brand,NumberRow,NumberColums) VALUES (TypePlane_sec.nextval, 'Boeing', '757', 10,4);
insert into TypePlane(ID,Model,Brand,NumberRow,NumberColums) VALUES (TypePlane_sec.nextval, 'McDonnell', 'MD-80', 10,7);

insert into Plane(ID,typePlaneid) values (Plane_sec.nextval,1);
insert into Plane(ID,typePlaneid) values (Plane_sec.nextval,2);
insert into Plane(ID,typePlaneid) values (Plane_sec.nextval,3);
insert into Plane(ID,typePlaneid) values (Plane_sec.nextval,4);
insert into Plane(ID,typePlaneid) values (Plane_sec.nextval,5);
insert into Plane(ID,typePlaneid) values (Plane_sec.nextval,6);
insert into Plane(ID,typePlaneid) values (Plane_sec.nextval,7);


PROMPT CR - ARG
insert into Route(ID,Duration,OrigenId,DestinoId,Price,Discount)
 values (Route_sec.nextval, 3 , 100, 101, 950.0, 0.0);
 PROMPT arg - cr
insert into Route(ID,Duration,OrigenId,DestinoId,Price,Discount)
 values (Route_sec.nextval, 3 , 101, 100, 780.0, 0.0);
 PROMPT cr - canada
insert into Route(ID,Duration,OrigenId,DestinoId,Price,Discount)
 values (Route_sec.nextval, 6 , 100, 106, 1100.0, 0.0);
 PROMPT canada - cr
insert into Route(ID,Duration,OrigenId,DestinoId,Price,Discount)
 values (Route_sec.nextval, 6 , 106, 100, 980.0, 0.0);
 PROMPT est - china
 insert into Route(ID,Duration,OrigenId,DestinoId,Price,Discount)
 values (Route_sec.nextval, 13 , 103, 104, 2200.0, 0.0);
 PROMPT china - est
insert into Route(ID,Duration,OrigenId,DestinoId,Price,Discount)
 values (Route_sec.nextval, 13 , 104, 103, 2400.0, 0.0);
 PROMPT chile - ARG
 insert into Route(ID,Duration,OrigenId,DestinoId,Price,Discount)
 values (Route_sec.nextval, 1 , 107, 101, 60.0, 0.0);
 PROMPT arg - chile
insert into Route(ID,Duration,OrigenId,DestinoId,Price,Discount)
 values (Route_sec.nextval, 1 , 101, 107, 90.0, 0.0);
 

insert into Schedule(ID,PlaneId,RouteId,STime,Sdate) 
 values(Schedule_sec.nextval, 107,  17, 3, TO_DATE('2003/05/03 15:30', 'yyyy/mm/dd hh24:mi'));
 insert into Schedule(ID,PlaneId,RouteId,STime,Sdate) 
 values(Schedule_sec.nextval, 108,  18, 2, TO_DATE('2003/05/03 21:00', 'yyyy/mm/dd hh24:mi'));
 insert into Schedule(ID,PlaneId,RouteId,STime,Sdate) 
 values(Schedule_sec.nextval, 109,  19, 4, TO_DATE('2003/05/03 7:30', 'yyyy/mm/dd hh24:mi'));
 insert into Schedule(ID,PlaneId,RouteId,STime,Sdate) 
 values(Schedule_sec.nextval, 110,  20, 5, TO_DATE('2003/05/03 10:40', 'yyyy/mm/dd hh24:mi'));
 insert into Schedule(ID,PlaneId,RouteId,STime,Sdate) 
 values(Schedule_sec.nextval, 111,  21, 7, TO_DATE('2003/05/03 12:00', 'yyyy/mm/dd hh24:mi'));
 insert into Schedule(ID,PlaneId,RouteId,STime,Sdate) 
 values(Schedule_sec.nextval, 112,  22, 1, TO_DATE('2003/05/03 13:30', 'yyyy/mm/dd hh24:mi'));
 insert into Schedule(ID,PlaneId,RouteId,STime,Sdate) 
 values(Schedule_sec.nextval, 113,  23, 3, TO_DATE('2003/05/03 19:30', 'yyyy/mm/dd hh24:mi'));
 insert into Schedule(ID,PlaneId,RouteId,STime,Sdate) 
 values(Schedule_sec.nextval, 107,  18, 2, TO_DATE('2003/05/03 20:30', 'yyyy/mm/dd hh24:mi'));
 insert into Schedule(ID,PlaneId,RouteId,STime,Sdate) 
 values(Schedule_sec.nextval, 107,  17, 4, TO_DATE('20:30', 'hh24:mi'));


commit;
