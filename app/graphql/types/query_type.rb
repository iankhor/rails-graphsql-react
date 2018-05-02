Types::QueryType = GraphQL::ObjectType.define do
  name "Query"

  # TODO: remove me
  field :testField, types.String do
    description "An example field added by the generator"
    resolve ->(obj, args, ctx) {
      "Hello World!"
    }
  end

  field :directory, !types[Types::DirectoryType] do
    resolve -> (obj, args, ctx) {
      Directory.order(:created_at).last(5)
    }
  end
end
