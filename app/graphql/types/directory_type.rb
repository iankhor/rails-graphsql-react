Types::DirectoryType = GraphQL::ObjectType.define do
  name 'Directory'

  field :full_address, types.String
  field :full_name, types.String
  field :gender, types.String
  field :phone, types.String
  field :email, types.String
  field :id, types.String
end
