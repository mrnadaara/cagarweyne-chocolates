# frozen_string_literal: true

class V1::ChocolatesController < ApplicationController
  def index
    choc = Chocolate.includes(:favourites)
    chocolates = createChocArray(choc)
    render formats: :json, json: chocolates, status: 200
  end

  def search
    choc = Chocolate.search("%#{params['chocolate']['query']}%")
    if choc.empty?
      render json: { message: 'No chocolates found' }, status: 404
    else
      chocolates = createChocArray(choc)
      render json: chocolates, status: 200
    end
  end

  private

  def createChocArray(obj)
    chocolates = []
    obj.each do |chocolate|
      object = {
        id: chocolate.id,
        name: chocolate.name,
        description: chocolate.description,
        image: chocolate.image,
        favourites: chocolate.favourites.length
      }
      chocolates << object
    end
    chocolates
  end
end
