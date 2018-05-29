class Patient < ApplicationRecord
  has_many :directories_patients, class_name: 'DirectoriesPatients'
  has_many :directories, through: :directories_patients

  def providers
    directories.limit(10) #for demo purposes
  end
end
