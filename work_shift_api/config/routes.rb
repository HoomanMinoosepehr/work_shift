Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :companies ,only: [:create]
      resources :shifts, only: [:create, :index]
      resources :managers, only: [:create, :index]
      resources :employees, only: [:create, :index]
      post 'sessions' => 'sessions#create'
      delete 'sessions' => 'sessions#destroy'
    end
  end
end