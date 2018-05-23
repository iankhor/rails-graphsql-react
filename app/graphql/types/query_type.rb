Types::QueryType = GraphQL::ObjectType.define do
  name "Query"

  # example without connections
  field :directoryNonConnection, function: Resolvers::ProviderSearch

  connection :directory, Connections::DirectoryConnection do
    argument :searchTerm, types.String

    resolve ->(_obj, args, _ctx) {
       return Directory.search_name(args[:searchTerm]) if args[:searchTerm].present?
       return Directory.all.order(:last_name, :first_name)
     }
  end

end
