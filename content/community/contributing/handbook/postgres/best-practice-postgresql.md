---
title: Best practice for PostgreSQL
linktitle: Best practice
description: Best practice for PostgreSQL
tags: [development, postgresql]
weight: 100
---

## Introduction
This is a work-in-progress. Reader discretion is adviced!

## Client library
Use the newest Npgsql library - ref [documentation](https://www.npgsql.org/doc/) for nuget package
and recommended use. Make sure to use NpgsqlDataSource that was introduced in Npgsql 7.0.

Configure npgsql with DI as described [here](https://github.com/npgsql/npgsql/issues/4503)
(missing in the standard docs at the time of writing).

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
* Calling a function instead of embedding the SQL in a Npgsql command in C# will not prevent SQL injection attacks alone. (See *Parameters*)
* If a function calls an unsafe function from its body, and pass a parameter value to the it, it could negate the SQL injection prevention that *parameters* provide.

## Prepared statements
1. Use prepared statements when you need performance. 
2. Use *persistent* prepared statements (Npgsql 3.2) to avoid *resets* when connections are closed, when using connection pooling.

- [Prepared Statements, Connection Pooling and Npgsql 3.2](https://www.roji.org/prepared-statements-in-npgsql-3-2)
- [Prepared Statements | Npgsql Documentation](https://www.npgsql.org/doc/prepare.html)

## Analyze queries
[Review explain documentation](https://www.postgresql.org/docs/current/sql-explain.html)
### Analyze sql statement
In your query window: Write "explain analyze" followed by our query. E.g. 
![Simple query](../simple-query.png "Simple query")

### Analyze procedure or function
- Make sure that auto_explain is configured on the server and that Postgres version >= 15.x
![Auto explain](../auto-explain.png "Auto explain")
- Do the following in your query window
```
SET auto_explain.log_min_duration = 0;
SET auto_explain.log_analyze = true;
SET auto_explain.log_nested_statements = ON;
SET auto_explain.log_level = INFO;
```
- Run your procedure or function. NB: The analysis result will be in the Messages tab.
![Analyze function](../analyze-function.png "Analyze function")

### Index analysis
Make sure that a proper index is used in the explained query plan. Try to add a new index if a proper candidate is missing.
Some times it's hard to make Postgres use your index.
[Review index documentation](https://www.postgresql.org/docs/current/indexes-examine.html).

## Json usage
### Json as db parameter
When using logical json documents as database parameters and/or result sets always use jsonb
as the data type to avoid unnecessary conversion between text and the binary representation of jsonb.

#### Input parameter example
Npgsql will do the json conversion. Procedure signature:
```
CREATE PROCEDURE xx(_instance JSONB)
```
```c#
Instance instance
pgcom.Parameters.AddWithValue(NpgsqlDbType.Jsonb, instance);
```

#### Output parameter example
Npgsql will do the json conversion. Function signature:
```
RETURNS TABLE (instance JSONB)
```
C#:
```c#
Instance instance = reader.GetFieldValue<Instance>("instance");
```

## DB columns with code values (logical enums)
Never define a column with fixed values to be of type text. Use integer or define a custom data type in the database.
Use an enum in the C# code. Enums in PostgreSQL have limitations and in some cases an
integer as db type would be a better choice.

### Custom data type (enum) in the database
- Enums data types are not transferred as integers between client and db, and the built
in support for type mapping requires explicit type mapping, so the simplest solution is
to transfer the values as text.
- Define a custom data type e.g.:
```
CREATE TYPE emailnotificationresulttype AS ENUM ('New', 'Sending', 'Succeeded', 'Failed_RecipientNotIdentified');
```
- This will match:
```c#
public enum EmailNotificationResultType
{
    New,
    Sending,
    Succeeded,
    Delivered,
    Failed_RecipientNotIdentified
}
```
- Send value. In function/proc cast to custom type e.g. _result::emailnotificationresulttype
```c#
pgcom.Parameters.AddWithValue(NpgsqlDbType.Text, EmailNotificationResultType.Succeeded.ToString());
```
- Receive value. In function/proc cast to text e.g. result::text
```c#
EmailNotificationResultType result = reader.GetValue<EmailNotificationResultType>("result");
```

## TODO
### Statistics
### User priveliges
### Connection pooling
