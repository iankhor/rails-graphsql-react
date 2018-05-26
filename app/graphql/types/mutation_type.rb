Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :createProvider, function: Resolvers::CreateProvider.new
  field :updateProvider, function: Resolvers::UpdateProvider.new
  field :deleteProvider, function: Resolvers::DeleteProvider.new
  field :deleteProviders, function: Resolvers::DeleteProviders.new
end
