# frozen_string_literal: true

class V1::ChocolatesController < ApplicationController
  def index
    choc = Chocolate.includes(:favourites)
    chocolates = []
    choc.each do |chocolate|
      object = {
        id: chocolate.id,
        name: chocolate.name,
        description: chocolate.description,
        image: chocolate.image,
        favourites: chocolate.favourites.length
      }
      chocolates << object
    end
    render formats: :json, json: chocolates, status: 200
  end

  def search
    query = "%#{params['chocolate']['query']}%"
    choc = Chocolate.where('name ILIKE ?', query).includes(:favourites)
    chocolates = []
    if choc.empty?
      render json: { message: 'No chocolates found' }, status: 404
    else
      choc.each do |chocolate|
        object = {
          id: chocolate.id,
          name: chocolate.name,
          description: chocolate.description,
          image: chocolate.image,
          favourites: chocolate.favourites.length
        }
        chocolates << object
      end
      render json: chocolates, status: 200
    end
  end
end
