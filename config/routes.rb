Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '*page', to: 'home#index', constraints: lambda { |req|
    !req.xhr? && req.format.html?
  }
  namespace :v1, defaults: { format: 'json' } do
    # check user exist, insert otherwise and log in
    post 'auth', to: 'users#index'
    # list all chocolates
    post 'chocolates', to: 'chocolates#index'
    # search chocolates
    post 'chocolates/search', to: 'chocolates#search'
    # list user's favourites
    post 'favourites', to: 'favourites#index'
    # check if choc is favourited by user
    post 'favourites/is-favourited', to: 'favourites#check_fav'
    # fav/unfav chocolate
    post 'favourites/toggle-fav', to: 'favourites#toggle_fav'
  end
  root 'home#index'
end
