#### Setup WIP

# rails-graphsql-react

```
CREATE USER rails_graphql_react_dev WITH PASSWORD 'rails_graphql_react_dev' CREATEDB CREATEROLE SUPERUSER;
CREATE DATABASE rails_graphql_react_dev WITH OWNER rails_graphql_react_dev;
CREATE USER rails_graphql_react_test WITH PASSWORD 'rails_graphql_react_test' CREATEDB CREATEROLE SUPERUSER;
CREATE DATABASE rails_graphql_react_test WITH OWNER rails_graphql_react_test;
```

```
git push heroku master
heroku run rake db:migrate
heroku ps:scale web=1
heroku ps
heroku open
```

#### What's in
Rails 5
Webpacker
React Semantic
RSpec
Factory Bot
