import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

import { Paginator } from 'src/common/dto/pagination.dto';

import { ProjectImage, Project } from './entities';

@Injectable()
export class ProjectsService {


  private readonly logger = new Logger('ProjectsService');

  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,

    @InjectRepository(ProjectImage)
    private readonly projectImagesRepository: Repository<ProjectImage>,

    private readonly dataSource: DataSource
  ) { }

  async create(createProjectDto: CreateProjectDto) {
    try {
      const { images = [], ...projectDetails } = createProjectDto;
      const project = this.projectsRepository.create({
        ...projectDetails,
        images: images.map(image => this.projectImagesRepository.create({ url: image }))
      });
      await this.projectsRepository.save(project);
      return { ...project, images };
    } catch (error) {
      this.handleDBException(error)
    }

  }

  async findAll(paginatorDto: Paginator) {
    const { limit = 10, offset = 0 } = paginatorDto;
    const [projects, count] = await this.projectsRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: {
        images: true,
        // investors: true
      },
    });
    const modifiedProjects = projects.map((project) => ({
      ...project,
      images: project.images.map((image) => image.url),
    }));

    const hasNextPage = count > offset + limit;
    const hasPreviousPage = offset > 0;

    const nextPageOffset = hasNextPage ? offset + limit : null;
    const previousPageOffset = hasPreviousPage ? Math.max(offset - limit, 0) : null;

    const response = {
      count,
      limit,
      next: hasNextPage ? `http://localhost:3000/api/projects/?offset=${nextPageOffset}&limit=${limit}` : null,
      previous: hasPreviousPage ? `http://localhost:3000/api/projects/?offset=${previousPageOffset}&limit=${limit}` : null,
      projects: modifiedProjects,
    };

    return response;
  }



  async findOne(term: string) {
    let project: Project;
    if (isUUID(term)) {
      project = await this.projectsRepository.findOneBy({ id: term });
    } else {
      const query = this.projectsRepository.createQueryBuilder('project');
      project = await query
        .where('UPPER(title) =:title or slug=:slug', {
          title: term.toUpperCase(),
          slug: term.toLowerCase()
        })
        .leftJoinAndSelect('project.images', 'images')
        .getOne();
    }
    if (!project)
      throw new NotFoundException(`Project with ${term} not found`);
    return project;
  }

  async findOnePlain(term: string) {
    const { images = [], ...rest } = await this.findOne(term);
    return { ...rest, images: images.map((image) => image.url) };
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {

    const { images, ...toUpdate } = updateProjectDto;



    const project = await this.projectsRepository.preload({
      id,
      ...toUpdate,
    })

    if (!project) throw new NotFoundException(`Project with ${id} not found`);

    //query runner 

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();


    try {
      if (images) {
        await queryRunner.manager.delete(ProjectImage, { project: { id } });
        project.images = images.map(
          (image) => this.projectImagesRepository.create({ url: image })
        );
      }
      await queryRunner.manager.save(project);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return this.findOne(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      this.handleDBException(error)
    }
  }

  async remove(id: string) {
    const project = await this.findOne(id);
    await this.projectsRepository.remove(project);
  }

  async publishProject(id: string) {
    const project = await this.findOne(id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    project.is_active = true;
    return this.projectsRepository.save(project);
  }

  async toggleProjectVisibility(id: string) {
    const project = await this.findOne(id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    project.is_active = !project.is_active;
    return this.projectsRepository.save(project);
  }

  private handleDBException(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error creating project, pls check server logs');
  }

  async deleteAllProjects() {
    const query = this.projectsRepository.createQueryBuilder('Project');

    try {
      return await query
        .delete()
        .where({})
        .execute();

    } catch (error) {
      this.handleDBException(error);
    }

  }
}
