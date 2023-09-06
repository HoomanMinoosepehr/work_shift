class Api::V1::ShiftsController < ApplicationController

    def create
        shift = Shift.new shift_params
        shift.assigner = session[:full_name]

        if shift.save
            render json: { message: "Shift saved successfully.", status: 200 }
        else
            render json: { message: shift.errors.messages, status: 422 }
        end
    end

    def index
        shifts = Shift.where(date: params[:date])
        render json: shifts, each_serializer: ShiftIndexSerializer
    end

    def destroy
        shift = Shift.find params[:id]
        if shift.destroy
            render json: {status: 200}
        else
            render json: {status: shift.errors.full_messages}
        end
    end

    def schedule
        today_date = Date.today
        end_date = today_date + 10.days
        employee = Employee.find session[:id]
        shifts = employee.shifts.where(date: today_date..end_date).order(:date)
        render json: shifts, each_serializer: ScheduleSerializer
    end


    private

    def shift_params
        params.require(:shift).permit(
            :date,
            :start_time,
            :end_time,
            :employee_id
        )
    end

end
