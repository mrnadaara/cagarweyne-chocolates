require 'rails_helper'

RSpec.describe 'Chocolates API', type: :request do
  fixtures :chocolates

  describe 'GET /chocolates' do
    before { get '/chocolates' }
    it 'returns chocolates' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(7)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST /chocolates' do
    before { post '/chocolates' }
    it 'return search results' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(2)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end
end
