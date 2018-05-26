module Resolvers
  class CreateProvider < GraphQL::Function
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
      Directory.create!(
        title: args[:title],
        first_name: args[:first_name],
        last_name: args[:last_name],
        gender: args[:gender],
        phone: args[:phone],
        email: args[:email],
        street_line_1: args[:street_line_1],
        street_line_2: args[:street_line_2],
        sublocality: args[:sublocality],
        locality: args[:locality],
        postal_code: args[:postal_code],
        country_code: args[:country_code],
        latitude: args[:latitude],
        longitude: args[:longitude]
      )
    end
  end
end
