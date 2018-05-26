module Resolvers
  class DeleteProvider < GraphQL::Function
    argument :id, types.Int

    type Types::DirectoryType

    def call(_obj, args, _ctx)
      provider = Directory.find(args[:id])
      provider.destroy
      provider
    end
  end
end
