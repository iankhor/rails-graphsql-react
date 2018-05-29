class DirectoriesPatients < ApplicationRecord
  belongs_to :patient
  belongs_to :directory
end
