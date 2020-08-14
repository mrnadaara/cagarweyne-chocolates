Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '*page', to: 'home#index', constraints: lambda { |req|
    !req.xhr? && req.format.html?
  }
  namespace :v1, defaults: { format: 'json' } do
    # check user exist, insert otherwise and log in
    post 'auth', to: 'users#index'
    # list all chocolates
    get 'chocolates', to: 'chocolates#index'
    # search chocolates
    post 'chocolates', to: 'chocolates#search'
    # list user's favourites
    get 'favourites', to: 'favourites#index'
    # check if choc is favourited by user
    post 'favourites', to: 'favourites#check_fav'
    # fav/unfav chocolate
    post 'toggle-fav', to: 'favourites#toggle_fav'
  end
  root 'home#index'
end
