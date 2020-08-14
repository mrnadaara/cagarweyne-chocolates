FactoryBot.define do
  factory :user do
    username { Faker::Name.unique.name }
  end
end
