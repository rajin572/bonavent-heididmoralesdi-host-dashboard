type ISODate = string;

interface ITripSchedule {
  start: ISODate;
  end: ISODate;
}

interface ITripId {
  _id: string;
  tripCustomID?: string;
  startDate?: ISODate;
  returnDate?: ISODate;
  timezone?: string;
  tripStatus?: string;
  startTimeSchedule?: ITripSchedule;
  vehicleId?: string;
}

interface ITransaction {
  _id: string;
  guestId: {
    _id: string;
    fullName: string;
    email: string;
    profileImage: string;
  };
  hostId: string;
  tripId: ITripId; // nested object
  amount: number;
  createdAt: ISODate;
  updatedAt: ISODate;
}

type WithdrawRole = "host" | "guest" | "admin" | string;

type PaymentProvider = "stripe" | "paypal" | "bank" | string;

type TransactionType = "withdraw" | "payout" | "refund" | "fee" | string;

interface IWithdrawTransaction {
  _id: string;
  userId: string;
  role: WithdrawRole;
  amount: number;
  paymentProvider: PaymentProvider;
  transactionType: TransactionType;
  status: string;
  createdAt: string;
  updatedAt: string;
  stripeTransferId?: string; // optional (only for stripe)
}
