# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Chocolate, type: :model do
  # Association test
  # ensure User model has a m:m relationship with the User model
  it do
    should have_many(:favourited_users)
      .through(:favourites)
      .source(:favourite_user)
  end
end
