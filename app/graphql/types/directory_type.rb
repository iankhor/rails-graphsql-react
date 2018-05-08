Types::DirectoryType = GraphQL::ObjectType.define do
  name 'Directory'

  field :title, types.String
  field :first_name, types.String
  field :last_name, types.String
  field :gender, types.String
  field :phone, types.String
  field :email, types.String
  field :latitude, types.String
  field :longitude, types.String
  field :full_address, types.String
  field :full_name, types.String
end
