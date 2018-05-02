ActiveRecord::Schema.define(version: 2018_04_30_133410) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "directory", force: :cascade do |t|
    t.string "title"
    t.string "first_name"
    t.string "last_name"
    t.string "gender"
    t.string "phone"
    t.string "email"
    t.string "street_line_1"
    t.string "street_line_2"
    t.string "sublocality"
    t.string "locality"
    t.string "postal_code"
    t.string "country_code"
    t.decimal "latitude", precision: 10, scale: 6
    t.decimal "longitude", precision: 10, scale: 6
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
