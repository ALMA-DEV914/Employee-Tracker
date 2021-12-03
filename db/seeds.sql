USE employee_tracker;

INSERT INTO department (id, name)
VALUES 
(1, 'Service Department'),
(2, 'Supply Chain Department'),
(3, 'Sales Department'),
(4, 'Production Department'),
(5, 'Finance Department'),
(6, 'Information Department'),
(7, 'Engineering Department');


INSERT INTO role ( title, salary, department_id)
VALUES
('Manager', 15000, 1),
('Lawyer', 25000, 2),
('Salesperson', 12000, 3),
('Team Lead', 18000, 7),
('Accountant', 14000, 5),
('Software Engineer', 10000, 6),
('Lead Engineer', 13000, 4);
('Sales Manager', 110000, 1),
('Sales Person', 75000, 1),
('Mechanical Engineer', 120000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('James', 'Fraser', 1, null),
  ('Jack', 'London', 2, null),
  ('Robert', 'Bruce', 3, null),
  ('Peter', 'Greenaway', 4, 3),
  ('Derek', 'Jarman', 5, 1),
  ('Paolo', 'Pasolini', 6, 2),
  ('Heathcote', 'Williams', 7, null),
  ('Sandy', 'Powell', 3, 2),
  ('Emil', 'Zola', 5, 3),
  ('Sissy', 'Coalpits', 5, 1),
  ('Antoinette', 'Capet', 1, 3),
  ('Samuel', 'Delany', 4,2),
  ('Tony', 'Duvert', 7, 2),
  ('Dennis', 'Cooper', 3, 5),
  ('Monica', 'Bellucci', 6, null),
  ('Samuel', 'Johnson', 6, 2),
  ('John', 'Dryden', 5, 3),
  ('Alexander', 'Pope', 2, 1),
  ('Lionel', 'Johnson', 2,  3),
  ('Aubrey', 'Beardsley', 5, 1),
  ('Tulse', 'Luper', 4, 2),
  ('William', 'Morris', 5, 2),
  ('George', 'Shaw', 1, null),
  ('Arnold', 'Bennett', 3, 2),
  ('Algernon', 'Blackwood', 4, 3);
  