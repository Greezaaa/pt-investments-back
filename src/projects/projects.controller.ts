import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  Options
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Paginator } from '../common/dto/pagination.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll(@Query() paginatorDto: Paginator) {
    return this.projectsService.findAll(paginatorDto);
  }

  @Get(':term')
  findOne(@Param('term', ) term: string) {
    return this.projectsService.findOnePlain(term);
  }

  @Get(':id/toggle-visibility')
  toggleProjectVisibility(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.toggleProjectVisibility(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateProjectDto: UpdateProjectDto
    ) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Options('delete-all-projects')
  deleteAllProjects() {
    return this.projectsService.deleteAllProjects();
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.remove(id);
  }

  
  }
