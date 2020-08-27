require 'sidekiq/web'

Rails.application.routes.draw do
  namespace :admin do
    resources :users
    resources :announcements
    resources :notifications
    resources :services

    root to: "users#index"
  end
  get '/privacy', to: 'home#privacy'
  get '/terms', to: 'home#terms'
    authenticate :user, lambda { |u| u.admin? } do
      mount Sidekiq::Web => '/sidekiq'
    end


  resources :notifications, only: [:index]
  resources :announcements, only: [:index]
  devise_for :users, path: '', path_names: { 
    sign_up: 'sign_up' 
  }, controllers: { 
    omniauth_callbacks: "users/omniauth_callbacks",
    registrations: 'users/registrations',
  }, skip: [:registrations]

  devise_scope :user do
    get 'sign_up', to: 'users/registrations#new', as: :new_registration
    get 'account', to: 'users/registrations#edit', as: :edit_registration
    post 'sign_up', to: 'users/registrations#create'
    put 'account', to: 'users/registrations#update', as: :update_registration
    delete 'users', to: 'users/registrations#destroy', as: :delete_registration
  end

  root to: 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
