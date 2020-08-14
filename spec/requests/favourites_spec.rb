require 'rails_helper'

RSpec.describe 'Favourites API', type: :request do
  fixtures :chocolates

  describe 'GET /favourites' do
    before { get '/favourites' }
    it 'returns user favourites' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(7)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST /favourites' do
    before { post '/favourites' }
    it 'check if choc is favourited by user' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json['isFavourited']).to eq(todo_id)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST /toggle-fav' do
    before { post '/toggle-fav' }
    it 'favourite/unfavourite chocolate' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).to be_empty
      expect(json.size).to eq(2)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end
end
