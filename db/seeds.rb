require_relative './seed_helper'
Faker::Config.locale = 'en-AU'

puts "*" * 10 + 'SEED START' + "*" * 10

seed_directory(30000)

puts "*" * 10 + 'SEED END' + "*" * 10
