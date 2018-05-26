module Resolvers
  class DeleteProviders < GraphQL::Function
    argument :ids, !types[types.ID]

    type !types[Types::DirectoryType]

    def call(_obj, args, _ctx)
      deletedProviders = Directory.find(args.values)
      Directory.delete(args.values)
      deletedProviders
    end
  end
end
