import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as uuid from 'uuid';

@Entity({ name: 'films' })
export class Films {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  idRef: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'varchar' })
  descricao: string;

  @Column({ type: 'varchar' })
  director: string;

  @Column({ type: 'varchar' })
  producer: string;

  @Column({ type: 'varchar' })
  releaseDate: string;

  @Column({ type: 'int' })
  rtScore: number;
}
