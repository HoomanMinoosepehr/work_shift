class Api::V1::ShiftsController < ApplicationController

    def create
        # @date = DateTime.new(2023, 8, 11)
        # @shift = Shift.new shift_params
        # employee = Employee.find 1
        # @shift.employee = employee

        # if @shift.save
        #     render json: { message: "Shift saved successfully.", status: 200 }
        # else
        #     render json: { message: @shift.errors.messages, status: 422 }
        # end
        @shift = Shift.find_by(params.require(:shift).permit(:date))
        # employee = Employee.find 1
        # @shift.employee = employee
        # render json: { now: @date }
        # if @shift.save
        #         render json: { message: "Shift saved successfully.", status: 200 }
        #     else
        #         render json: { message: @shift.errors.messages, status: 422 }
        #     end
        render json: { time: @shift }
    end

    def index 
        @shift = Shift.find 1
        render json: { date: @shift.date }
    end


    private

    def shift_params
        params.require(:shift).permit(
            :date,
            :start_time,
            :end_time
        )
    end

end
