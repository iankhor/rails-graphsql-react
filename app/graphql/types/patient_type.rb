Types::PatientType = GraphQL::ObjectType.define do
  name 'Patient'

  field :id, types.String
  field :first_name, types.String
  field :last_name, types.String
  field :someEndPoint, types.String

  # see https://github.com/rmosolgo/graphql-batch-example/blob/master/good_schema/schema.rb
  # for batch loading
  field :providers, !types[Types::DirectoryType]
end
