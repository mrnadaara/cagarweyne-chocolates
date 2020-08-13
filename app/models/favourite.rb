class Favourite < ApplicationRecord
  belongs_to :favourite_chocolate, class_name: 'Chocolate'
  belongs_to :favourite_user, class_name: 'User'
end
