# BitIO API

BitIO supports most SQL-like language, as well as some Postgres SQL functions. As a general rule of thumb,
any command that only affects tables is supported, which covers all of our use cases.

For SQL documentation, see [this reference sheet](https://dev.mysql.com/doc/refman/8.0/en/).

The database schema is as follows:

### TABLE Test
Intended to be used for testing purposes only, and should never store any data directly relevant
to Equidistant.

```sql
CREATE TABLE Test(test_string text, numbers int)
```

### TABLE Users
Stores user-level data.

```sql
CREATE TABLE Users(email text NOT NULL PRIMARY KEY, 
                   password text NOT NULL,
                   salt text NOT NULL,
                   address text)
```

### TABLE Friends
Stores friend relations between users.

```sql
CREATE TABLE Friends(user1 text NOT NULL,
                     user2 text NOT NULL,
                     CONSTRAINT u1 FOREIGN KEY (user1) REFERENCES users(email),
                     CONSTRAINT u2 FOREIGN KEY (user2) REFERENCES users(email))
```