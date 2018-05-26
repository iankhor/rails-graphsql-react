module Resolvers
  class GetProvider < GraphQL::Function
    argument :id, types.Int
    argument :title, types.String
    argument :first_name, types.String
    argument :last_name, types.String
    argument :gender, types.String
    argument :phone, types.String
    argument :email, types.String
    argument :street_line_1, types.String
    argument :street_line_2, types.String
    argument :sublocality, types.String
    argument :locality, types.String
    argument :postal_code, types.String
    argument :country_code, types.String
    argument :latitude, types.String
    argument :longitude, types.String

    type Types::DirectoryType

    def call(_obj, args, _ctx)
      Directory.find(args[:id])
    end
  end
end
