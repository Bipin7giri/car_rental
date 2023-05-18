import { SoftDelete } from 'src/AllEntites/HelperEntites/SoftDelete.entites';
import { Category } from 'src/categories/entities/category.entity';
import { CategoryEnum } from 'src/helper/enums/Category.enums';
import { location } from 'src/locations/entities/location.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Vehicle extends SoftDelete {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column()
  name: string;

  @Column({ name: 'make', nullable: true })
  make: string;

  @Column()
  year: Date;

  @Column()
  color: string;

  @Column({ nullable: true })
  image: string;

  @Column({ name: 'rental_rate_per_day' })
  rentalRatePerDay: number;

  @Column({ name: 'availability_status' })
  availabilityStatus: boolean;

  @ManyToOne(() => Category, (c) => c.vehicle)
  @JoinColumn({ name: 'category_id' })
  categoryId: Category;

  @ManyToOne(() => location, (l) => l.vehicleId)
  @JoinColumn({ name: 'location_id' })
  locationId: location;
}
