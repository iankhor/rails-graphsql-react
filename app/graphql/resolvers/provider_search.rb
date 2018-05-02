require 'search_object/plugin/graphql'

class Resolvers::ProviderSearch
  # include SearchObject for GraphQL
  include SearchObject.module(:graphql)

  # scope is starting point for search
  scope { Directory.all }

  # return type
  type !types[Types::DirectoryType]

  # inline input type definition for the advance filter
  ProviderFilter = GraphQL::InputObjectType.define do
    name 'ProviderFilter'

    argument :limit, types.Int, default_value: 5
    argument :OR, -> { types[ProviderFilter] }
    argument :postal_code, types.String
    argument :gender, types.String
    argument :locality, types.String
  end

  # when "filter" is passed "apply_filter" would be called to narrow the scope
  option :filter, type: ProviderFilter, with: :apply_filter
  option :first, type: types.Int, with: :apply_first
  option :skip, type: types.Int, with: :apply_skip

  def apply_first(scope, value)
    scope.limit(value)
  end

  def apply_skip(scope, value)
    scope.offset(value)
  end

  # apply_filter recursively loops through "OR" branches
  def apply_filter(scope, value)
    # normalize filters from nested OR structure, to flat scope list
    branches = normalize_filters(value).reduce { |a, b| a.or(b) }
    scope.merge branches
  end

  def normalize_filters(value, branches = [])
    # add like SQL conditions
    scope = Directory.all
    scope = scope.where('postal_code = ?', "#{value['postal_code']}") if value['postal_code']
    scope = scope.where('gender = ?', "#{value['gender']}") if value['gender']
    scope = scope.where('locality = ?', "#{value['locality']}") if value['locality']

    branches << scope

    # continue to normalize down
    value['OR'].reduce(branches) { |s, v| normalize_filters(v, s) } if value['OR'].present?

    branches
  end
end
