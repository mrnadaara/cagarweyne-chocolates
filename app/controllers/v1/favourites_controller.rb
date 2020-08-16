class V1::FavouritesController < ApplicationController
  def index
    user = User.find_by_id(params['favourite']['user'])
    if user
      render json: user.favourite_chocolates, status: 200
    else
      render json: { message: 'Please log in' }, status: 403
    end
  end

  def check_fav
    user = User.find_by_id(params['favourite']['user'])
    if user
      is_favourite = user.favourite_chocolates.find_by_id(params['favourite']['chocolate'])
      render json: { isFavourited: is_favourite ? true : false }, status: 200
    else
      render json: { message: 'Please log in' }, status: 403
    end
  end

  def toggle_fav
    user = User.find_by_id(params['favourite']['user'])
    if user
      is_favourite = user.favourite_chocolates.find_by_id(params['favourite']['chocolate'])
      if is_favourite
        user.favourite_chocolates.delete(is_favourite)
      else
        user.favourite_chocolates << Chocolate.find_by_id(params['favourite']['chocolate'])
      end
      check_favourite = user.favourite_chocolates.find_by_id(params['favourite']['chocolate'])
      render json: { isFavourited: check_favourite ? true : false }, status: 200
    else
      render json: { message: 'Please log in' }, status: 403
    end
  end
end
