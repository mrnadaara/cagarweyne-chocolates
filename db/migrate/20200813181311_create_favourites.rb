class CreateFavourites < ActiveRecord::Migration[6.0]
  def change
    create_table :favourites do |t|
      t.integer :favourite_user_id
      t.integer :favourite_chocolate_id

      t.timestamps
    end
    add_foreign_key :favourites, :chocolates, column: :favourite_chocolate_id
    add_foreign_key :favourites, :users, column: :favourite_user_id
  end
end
