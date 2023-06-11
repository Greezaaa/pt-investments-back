import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    OneToMany,
} from 'typeorm';
import { InvestorDto } from '../dto/create-project.dto';
import { ProjectImage } from './project-image.entity';

@Entity()
export class Project {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', {
        unique: true
    })
    title: string;

    @Column('text')
    description: string;

    @Column('varchar', {
        nullable: false
    })
    company_name: string;

    @Column('boolean', {
        default: false
    })
    is_active: boolean;

    @Column('numeric', {
        precision: 12,
        scale: 2,
        default: 0,
    })
    desired_goal: number;

    @Column('numeric', {
        precision: 12,
        scale: 2,
        default: 0,
    })
    total_collected: number;

    @Column('varchar')
    language: string;

    @Column('text', {
        unique: true
    })
    slug: string;

    @Column('varchar', {
        nullable: false
    })
    location: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column('json', { default: [] })
    investors: InvestorDto[];

    @OneToMany(
        () => ProjectImage,
        projectImage => projectImage.project,
        {  cascade: true, eager: true }
    )
    images?: ProjectImage[];


    @BeforeInsert()
    handleSlugInsert() {
        if (!this.slug) {
            this.slug = this.title
        }
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(/ /g, '-')
            .replaceAll(/[^\w-]+/g, '');
    }

    @BeforeUpdate()
    handleSlugUpdate() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(/ /g, '-')
            .replaceAll(/[^\w-]+/g, '');
    }
}
