Types::QueryType = GraphQL::ObjectType.define do
  name "Query"

  # example without connections
  field :directoryNonConnection, function: Resolvers::ProviderSearch

  connection :directory, Connections::DirectoryConnection do
    resolve ->(_obj, _args, _ctx) {
       Directory.all.order(:last_name, :first_name)
     }
  end

end
