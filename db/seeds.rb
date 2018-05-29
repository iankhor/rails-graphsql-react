require_relative './seed_helper'
Faker::Config.locale = 'en-AU'

PROVIDER_RECORDS = 3000
PATIENT_RECORDS = 1000
PROVIDER_PATIENT_ASSOC_RECORDS = rand(PATIENT_RECORDS..PROVIDER_RECORDS)

puts "*" * 10 + 'SEED START' + "*" * 10

seed_directory(PROVIDER_RECORDS)
seed_patient(PATIENT_RECORDS)
associate_patient_providers(PROVIDER_RECORDS, PATIENT_RECORDS, PROVIDER_PATIENT_ASSOC_RECORDS)

puts "*" * 10 + 'SEED END' + "*" * 10
