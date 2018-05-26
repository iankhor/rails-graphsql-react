module Resolvers
  class GetAllProviders
    def call(_, args, _)
      directory(args)
    end

    private

    def directory(args)
      return Directory.search_name(args[:searchTerm]) if args[:searchTerm].present?
      return Directory.all.order(:last_name, :first_name)
    end
  end
end
