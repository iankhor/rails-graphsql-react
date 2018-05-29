class CreatePatients < ActiveRecord::Migration[5.2]
  def change
    create_table :patients do |t|
      t.string :last_name
      t.string :first_name
      t.date :date_of_birth

      t.timestamps
    end
  end
end
