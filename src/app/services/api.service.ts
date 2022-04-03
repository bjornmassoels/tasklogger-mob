import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";
import { FormService } from "./form.service";
import { Project } from "../models/project";
import { User } from '../models/user';
import {SlokkerProjects} from '../models/slokker-projects';
import {Groups} from '../models/groups';
import {Meerwerk} from "../models/meerwerk";
import {Groupidobject} from "../models/groupidobject";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private callURL = environment.apiURL;
  private authUrl = this.callURL + "auth.login";
  public accessToken: string = undefined;
  public options = { headers: { "Content-Type": "application/json" } };
  private getLatestVersionUrl = this.callURL + "auth.getLatestVersionNumber";
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private formService: FormService
  ) {
    this.authService.token.subscribe((x) => {
      if (x) {
        this.accessToken = x.access_token;
      }
    });
  }
 /* public getProjects() {
    const header = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.accessToken,
      userid: this.authService.userId,
    });
    return this.http
      .get(this.getProjectsListURL, { headers: header })
      .pipe(tap((x) => {}));
  }
  public getGroup() {
    const header = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.accessToken,
      userid: this.authService.userId,
      _id: this.formService.currentGroupId
    });
    return this.http
        .get(this.getGroupURL, { headers: header })
        .pipe(tap((x) => {}));
  }
  public getProjectById(id: string) {
    const header = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.accessToken,
      _id: id,
    });
    return this.http
      .get(this.getProjectsByIdURL, { headers: header })
      .pipe(tap((x) => {}));
  }
 */
}
