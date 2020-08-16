# frozen_string_literal: true

class V1::UsersController < ApplicationController
  def index
    check_user = User.find_by(user_params)
    if check_user
      # rubocop:disable Metrics/LineLength
      render json: { username: check_user.username, id: check_user.id }, status: 200
      # rubocop:enable Metrics/LineLength
    else
      user = User.new(user_params)
      if user.save
        render json: { username: user.username, id: user.id }, status: 200
      else
        render json: { message: user.errors[:username] }, status: 403
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:username)
  end
end
