CREATE DATABASE inflation;

CREATE TABLE inflation(
    category VARCHAR(255),
    year VARCHAR(255),
    value NUMERIC
);

\copy inflation(category,year,value) from '/Users/admin/Documents/cpi.csv' delimiter ',' csv header;
\copy inflation(category,year,value) from '/Users/admin/Documents/everything_else.csv' delimiter ',' csv header;

insert into inflation values ('healthcare', '2021', 325);
insert into inflation values ('education', '2021', 199.3);
insert into inflation values ('housing', '2021', 177.2);
insert into inflation values ('stocks', '2021', 480.5);
update inflation set value = 335 where category = 'healthcare' and year = '2021';