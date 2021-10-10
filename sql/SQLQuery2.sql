create table account
(
employee_id int not null PRIMARY KEY,
users nvarchar(50),
passwords nvarchar(50),
isActive bit,
role int
)