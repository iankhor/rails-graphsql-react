require 'rails_helper'

RSpec.describe Resolvers::DeleteProviders do
  let(:provider) { create(:directory) }
  let(:args) { { id: [provider.id] } }
  let(:_obj) { {} }
  let(:_ctx) { {} }
  let(:call) { subject.call(_obj, args, _ctx) }

  describe '#call ' do
    before { call }

    it 'returns deleted providers' do
      expect(call).to eq [provider]
    end

    it 'deletes the list of providers' do
      expect{ Directory.find(provider.id) }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end
