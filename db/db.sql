drop table if exists users cascade;
create table if not exists users (
    id bigserial primary key,
    name varchar(150) not null,
    lastname varchar(150) not null,
    phone varchar(10) not null unique,
    email varchar(150) not null unique,
    password varchar(150) not null,
    image varchar(255) null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) null
)

drop table if exists subject cascade;
create table subject(
    id bigserial primary key,
    id_user bigint not null,
    name varchar(150) not null,
    subject_code varchar(10) null,
    professor_name varchar(150) not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null,
    foreign key (id_user) 
        references users(id) on update cascade on delete cascade
)

drop table if exists clase cascade;
-- create table clase(
--     id bigserial primary key,
--     id_user bigint not null,
--     id_subject bigint not null,
--     begin_hour timestamp(0) not null,
--     end_hour timestamp(0) not null,
--     days varchar(13) not null,
--     classroom varchar(10) null,
--     building varchar(20) null,
--     created_at timestamp(0) not null,
--     updated_at timestamp(0) not null,
--     foreign key (id_subject) 
--         references subject(id) on update cascade on delete cascade,
--     foreign key (id_user)
--         references users(id) on update cascade on delete cascade
-- )

--Nueva tabla sin fk_subject
drop table if exists clase cascade;
create table clase( 
    id bigserial primary key,
    id_user bigint not null,
    subject varchar(150) not null,
    begin_hour timestamp(0) not null,
    end_hour timestamp(0) not null,
    days varchar(13) not null,
    classroom varchar(10) null,
    building varchar(20) null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null,
    foreign key (id_user)
        references users(id) on update cascade on delete cascade
)

drop table if exists tasks cascade;
create table tasks(
    id bigserial primary key,
    id_user bigint not null,
    name varchar(150) not null,
    description varchar(255) null,
    delivery_date timestamp not null,
    subject varchar(150) not null,
    type varchar(50) not null,
    status varchar(100) not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null,
    foreign key (id_user)
        references users(id) on update cascade on delete cascade
)

drop table if exists user_has_tasks cascade;
create table user_has_tasks(
    id_user bigint not null,
    id_task bigint not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null,
    primary key (id_user, id_task),
    foreign key (id_user)
        references users(id) on update cascade on delete cascade,
    foreign key (id_task)
        references tasks(id) on update cascade on delete cascade
)

drop table if exists instruction cascade;
create table instruction(
    type varchar(25) not null,
    instruction varchar(255) not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null
)

drop table if exists ia_task cascade;
create table ia_task(
    id bigserial primary key,
    command varchar(255) not null,
    type bigint,
	obj bigint,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null
)


CREATE OR REPLACE TRIGGER UPDATE_SUBJECT_NAME
AFTER UPDATE ON subject
FOR EACH ROW EXECUTE PROCEDURE CHANGE_NAME();

CREATE OR REPLACE FUNCTION CHANGE_NAME()
RETURNS TRIGGER AS 
$$
DECLARE
BEGIN
	UPDATE tasks SET "subject" = NEW.name WHERE subject = OLD.name;  
    UPDATE clase SET "subject" = NEW.name WHERE subject = OLD.name;
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';