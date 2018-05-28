require 'rails_helper'

RSpec.describe Directory, type: :model do
  let!(:directory) { create(:directory) }

  describe 'example ' do
    it 'errors' do
      expect(directory.first_name).to eq directory.last_name
    end
  end
end
