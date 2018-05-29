module Resolvers
  class GetAllPatients < GraphQL::Function
    type !types[Types::PatientType]

    def call(_obj, args, _ctx)
      Patient.all.limit(10) #for demo purposes
    end
  end
end
