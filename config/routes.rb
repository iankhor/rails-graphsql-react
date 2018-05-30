Rails.application.routes.draw do
  mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  post '/graphql', to: 'graphql#execute'
  post '/example_end_point', to: 'pages#index
  '
  root 'pages#index'
  get '*path', to: 'pages#index' #using react router for client site routing
end
