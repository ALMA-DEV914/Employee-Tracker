INSERT INTO department (id, name)
VALUES 
(1, 'Service Department'),
(2, 'Supply Chain Department'),
(3, 'Sales Department'),
(4, 'Production Department'),
(5, 'Finance Department'),
(6, 'Information Department'),
(7, 'Engineering Department');


INSERT INTO roles ( title, salary, department_id)
VALUES
('Manager', 15000, 1),
('Lawyer', 25000, 2),
('Salesperson', 12000, 3),
('Team Lead', 18000, 1),
('Accountant', 14000, 5),
('Software Engineer', 10000, 6),
('Lead Engineer', 13000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('James', 'Fraser', 1, 2 ),
  ('Jack', 'London', 2, 4),
  ('Robert', 'Bruce', 3, null),
  ('Peter', 'Greenaway', 4, 3),
  ('Derek', 'Jarman', 4, 1),
  ('Paolo', 'Pasolini', 4, null),
  ('Heathcote', 'Williams', 5, 3),
  ('Sandy', 'Powell', 5, 2),
  ('Emil', 'Zola', 5, null),
  ('Sissy', 'Coalpits', 5, null),
  ('Antoinette', 'Capet', 6, 3),
  ('Samuel', 'Delany', 6, 4),
  ('Tony', 'Duvert', 6, 2),
  ('Dennis', 'Cooper', 6, 5),
  ('Monica', 'Bellucci', 7, 1),
  ('Samuel', 'Johnson', 7, null),
  ('John', 'Dryden', 7, 4),
  ('Alexander', 'Pope', 7, 6),
  ('Lionel', 'Johnson', 7, 3),
  ('Aubrey', 'Beardsley', 5, 1),
  ('Tulse', 'Luper', 4, 2),
  ('William', 'Morris', 3, 2),
  ('George', 'Shaw', 3, null),
  ('Arnold', 'Bennett', 5, 6),
  ('Algernon', 'Blackwood', 6, 3);
  