# frozen_string_literal: true

class Chocolate < ApplicationRecord
  scope :search, ->(query) { where('name ILIKE ?', query).includes(:favourites) }
  has_many :favourites, foreign_key: :favourite_chocolate_id
  has_many :favourited_users, through: :favourites, source: :favourite_user
end
