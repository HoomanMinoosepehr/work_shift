class Api::V1::CompaniesController < ApplicationController

    def create
    end

    private

    def company_params
        params.require(:company).permit(
            :user_name,
            :email,
            :password,
            :password_confirmation,
            :company_name
        )
    end

end
