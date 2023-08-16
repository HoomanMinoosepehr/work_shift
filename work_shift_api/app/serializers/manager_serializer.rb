class ManagerSerializer < ActiveModel::Serializer
  attributes :id, :full_name

  belongs_to :company, serializer: ManagerCompanySerializer
end
