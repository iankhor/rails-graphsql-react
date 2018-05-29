class Directory < ApplicationRecord
  self.table_name = 'directory'

  include PgSearch
  pg_search_scope :search_name,
                  against: [:first_name, :last_name],
                  :using => {
                    :tsearch => {:prefix => true},
                  }

  has_many :directories_patients, class_name: 'DirectoriesPatients'
  has_many :patients, through: :directories_patients

  validates :email, presence: true

  def full_name
    [title, first_name, last_name].compact.join(' ')
  end

  def full_address
    [
      street_line_1, street_line_2,
      sublocality, locality,
      postal_code, country_code
    ].compact.join(', ')
  end
end
