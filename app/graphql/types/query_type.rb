Types::QueryType = GraphQL::ObjectType.define do
  name "Query"

  # example without connections
  field :directory, function: Resolvers::ProviderSearch

  connection :directoryConnection, Connections::DirectoryConnection do
    resolve ->(_obj, _args, _ctx) { Directory.all.order('last_name') }
  end

end
