class ManagerSerializer < ActiveModel::Serializer
  attributes :full_name

  belongs_to :company, serializer: ManagerCompanySerializer
end
