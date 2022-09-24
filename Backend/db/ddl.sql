-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE client (
    u_id       SERIAL NOT NULL,
    email      VARCHAR(50),
    full_name  VARCHAR(50),
    created_at TIMESTAMP(0),
    updated_at TIMESTAMP(0)
);

ALTER TABLE client ADD CONSTRAINT client_pk PRIMARY KEY ( u_id );

ALTER TABLE client ADD CONSTRAINT client__un UNIQUE ( email );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE messages (
    message     json NOT NULL,
    session_u_id INTEGER NOT NULL
);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE rating (
    session_u_id SERIAL NOT NULL,
    rating       DECIMAL(6, 1),
    review       VARCHAR(300)
);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE "session" (
    u_id        SERIAL NOT NULL,
    start_time  TIMESTAMP(0),
    finish_time TIMESTAMP(0),
    vendor_u_id INTEGER NOT NULL,
    client_u_id INTEGER NOT NULL
);

ALTER TABLE "session" ADD CONSTRAINT session_pk PRIMARY KEY ( u_id );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE vendor (
    u_id       SERIAL NOT NULL,
    email      VARCHAR(50),
    password   VARCHAR(200),
    full_name  VARCHAR(50),
    is_admin   BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP(0),
    updated_at TIMESTAMP(0)
);

ALTER TABLE vendor ADD CONSTRAINT vendor_pk PRIMARY KEY ( u_id );

ALTER TABLE vendor ADD CONSTRAINT vendor__unv1 UNIQUE ( email );

ALTER TABLE messages
    ADD CONSTRAINT messages_session_fk FOREIGN KEY ( session_u_id )
        REFERENCES session ( u_id ) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE rating
    ADD CONSTRAINT rating_session_fk FOREIGN KEY ( session_u_id )
        REFERENCES "session" ( u_id ) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "session"
    ADD CONSTRAINT session_client_fk FOREIGN KEY ( client_u_id )
        REFERENCES client ( u_id ) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "session"
    ADD CONSTRAINT session_vendor_fk FOREIGN KEY ( vendor_u_id )
        REFERENCES vendor ( u_id ) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE INDEX session_index 
ON "session" (u_id);
CREATE INDEX vendor_index 
ON "vendor" (email);