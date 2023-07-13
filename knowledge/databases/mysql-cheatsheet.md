---
title: MySQL Cheatsheet
---

_SQL_ (Structured Query Language) is a feature-rich language used for querying databases. These queries are better referred to as _statements_.

All of these examples are based on MySQL syntax.

## SELECT

Used to retrieve data from the database.

```sql
-- select all columns from the `users` table
SELECT * FROM users;

-- select `username` and `password` column from the `users` table
SELECT username, password FROM users;

-- select only 1 row from the `users` table
select * from users LIMIT 1;

-- select 1 row, but skip first two rows (effectively selecting 3rd row)
select * from users LIMIT 2,1;

-- select all columns from the `users` where the `username` col value is/is not `admin`
select * from users where username = 'admin';
select * from users where username != 'admin';

-- select the rows where the `username` is either `admin` or `jon`
select * from users where username='admin' or username='jon';

-- select the rows where the username is `admin` and `password` is `p4ssword`
select * from users where username='admin' and password='p4ssword';

-- [LIKE clause]
-- select any rows with username beginning with the letter a.
select * from users where username like 'a%';

-- select any rows with username ending with the letter n.
select * from users where username like '%n';

-- select any rows with a username containing the characters `mi` within them.
select * from users where username like '%mi%'

```

`

## UNION

The `UNION` statement combines the results of two or more `SELECT` statements to retrieve data from either single or multiple tables.

The `UNION` statement must retrieve the same number of columns in each `SELECT` statement, the columns have to be of a similar data type and the column order has to be the same.

```sql
-- select results from two tables and put them into one result set

SELECT name,address,city,postcode from customers UNION SELECT company,address,city,postcode from suppliers;

```

## INSERT

The `INSERT` statement tells the database we wish to add a new row of data into the table.

```sql
-- add username=bob, password=123 row into `users` table
insert into users (username,password) values ('bob','123');
```

## UPDATE

The `UPDATE` statement tells the DB we wish to update (alter) one or more rows of data within a table.

```sql
-- update `admin` username and password
update users SET username='root',password='pass123' where username='admin';
```

## DELETE

The **DELETE** statement tells the database we wish to delete one or more rows of data.

```sql
-- delete `admin` user
delete from users where username='martin';
```

Apart from missing the columns you wish to be returned, the format of this query is very similar to the `SELECT`. You can specify precisely which data to delete using the `WHERE` clause and the number of rows to be deleted using the `LIMIT` clause.

## Methods

### database()

Returns the db name

### group_concat(table_name)

Gets the specified column from multiple returned rows and puts it into one string separated by commas.

## information_schema

Contains information about all the databases and tables the user has access to.

```sql
SELECT 1,2,group_concat(table_name) FROM information_schema.tables WHERE table_schema = 'sqli_one'

SELECT 1,2,group_concat(column_name) FROM information_schema.columns WHERE table_name = 'staff_users'

SELECT 1,2,group_concat(username,':',password SEPARATOR '<br>') FROM staff_users
```

## sleep(x)

Sleeps (pauses) for `x` **seconds**, then returns 0.

---

> [!info] These are older notes, I need to go through them at some point

- `SELECT DISTINCT` - brings unique values from the table

```mysql
SELECT `name`, unit_price, unit_price * 1.1 as `new_price` FROM products
```

In SQL we need to use quotes when using dates (eg. in `WHERE`)

```mysql
SELECT * FROM sql_store.orders WHERE order_date > '2017-01-01';
```

in `WHERE` the `AND` operator takes precedence over the `OR` operator (it's evaluated 1st). It can be a,tered with parentheses

```mysql
SELECT * FROM sql_store.order_items WHERE order_id = 6 AND quantity * unit_price > 30
```

## `IN` operator

```mysql
SELECT * FROM [...]
WHERE state IN ('GA', 'MW', 'NY')
```

czyli `WHERE state = 'GA' OR state = 'MW' OR state = 'NY'`

```sql
SELECT * FROM sql_inventory.products WHERE quantity_in_stock IN (49, 38, 72)
```

## `BETWEEN` operator

```sql
WHERE points > 1000 AND points < 3000
```

```sql
WHERE points BETWEEN 1000 AND 3000
```

```sql
SELECT * FROM sql_store.customers
WHERE birth_date BETWEEN '1990-01-01' AND '2000-01-01'
```

## `LIKE` operator

- `%` - any number of characters
  - `b%` - starts with _b_ and then any number of characters
- `_` - single character

```sql
SELECT * FROM sql_store.customers WHERE phone LIKE '9%' OR address LIKE '%trail%';
```

```sql
SELECT * FROM sql_store.customers WHERE phone LIKE '9%'
```

Can be combined with `NOT`

## `REGEXP` operator

Practically like `LIKE` but allows to use regular expression

## `IS NULL`
