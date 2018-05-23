Types::QueryType = GraphQL::ObjectType.define do
  name "Query"

  # example without connections
  field :directoryNonConnection, function: Resolvers::ProviderSearch

  connection :directory, Connections::DirectoryConnection do
    argument :searchTerm, types.String
    
    resolve Resolvers::GetDirectory.new
  end
end
