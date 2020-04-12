import { Injectable, EventEmitter } from '@angular/core';
import { GithubService } from './github.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  currentProject: any;
  projectChanged: EventEmitter<any> = new EventEmitter();

  constructor(private githubService: GithubService) {}

  async setCurrentProject(projectId: number): Promise<void> {
    this.currentProject = undefined;

    this.currentProject = await this.githubService.getProject(projectId);
    this.currentProject.columns = await this.githubService.getProjectColumns(projectId);

    for (const col of this.currentProject.columns) {
      col.cards = await this.githubService.getColumnCards(col.id);
    }

    this.projectChanged.emit(this.currentProject);
  }
}
