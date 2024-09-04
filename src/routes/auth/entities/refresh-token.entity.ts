import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './user.entity';

import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class RefreshToken {
  @ApiProperty({ description: 'Refresh Token ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Refresh Token Value' })
  @Column({ nullable: false })
  token: string;

  @ApiProperty({ description: 'Expiration Date of the Refresh Token' })
  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @ApiProperty({ description: 'Creation Date of the Refresh Token' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Associated User' })
  @OneToOne(() => User, (user) => user.refreshToken, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
