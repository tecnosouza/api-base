export enum ActionToast{
  GET = 'Recuperado', // GET
  POST = 'Criado', // POST
  PUT = 'Alterado', // PUT
  PUT_ACTIVED = 'Ativado', // PUT
  PUT_INATIVED = 'Inativado', // PUT
  DELETE = 'Excluido', // DELETE
}

export enum RequestStatus {
  PENDING = 1,
  REOPENED = 2,
  WAITING_REVIEW = 3,   // Aguardando análise
  UNDER_REVIEW = 4,     // Em análise
  APPROVED = 5,
  REJECTED = 6,          // Reprovado
  CANCELED = 7
}

export const RequestStatusLabels: { [key in RequestStatus]: string } = {
  [RequestStatus.PENDING]: "PENDENTE",
  [RequestStatus.REOPENED]: "REABERTA",
  [RequestStatus.WAITING_REVIEW]: "AGUARDANDO ANÁLISE",
  [RequestStatus.UNDER_REVIEW]: "EM ANÁLISE",
  [RequestStatus.APPROVED]: "CONCLUÍDA",
  [RequestStatus.REJECTED]: "REPROVADO",
  [RequestStatus.CANCELED]: "CANCELADA",
};

export enum MonthlyPaymentStatus {
  PENDING = 1,
  PAID = 2, // Retorno do ASAAS para pix
  CONFIRMED = 3, // Retorno do ASAAS para cartão de crédito
  OVERDUE = 4,
}

export const MonthlyPaymentStatusLabels: { [key in MonthlyPaymentStatus]: string } = {
  [MonthlyPaymentStatus.PENDING]: "PENDENTE",
  [MonthlyPaymentStatus.PAID]: "PAGO",
  [MonthlyPaymentStatus.CONFIRMED]: "PAGO",
  [MonthlyPaymentStatus.OVERDUE]: "VENCIDO",
};

export enum PartnerStatus {
  ACTIVE = 1,
  INACTIVE = 2,
}

export const PartnerStatusLabels: { [key in PartnerStatus]: string } = {
  [PartnerStatus.ACTIVE]: "ATIVO",
  [PartnerStatus.INACTIVE]: "INATIVO",
};

export enum ActiveStatus {
  ACTIVE = 1,
  INACTIVE = 2,
}

export const ActiveStatusLabels: { [key in PartnerStatus]: string } = {
  [ActiveStatus.ACTIVE]: "ATIVO",
  [ActiveStatus.INACTIVE]: "INATIVO",
};