Types::PatientType = GraphQL::ObjectType.define do
  name 'Patient'

  field :id, types.String
  field :first_name, types.String
  field :last_name, types.String
  field :someEndPoint, types.String

  # see https://github.com/rmosolgo/graphql-batch-example/blob/master/good_schema/schema.rb
  # for batch loading

  # 215ms 210ms 186ms
  field :providers, !types[Types::DirectoryType]

  # 354ms 360ms 463ms
  # field :providers, -> { types[Types::DirectoryType] } do
  #   resolve -> (obj, _args, _ctx) {
  #     ForeignKeyLoader.for(DirectoriesPatients, :patient_id).load([obj.id]).then do |directory_patients|
  #       Directory.find(directory_patients.map(&:directory_id))
  #     end
  #   }
  # end
end
