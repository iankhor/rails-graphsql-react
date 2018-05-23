Types::QueryType = GraphQL::ObjectType.define do
  name "Query"

  # example without connections
  field :directoryNonConnection, function: Resolvers::ProviderSearch

  connection :directory, Connections::DirectoryConnection do
    argument :search_term, types.String

    resolve ->(_obj, args, _ctx) {
       Directory.all.order(:last_name, :first_name) unless args[:search_term].present?
       Directory.search_name(args[:search_term]) if args[:search_term].present?
     }
  end

end
