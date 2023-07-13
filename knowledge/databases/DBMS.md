---
title: DBMS
---

_Database Management System_ is a software that controls a database.

DBMS's fall into two camps: *Relational* or *Non-Relational*.

A relational database, stores information in tables and often the tables have shared information between them, they use columns to specify and define the data being stored and rows to actually store the data. The tables will often contain a column that has a **primary key** which will then be used in other tables to reference it and cause a _relationship_ between the tables.

Non-relational database (_NoSQL_) on the other hand is any sort of database that doesn't use tables, columns and rows to store the data, a specific database layout doesn't need to be constructed so each row of data can contain different information which can give more flexibility over a relational database. Some popular databases of this type are MongoDB, Cassandra and ElasticSearch.

Within a DBMS, you can have multiple databases, each containing its own set of related data.
