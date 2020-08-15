require 'rails_helper'

RSpec.describe 'Auth API', type: :request do
  describe 'POST /auth - when user does not exist' do
    # make HTTP post request before each example
    before { post '/v1/auth', params: { user: { username: 'sharmarke' }} }

    it 'create and returns new user' do
      parsed_body = JSON.parse(response.body)
      expect(response.body).not_to be_empty
      expect(parsed_body['username']).to eq('sharmarke')
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST /auth - when username is short' do
    # make HTTP post request before each example
    before {
      post '/v1/auth', params: { user: { username: 'sh' }}
    }

    it 'throw error' do
      parsed_body = JSON.parse(response.body)
      expect(response.body).not_to be_empty
      expect(parsed_body['message'][0]).to eq('Username must have at least 5 characters')
    end

    it 'returns status code 403' do
      expect(response).to have_http_status(403)
    end
  end

  describe 'POST /auth - when user exists' do
    # make HTTP post request before each example
    before {
      @user = create(:user)
      post '/v1/auth', params: { user: { username: @user.username }} 
    }

    it 'returns user' do
      parsed_body = JSON.parse(response.body)
      expect(response.body).not_to be_empty
      expect(parsed_body['id']).to eq(@user.id)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end
end
