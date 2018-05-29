def seed_directory(total_records)
  puts "Seeding directory with #{total_records} records ..."

  Directory.transaction do
    total_records.times do
      print '.'
      Directory.create!(
        title: Faker::Name.prefix,
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        gender: ['Male', 'Female', 'Other'].sample,
        phone: Faker::PhoneNumber.phone_number,
        email: Faker::Internet.email,
        street_line_1: Faker::Address.secondary_address,
        street_line_2: Faker::Address.street_address,
        sublocality: Faker::Address.city,
        locality: Faker::Address.state,
        postal_code: Faker::Address.postcode,
        country_code: Faker::Address.country,
        latitude: Faker::Address.latitude,
        longitude: Faker::Address.longitude
      )
    end
  end
  puts "\n"

end

def seed_patient(total_records)
  puts "Seeding patients with #{total_records} records ..."

  Patient.transaction do
    total_records.times do
      print '.'
      Patient.create!(
        date_of_birth: Faker::Date.birthday(18, 90),
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
      )
    end
  end
  puts "\n"
end

def associate_patient_providers(total_directory_records, total_patient_records, total_associations)
  puts "Associating Patient and Providers with  #{total_associations} records ..."

  DirectoriesPatients.transaction do
    total_associations.times do
      print '.'
      DirectoriesPatients.create!(
        patient_id: rand(1..(total_patient_records - 1)),
        directory_id: rand(1..(total_directory_records - 1))
      )
    end
  end
  puts "\n"
end
