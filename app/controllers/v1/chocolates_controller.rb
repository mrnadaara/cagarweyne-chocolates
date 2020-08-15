class V1::ChocolatesController < ApplicationController
  def index
    chocolates = Chocolate.all
    render formats: :json, json: chocolates, status: 200
  end

  def search
    query = "%#{params['chocolate']['query']}%"
    chocolates = Chocolate.where("name ILIKE ?", query)
    if chocolates
      render json: chocolates, status: 200
    else
      render json: { message: 'No chocolates found' }, status: 404
    end
  end
end
