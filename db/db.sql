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

drop table if exists class cascade;
create table class(
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

drop table if exists schedule cascade;
create table schedule(
    id bigserial primary key,
    begin_hour timestamp not null,
    end_hour timestamp not null,
    days int not null,
    classroom varchar(10) not null,
    building varchar(20) not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null
)

drop table if exists class_has_schedule cascade;
create table class_has_schedule(
    id_class bigint not null,
    id_schedule bigint not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null,
    primary key (id_class, id_schedule),
    foreign key (id_class)
        references class(id) on update cascade on delete cascade,
    foreign key (id_schedule)
        references schedule(id) on update cascade on delete cascade
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
        references task(id) on update cascade on delete cascade
)

drop table if exists instruction cascade;
create table instruction(
    type varchar(25) not null,
    instruction varchar(255) not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null
)