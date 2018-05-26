Types::DirectoryType = GraphQL::ObjectType.define do
  name 'Directory'

  field :id, types.String
  field :full_address, types.String
  field :full_name, types.String
  field :title, types.String
  field :first_name, types.String
  field :last_name, types.String
  field :gender, types.String
  field :phone, types.String
  field :email, types.String
  field :street_line_1, types.String
  field :street_line_2, types.String
  field :sublocality, types.String
  field :locality, types.String
  field :country_code, types.String
  field :postal_code, types.String
end
