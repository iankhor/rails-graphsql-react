require 'rails_helper'

RSpec.describe Resolvers::GetProvider do
  let!(:provider) { create(:directory) }
  let(:args) { { id: provider.id } }
  let(:_obj) { {} }
  let(:_ctx) { {} }

  describe '#call ' do
    it{ expect(subject.call(_obj, args, _ctx)).to eq provider }
  end
end
