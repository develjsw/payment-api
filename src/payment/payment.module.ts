import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './servicies/payment.service';

@Module({
    imports: [],
    controllers: [PaymentController],
    providers: [PaymentService]
})
export class PaymentModule {}
