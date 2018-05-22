Connections::DirectoryConnection = Types::DirectoryType.define_connection do
  name 'DirectoryConnection'

  field :totalCount do
    type types.Int

    resolve ->(obj, _args, _ctx) {
      obj.nodes.count
    }
  end

  field :totalPages do
    type types.Int

    resolve ->(obj, _args, _ctx) {
      per_page = obj.arguments.first || obj.arguments.last
      (obj.nodes.count.to_f / per_page.to_f).ceil()
    }
  end
end
