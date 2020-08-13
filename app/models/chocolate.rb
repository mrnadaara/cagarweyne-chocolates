class Chocolate < ApplicationRecord
  has_many :favourites, foreign_key: :favourite_chocolate_id
  has_many :favourited_users, through: :favourites, source: :favourite_user
end
