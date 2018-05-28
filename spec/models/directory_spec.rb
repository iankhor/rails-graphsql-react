require 'rails_helper'

RSpec.describe Directory, type: :model do
  let(:provider) {
    create(
      :directory,
      title: 'Mr',
      first_name: 'Bright',
      last_name: 'Side',
      street_line_1: 'Little Street',
      street_line_2: 'Around the corner',
      sublocality: 'Westin',
      locality: 'Hotel',
      postal_code: '1111',
      country_code: 'au'
    )
  }
  let(:full_name) { provider.full_name }
  let(:full_address) { provider.full_address }


  describe '#full_name' do
    it{expect(full_name).to eq 'Mr Bright Side'}
  end

  describe '#full_address' do
    it{expect(full_address).to eq 'Little Street, Around the corner, Westin, Hotel, 1111, au'}
  end
end
