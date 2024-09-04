import { Exclude } from 'class-transformer';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from 'types/roles';

import { RefreshToken } from './refresh-token.entity';

import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({ description: 'User ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'User email' })
  @Column({ unique: true, nullable: false })
  email: string;

  @ApiProperty({ description: 'User first name' })
  @Column({ default: '' })
  firstName: string;

  @ApiProperty({ description: 'User Password' })
  @Column()
  @Exclude()
  password: string;

  @ApiProperty({ description: 'User Role' })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @ApiProperty({ description: 'Refresh Tokens' })
  @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshToken: RefreshToken;
}
