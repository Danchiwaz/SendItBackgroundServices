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


-- function to get sender email 
CREATE OR REPLACE FUNCTION GetSenderEmail(
	IN theSender character varying DEFAULT NULL::character
)
RETURNS  JSON
LANGUAGE SQL
AS $$
	select array_to_json(array_agg(row_to_json(u)))
	from(
		SELECT email FROM public.users WHERE username= theSender
	) u;
$$;

SELECT public.GetSenderEmail('Danchiwaz')
-- end of function to get sender email 


-- function to get receiver email 
CREATE OR REPLACE FUNCTION GetReceiverEmail(
	IN theSender character varying DEFAULT NULL::character
)
RETURNS  JSON
LANGUAGE SQL
AS $$
	select array_to_json(array_agg(row_to_json(u)))
	from(
		SELECT email FROM public.users WHERE username= theSender
	) u;
$$;

SELECT public.GetReceiverEmail('Danchiwaz')
-- end of function to get receiver email 


-- function to get all parcels 
CREATE OR REPLACE FUNCTION GetAllParcels()
RETURNS  JSON
LANGUAGE SQL
AS $$
	select array_to_json(array_agg(row_to_json(u)))
	from(
		SELECT * FROM public.parcels where isDeleted='no' and sent =False
	) u;
$$;


SELECT public.getAllParcels()
-- end of function to get all parcels  

-- CREATE OR REPLACE FUNCTION GetAllParcels()
-- RETURNS  JSON
-- LANGUAGE SQL
-- AS $$
-- 	select array_to_json(array_agg(row_to_json(u)))
-- 	from(
-- 		SELECT * FROM public.parcels where isDeleted='no' and sent =False
-- 	) u;
-- $$;


-- SELECT public.getAllParcels()


-- Update the status of sent 
CREATE OR REPLACE PROCEDURE public.IsSentTrue(
	IN theId uuid DEFAULT NULL::uuid

)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
	UPDATE public.parcels
	SET sent = True WHERE id = theId;
END;
$BODY$
CALL public.IsSentTrue('74830cdb-059f-462d-be80-367732b0ce0c')

-- Update the status of sent