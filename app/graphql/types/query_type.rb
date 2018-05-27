Types::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :getProvider, function: Resolvers::GetProvider.new
  
  connection :getProviders, Connections::DirectoryConnection do
    argument :searchTerm, types.String

    resolve Resolvers::GetAllProviders.new
  end

end
