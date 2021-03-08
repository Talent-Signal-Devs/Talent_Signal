import { Pool } from "pg"

interface Payment {
    id: number,
    payment_id: string,
    due_date: string,
    scheduled_date: string,
    amount: string,
    payment_status: string,
    pending_date: string,
    complete_date: string,
    contract_id: string,
    payment_fee: string,
}

export default class paymentService {

    private database : Pool
    
    constructor(database : Pool) {
        this.database = database
    }
}

