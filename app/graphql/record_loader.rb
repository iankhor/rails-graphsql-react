require 'graphql/batch'

class RecordLoader < GraphQL::Batch::Loader
  def initialize(model)
    @model = model
  end

  def perform(ids)
    flat_ids = ids.flatten.uniq

    @model.where(id: flat_ids).each { |record| fulfill(record.id, record) }
    flat_ids.each { |id| fulfill(id, nil) unless fulfilled?(id) }
  end
end
