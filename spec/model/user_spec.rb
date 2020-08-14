require 'rails_helper'

RSpec.describe User, type: :model do
  # Association test
  # ensure User model has a m:m relationship with the Favourites model
  it do
    should have_many(:favourite_chocolates).
    through(:favourites).
    source(:favourite_chocolate)
  end
  # Validation tests
  # ensure columns username are at least 5 characters long before saving
  it do
    should validate_length_of(:username).
    is_at_least(5).
    with_message('Username must have at least 5 characters')
  end
end
