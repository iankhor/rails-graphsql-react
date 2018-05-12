Types::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :testField, types.String do
    description "An example field added by the generator"
    resolve ->(obj, args, ctx) {
      "Hello World!"
    }
  end

  field :directory, function: Resolvers::ProviderSearch

  connection :directoryConnection, Connections::DirectoryConnection do
    argument :first, types.Int, default_value: 20

    resolve ->(_obj, _args, _ctx) { Directory.all.order('last_name') }
  end

end
