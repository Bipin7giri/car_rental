import { User } from 'src/AllEntites';
import { SoftDelete } from 'src/AllEntites/HelperEntites/SoftDelete.entites';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Bookings extends SoftDelete {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;
  @Column({ name: 'rental_start_date' })
  rentalStartDate: Date;

  @Column({ name: 'rental_end_date' })
  rentalEndDate: Date;

  @Column({ name: 'total_cost', nullable: true })
  totalCost: number;

  @ManyToOne(() => User, (u) => u.bookingId)
  @JoinColumn({ name: 'customer_id' })
  customerId: User;

  @ManyToOne(() => Vehicle, (v) => v.bookingId)
  @JoinColumn({ name: 'vehicle_id' })
  vehicleId: Vehicle;
}
