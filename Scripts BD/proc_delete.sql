create or replace procedure prc_delete_general(Ptable in varchar2,
 Pid in number)
 is begin
  --delete from Ptable where ID = Pid;
  Execute immediate 'DELETE from' || Ptable || 'where ID = ' || to_char(Pid) || ';';
  commit;
end prc_delete_general;
/
show error  

create or replace procedure prc_delete_user(Pid in varchar)
 is begin
  delete from AUser where ID = Pid;

  commit;
end prc_delete_user;
/
show error  

create or replace procedure prc_delete_typeplane(Pid in number)
 is begin
  delete from TypePlane where ID = Pid;
  commit;
end prc_delete_typeplane;
/
show error  

create or replace procedure prc_delete_plane(Pid in varchar2)
 is begin
  delete from Plane where ID = Pid;
 
  commit;
end prc_delete_plane;
/
show error  
create or replace procedure prc_delete_route(Pid in number)
 is begin
  delete from Route where ID = Pid;
  commit;
end prc_delete_route;
/
show error  

create or replace procedure prc_delete_schedule(Pid in number)
 is begin
  delete from Schedule where ID = Pid;
  commit;
end prc_delete_schedule;
/
show error  

create or replace procedure prc_delete_flight(Pid in number)
 is begin
  delete from Flight where ID = Pid;
  
  commit;
end prc_delete_flight;
/
show error  

create or replace procedure prc_delete_purchase(Pid in number)
 is begin
  delete from Purchase where ID = Pid;
  commit;
end prc_delete_purchase;
/
show error  

create or replace procedure prc_delete_ticket(Pid in number)
 is begin
  delete from Ticket where ID = Pid;
  commit;
end prc_delete_ticket;
/
show error 

create or replace procedure prc_delete_country(Pid in number)
 is begin
  delete from Country where ID = Pid;
  commit;
end prc_delete_country;
/
show error   