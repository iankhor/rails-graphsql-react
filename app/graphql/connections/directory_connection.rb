Connections::DirectoryConnection = Types::DirectoryType.define_connection do
  name 'DirectoryConnection'

  field :totalCount do
    type types.Int

    resolve ->(obj, _args, _ctx) {
      obj.nodes.count
    }
  end
end
