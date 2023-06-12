import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project, ProjectImage } from './entities';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [TypeOrmModule.forFeature([Project, ProjectImage])],
  exports: [ProjectsService, TypeOrmModule],
})
export class ProjectsModule {}
