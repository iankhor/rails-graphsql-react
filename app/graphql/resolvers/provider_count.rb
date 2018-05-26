module Resolvers
  class ProviderCount < GraphQL::Function
    type types.Int

    def call(obj, _args, _ctx)
      obj.nodes.count
    end
  end
end
