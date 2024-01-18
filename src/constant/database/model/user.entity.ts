import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number = 0;

  @ApiProperty()
  @Column()
  name: string = '';

  @ApiProperty()
  @Column()
  phoneNo: string = '';

  @ApiProperty()
  @Column()
  password: string = '';

  @ApiProperty()
  @Column()
  otp: string = '';

  @ApiProperty()
  @Column()
  upiId: string = '';

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date = new Date();

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date = new Date();

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date = new Date();
}
