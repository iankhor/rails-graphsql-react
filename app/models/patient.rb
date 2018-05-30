class Patient < ApplicationRecord
  include Rails.application.routes.url_helpers

  has_many :directories_patients, class_name: 'DirectoriesPatients'
  has_many :directories, through: :directories_patients

  def providers
    directories.limit(10) #for demo purposes
  end

  def someEndPoint
    Rails.application.routes.url_helpers.example_end_point_url
  end
end
