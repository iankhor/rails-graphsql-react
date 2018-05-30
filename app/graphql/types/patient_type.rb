Types::PatientType = GraphQL::ObjectType.define do
  name 'Patient'

  field :id, types.String
  field :first_name, types.String
  field :last_name, types.String
  field :providers, !types[Types::DirectoryType]
  field :someEndPoint, types.String
end
