Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :companies ,only: [:create]
      resources :shifts, only: [:create, :destroy]
      resources :managers, only: [:create, :index, :show, :destroy]
      resources :employees, only: [:create, :index]
      post 'sessions' => 'sessions#create'
      delete 'sessions' => 'sessions#destroy'
      get 'sessions' => 'sessions#current'
      post 'assign' => 'shifts#index'
    end
  end
end