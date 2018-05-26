module Resolvers
  class PageCount < GraphQL::Function
    type types.Int

    def call(obj, _args, _ctx)
      per_page = obj.arguments.first || obj.arguments.last
      (obj.nodes.count.to_f / per_page.to_f).ceil()
    end
  end
end
