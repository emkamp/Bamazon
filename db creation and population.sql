create database Bamazon;
use Bamazon;

create table products(
item_id integer(4) auto_increment not null,
product_name varchar(200) not null,
department_name varchar(60) not null,
price float not null,
stock_quantity integer(4) not null,
primary key(item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
values('Unicorn Tears', 'Magical Items', 895.50, 60),
('The One Ring', 'Magical Items', 95.00, 1),
('The Ring of Adamant', 'Magical Items', 995.00, 1),
('The Ring of Fire', 'Magical Items', 995.00, 1),
('The Ring of Air', 'Magical Items', 995.00, 1),
('Dwarvish Ring of Power', 'Magical Items', 95.00, 7),
('Mannish Ring of Power', 'Magical Items', 95.00, 9),
('The Golden Fleece','Magical Items', 645.50, 1),
('Girdle of Strength', 'Magical Items', 499.99, 3),
('Flying Carpet','Magical Items', 75.00, 26),
('1973 Ford Falcon XB GT Coupe V8 Interceptor', 'Battle Vehicles', 6000.00, 2),
('The Gigahorse','Battle Vehicles', 8995.99, 1),
('Polecat, Assorted', 'Battle Vehicles', 2999.95, 7),
('Caltrop, Assorted', 'Battle Vehicles', 2499.99, 6),
('Buggy, Assorted', 'Battle Vehicles', 900.10, 9),
('Yamaha R1 2010 Motorcycle', 'Battle Vehicles', 295.00, 3),
('Starfighter: X-Wing', 'Space Ships', 6000, 56),
('Starfighter: Y-Wing', 'Space Ships', 5000, 41),
('Starfighter: B-Wing', 'Space Ships', 7000, 25),
('Starfighter: Porax-38', 'Space Ships', 3500, 22),
('TIE Fighter', 'Space Ships', 1500, 345),
('TIE Interceptop', 'Space Ships', 1500, 345),
('TIE Bomber', 'Space Ships', 1950, 345),
('Star Destroyer: I-class', 'Space Ships', 25000, 19),
('Star Destroyer: II-class', 'Space Ships', 45000, 8),
('Star Destroyer: Venator-class', 'Space Ships', 75000, 8),
('Star Destroyer: Super-class', 'Space Ships', 215000, 2),
('Star Destroyer: Tector-class', 'Space Ships', 201000, 3),
('Star Destroyer: Secutor-class', 'Space Ships', 89000, 3);