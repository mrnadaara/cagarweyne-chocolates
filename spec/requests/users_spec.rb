require 'rails_helper'

RSpec.describe 'Auth API', type: :request do
  describe 'POST /auth' do
    # make HTTP get request before each example
    before { post '/auth' }

    context 'when the user exists' do
      it 'returns the user' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(todo_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the user does not exists' do
      it 'create and returns new user' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(todo_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end
  end
end
