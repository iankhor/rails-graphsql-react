require 'rails_helper'

RSpec.describe 'RailsGraphqlReactSchema' do
  let(:context) { {} }
  let(:variables) { {} }
  let(:result) {
    RailsGraphqlReactSchema.execute(
      query_string,
      context: context,
      variables: variables
    )
  }

  describe 'getProvider' do
    let(:provider) { create(:directory) }
    let(:query_string) { %|{ getProvider(id : #{id}) { id } }| }
    let(:patient) { create(:patient, :with_providers) }

    context 'found' do
      let(:id) { provider.id }

      it{ expect(result['data']['getProvider']).to eq({ 'id' => provider.id.to_s }) }
    end

    context 'not found' do
      let(:id) { 1234 }

      it{ expect(result['data']['getProvider']).to eq nil }
    end
  end
end
