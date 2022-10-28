---
title: Best practice for PostgreSQL
linktitle: Best practice
description: Best practice for PostgreSQL
tags: [development, postgresql]
weight: 100
---

## Introduction
This is a work-in-progress. Reader discretion is adviced!

## Index
Consider the following when creating an index
- The cost of maintaining index-trees for *INSERT*, *UPDATE*, and *DELETE* operations. Do not use an index if these operations are more performance critical than the retrieval.
- When multiple indices are used in combination:
    - The order will impact performance greatly.
    - If some of the columns in an combined index is not matched against, the optimizer is likely to revert to a Full Table Scan.
    [Obfuscated Conditions - Smart Logic](https://use-the-index-luke.com/sql/where-clause/obfuscation/smart-logic)
- The type of index matters.

## Commands (Npgsql)
1. Do not concatenate User-Defined types as strings into the SQL commands. *(SQL injection preventation)*

## Parameters
1. Use *parameters* instead of embedding values in the SQL.
    - Values sent as parameters will not be interpreted as SQL. *(SQL injection preventation)*
    - Parameters are required for *prepared statements*. *(Performance)*
    [Parameters | Npgsql Documentation](https://www.npgsql.org/doc/basic-usage.html#parameters)
2. Use *positional* parameter notation instead of *named*. *(Performance)*
    ```c#
    await using var cmd = new NpgsqlCommand("INSERT INTO table (col1) VALUES ($1), ($2)", conn)
    {
        Parameters =
        {
            new() { Value = "some_value" },
            new() { Value = "some_other_value" }
        }
    };
    await cmd.ExecuteNonQueryAsync();
    ```
    [Positional and named placeholders | Npgsql Documentation](https://www.npgsql.org/doc/basic-usage.html#positional-and-named-placeholders)

## Functions (Stored Procedures)
* The difference between Postgres *functions* and *stored procedures* (after Postgres 11) is relatively small, and mostly related to functionality - not security or performance.
* Calling a function instead of embedding the SQL in a Npgsql command in C# will not prevent SQL injection attacks alone. (See *Parameters* below)
* If a function calls an unsafe function from its body, and pass a parameter value to the it, it could negate the SQL injection prevention that *parameters* provide.

## Prepared statements
1. Use prepared statements when you need performance. 
2. Use *persistent* prepared statements (Npgsql 3.2) to avoid *resets* when connections are closed, when using connection pooling.

- [Prepared Statements, Connection Pooling and Npgsql 3.2](https://www.roji.org/prepared-statements-in-npgsql-3-2)
- [Prepared Statements | Npgsql Documentation](https://www.npgsql.org/doc/prepare.html)

## TODO
### Use examine
### Statistics
### User priveliges
### Connection pooling
