class V1::ChocolatesController < ApplicationController
  def index
    choc = Chocolate.includes(:favourites)
    chocolates = []
    choc.each do |chocolate|
      object = {
        id: chocolate.id,
        name: chocolate.name,
        image: chocolate.image,
        favourites: chocolate.favourites.length
      }
      chocolates << object
    end
    render formats: :json, json: chocolates, status: 200
  end

  def search
    query = "%#{params['chocolate']['query']}%"
    choc = Chocolate.where("name ILIKE ?", query).includes(:favourites)
    chocolates = []
    unless choc.empty?
      choc.each do |chocolate|
        object = {
          id: chocolate.id,
          name: chocolate.name,
          image: chocolate.image,
          favourites: chocolate.favourites.length
        }
        chocolates << object
      end
      render json: chocolates, status: 200
    else
      render json: { message: 'No chocolates found' }, status: 404
    end
  end
end
