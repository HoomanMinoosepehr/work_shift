class Api::V1::CompaniesController < ApplicationController

    # add new company
    def create

        # first finding the admin in the table
        admin = Admin.find_by_user_name(params.require(:company)[:user_name])

        # if the admin's informations was correct application will log them in and will show the page to create the new company's account
        if admin && admin.authenticate(params.require(:company)[:admin_password])
            # add the role to the roles table
            role = Role.new(email: params.require(:company)[:email], user_type: 'owner')
            
            if role.save
                # creating the company object and save it on the table
                @company = Company.new company_params
                if @company.save
                    render json: { company: @company, message: 'The company been created successfully!', status: 200 }
                else
                    role.destroy
                    render json: { message: @company.errors.full_messages, status: 422 }
                end
            else
                render json: { message: role.errors.full_messages, status: 422 }
            end
        else
            render json: { message: "Wrong information!", status: 403 }
        end

    end

    # showing the specific company's info
    def show
        company = Company.find params[:id]

        if company
            render json: company, serializer: CompanySerializer
        else
            render json: { message: "Something went wrong!", status: 422 }
        end
    end

    # show all the company's employees
    def employees
        company = Company.find params[:id]

        render json: {employees: company.employees}
    end

    # update the company's info
    def update
        company = Company.find params[:id]

        if company.update_columns(company_params.to_h)
            render json: { status: 200 }
        else
            render json: { message: company.errors.full_messages, status: 422 }
        end
    end

    # update company's password
    def password
        company = Company.find params[:id]
        
        if company.authenticate(params.require(:company)[:old_password])
            if company.update(password_params)    
                render json: {status: 200}
            else
                render json: {message: company.errore.full_messages, status: 422}
            end
        else
            render json: {message: 'Wrong information!', status: 403}
        end
    end

    private

    def company_params
        params.require(:company).permit(
            :first_name,
            :last_name,
            :email,
            :password,
            :password_confirmation,
            :company_name,
        )
    end

    def password_params
        params.require(:company).permit(
            :password,
            :password_confirmation
        )
    end

end
