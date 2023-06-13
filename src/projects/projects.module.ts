/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project, ProjectImage } from './entities';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [TypeOrmModule.forFeature([Project, ProjectImage]), AuthModule],
  exports: [ProjectsService, TypeOrmModule],
})
export class ProjectsModule {}
