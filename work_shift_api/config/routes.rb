Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api, defaults: { format: :json } do
    namespace :v1 do

      resources :companies , only: [:create, :show, :update] do
        post 'password', on: :member
      end

      resources :admins, only: [:create]
      resources :shifts, only: [:create, :destroy]

      resources :managers, only: [:create, :index, :update, :show, :destroy] do
        post 'password', on: :member
      end

      resources :employees, only: [:create, :index, :show, :destroy, :update] do
        post 'password', on: :member
      end
      
      post 'sessions' => 'sessions#create'
      delete 'sessions' => 'sessions#destroy'
      get 'sessions' => 'sessions#current'
      post 'assign' => 'shifts#index'
      get 'schedule' => 'shifts#schedule'
    end
  end
end