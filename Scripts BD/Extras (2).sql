
CREATE OR REPLACE FUNCTION fn_get_typeplane
RETURN SYS_REFCURSOR
AS
    typeplane_cursor SYS_REFCURSOR;
BEGIN
    OPEN typeplane_cursor FOR
        SELECT ID, model, brand, NumberRow, NumberColums FROM TypePlane;
RETURN typeplane_cursor;
END;
/