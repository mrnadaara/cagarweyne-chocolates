# frozen_string_literal: true

class User < ApplicationRecord
  has_many :favourites, foreign_key: :favourite_user_id
  has_many :favourite_chocolates, through: :favourites, source: :favourite_chocolate
  # rubocop:disable Metrics/LineLength
  validates :username, presence: true, length: { minimum: 5, message: 'Username must have at least 5 characters' }, uniqueness: { case_sensitive: true, message: 'Username already exists' }
  # rubocop:enable Metrics/LineLength
end
