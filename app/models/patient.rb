class Patient < ApplicationRecord
  has_many :directories_patients, class_name: 'DirectoriesPatients'
  has_many :directories, through: :directories_patients
end
