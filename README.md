#### Brief
This repo is a simple demo for a directory of medical providers using the following stack:

- Graphql-Ruby
- Rails 5
- Webpacker
- React Semantic
- RSpec
- Factory Bot

#### Notable implementation(s)
- CRUD operations via GraphQL
- Infinite Scroll
- Search

#### Installation

Prerequisites: Postgres 10

1. git clone this repo
2. Add database users in postgres. On the terminal, log into postres. run `psql`
3. In psql, create the database and db user with then following commands:
```
CREATE USER rails_graphql_react_dev WITH PASSWORD 'rails_graphql_react_dev' CREATEDB CREATEROLE SUPERUSER;
CREATE DATABASE rails_graphql_react_dev WITH OWNER rails_graphql_react_dev;
CREATE USER rails_graphql_react_test WITH PASSWORD 'rails_graphql_react_test' CREATEDB CREATEROLE SUPERUSER;
CREATE DATABASE rails_graphql_react_test WITH OWNER rails_graphql_react_test;
\q
```
4. run `yarn install`
5. run `bundle`
7. run `rails db:drop db:setup`
6. run `rails s`
7. (optional) run `webpack-dev-server`
