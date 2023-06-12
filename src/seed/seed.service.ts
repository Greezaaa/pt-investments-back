import { Injectable } from '@nestjs/common';

import { ProjectsService } from '../projects/projects.service';
import { seedData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly projectsService: ProjectsService) {}

  async runProjectsSeed() {
    await this.insertNewProjects();
    return 'Projects seeded successfully!';
  }
  private async insertNewProjects() {
    await this.projectsService.deleteAllProjects();

    const projects = seedData.projects;
    const insertPromises = [];
    projects.forEach((project) => {
      insertPromises.push(this.projectsService.create(project));
    });
    await Promise.all(insertPromises);
    return true;
  }
}
