require 'rails_helper'

RSpec.describe Types::DirectoryType do
  let(:directory_type) { RailsGraphqlReactSchema.types['Directory'] }
  let(:fields) { directory_type.fields }

  describe 'fields' do
    it{
      expect(fields.keys).to match_array(
        [
          "id",
         "full_address",
         "full_name",
         "title",
         "first_name",
         "last_name",
         "gender",
         "phone",
         "email",
         "street_line_1",
         "street_line_2",
         "sublocality",
         "locality",
         "country_code",
         "postal_code"
       ]
     )
    }
  end
end
