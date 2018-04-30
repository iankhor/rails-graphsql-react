class CreateDirectory < ActiveRecord::Migration[5.2]
  def change
    create_table :directory do |t|
      t.string :title
      t.string :first_name
      t.string :last_name
      t.string :gender
      t.string :phone
      t.string :email
      t.string :street_line_1
      t.string :street_line_2
      t.string :sublocality
      t.string :locality
      t.string :postal_code
      t.string :country_code
      t.decimal :latitude, { precision: 10, scale: 6 }
      t.decimal :longitude, { precision: 10, scale: 6 }
      t.timestamps null: false
    end
  end
end
