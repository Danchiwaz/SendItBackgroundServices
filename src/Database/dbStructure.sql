-- function to send user by email 
CREATE OR REPLACE FUNCTION GetAllUsersToSendEmail()
RETURNS  JSON
LANGUAGE SQL
AS $$
	select array_to_json(array_agg(row_to_json(u)))
	from(
		SELECT * FROM public.users WHERE isregemail= 'no'
	) u;
$$;
-- end of function to send users email upon registration 
-- calling the function for sending users emails 
SELECT public.GetAllUsersToSendEmail();
-- end of calling the function for sending users emails 


-- procedre to update user email field to yes
CREATE OR REPLACE PROCEDURE public.IsRegisterTrue(
	IN theUsername character DEFAULT NULL::character

)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
	UPDATE public.users
	SET isRegEmail = 'yes' WHERE username = theUsername;
END;
$BODY$


CALL public.IsRegisterTrue('Danchiwaz')
-- end of the  procedure to update user email field to yes