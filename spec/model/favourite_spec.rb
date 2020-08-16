# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Favourite, type: :model do
  # Association test
  # ensure an item record belongs to a single chocolate and user record
  it { should belong_to(:favourite_chocolate).class_name('Chocolate') }
  it { should belong_to(:favourite_user).class_name('User') }
end
