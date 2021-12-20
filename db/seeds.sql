INSERT INTO departments (department_name)
VALUES
    ('Engineering'),
    ('Finance'),
    ('Manufacturing'),
    ('Purchasing'),
    ('Service'),
    ('Shipping and Receiving');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Manager', 200000, 1),
    ('Manager', 200000, 2),
    ('Manager', 200000, 3),
    ('Manager', 200000, 4),
    ('Manager', 200000, 5),
    ('Manager', 200000, 6),
    ('Engineer', 100000, 1),
    ('Accountant', 100000, 2),
    ('Assembler', 50000, 3),
    ('Purchaser', 50000, 4),
    ('Technician', 60000, 5),
    ('Clerk', 50000, 6);

INSERT INTO employees (last_name, first_name, role_id, manager_id)
VALUES
    ('Smith', 'John', 1, null),
    ('Jones', 'Bill', 2, null),
    ('Johnson', 'Lisa', 3, null),
    ('Williams', 'Charles', 4, null),
    ('Brown', 'Jeffery', 5, null),
    ('Miller', 'Robert', 6, null),
    ('Davis', 'Kevin', 7, 1),
    ('Garcia', 'Lucia', 8, 2),
    ('Wilson', 'Brian', 9, 3),
    ('Nelson', 'Willie', 10, 4),
    ('Thomas', 'Frank', 11, 5),
    ('Moore', 'Kelly', 12, 6);