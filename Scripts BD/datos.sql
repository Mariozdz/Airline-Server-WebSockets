

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

commit;
