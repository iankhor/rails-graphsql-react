Connections::DirectoryConnection = Types::DirectoryType.define_connection do
  name 'DirectoryConnection'

  field :totalCount, function: Resolvers::ProviderCount.new
  field :totalPages, function: Resolvers::PageCount.new
end
