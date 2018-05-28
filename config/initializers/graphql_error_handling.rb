GraphQL::Errors.configure(RailsGraphqlReactSchema) do
  rescue_from ActiveRecord::RecordNotFound do |exception|
    GraphQL::ExecutionError.new('There is no such record')
  end

  rescue_from ActiveRecord::RecordInvalid do |exception|
    GraphQL::ExecutionError.new(exception.record.errors.full_messages.join("\n"))
  end

  rescue_from StandardError do |exception|
    GraphQL::ExecutionError.new('Please try to execute the query for this field later')
  end
end
