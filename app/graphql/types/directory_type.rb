Types::DirectoryType = GraphQL::ObjectType.define do
  name 'Directory'

  field :title, types.String
  field :first_name, types.String
  field :last_name, types.String
  field :email, types.String
end
