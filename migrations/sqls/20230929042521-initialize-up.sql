-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

DROP TYPE IF EXISTS VALID_ROLES;

CREATE TYPE VALID_ROLES AS ENUM('BUYER', 'SELLER');

CREATE TABLE IF NOT EXISTS public.users
(
    id character varying(25) COLLATE pg_catalog."default" NOT NULL,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    email character varying(50) COLLATE pg_catalog."default" NOT NULL,
    role valid_roles DEFAULT 'BUYER'::valid_roles,
    password text COLLATE pg_catalog."default" NOT NULL,
    createdat timestamp without time zone DEFAULT now(),
    verified boolean DEFAULT false,
    deleted boolean DEFAULT false,
    enabled boolean DEFAULT false,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;