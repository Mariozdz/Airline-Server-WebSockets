
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

