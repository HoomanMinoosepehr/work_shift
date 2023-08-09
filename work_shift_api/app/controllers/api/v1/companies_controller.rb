class Api::V1::CompaniesController < ApplicationController

    def create
        
        @company = Company.new company_params

        if @company.save
            render json: { company: @company, message: 'The company been created successfully!', status: 200 }
        else
            render json: { message: @company.errors.messages, status: 422 }
        end

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
