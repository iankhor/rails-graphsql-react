class CreateJoinTablePatientsDirectories < ActiveRecord::Migration[5.2]
  def change
    create_join_table :patients, :directories do |t|
      t.index [:patient_id, :directory_id]
      t.index [:directory_id, :patient_id]
    end
  end
end
