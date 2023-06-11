import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '.';

@Entity({ name: 'post_images' })
export class ProjectImage {

    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    url: string

    @ManyToOne(
        () => Project,
        ( postEntity ) => postEntity.images,
        {  onDelete: 'CASCADE' }
    )
    project: Project
}