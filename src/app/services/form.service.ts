import { Injectable } from '@angular/core';
import { Waterafvoer } from '../models/waterafvoer';
import { Project } from '../models/project';
import { Slokkers } from '../models/slokkers';
import { SlokkerProjects } from '../models/slokker-projects';
import { Groups } from '../models/groups';
import { Company } from '../models/company';
import {Meerwerk} from "../models/meerwerk";

@Injectable({
  providedIn: 'root'
})
export class FormService {
  get isPloegB(): boolean {
    return this._isPloegB;
  }

  set isPloegB(value: boolean) {
    this._isPloegB = value;
  }
  get noInternetConnection(): boolean {
    return this._noInternetConnection;
  }

  set noInternetConnection(value: boolean) {
    this._noInternetConnection = value;
  }
  get isExit(): boolean {
    return this._isExit;
  }

  set isExit(value: boolean) {
    this._isExit = value;
  }
  get homeLastId(): number {
    return this._homeLastId;
  }

  set homeLastId(value: number) {
    this._homeLastId = value;
  }
  get isAutoLogin(): boolean {
    return this._isAutoLogin;
  }

  set isAutoLogin(value: boolean) {
    this._isAutoLogin = value;
  }
  get comingFromAutoLogin(): boolean {
    return this._comingFromAutoLogin;
  }

  set comingFromAutoLogin(value: boolean) {
    this._comingFromAutoLogin = value;
  }
  get highestHAIndex(): number {
    return this._highestHAIndex;
  }

  set highestHAIndex(value: number) {
    this._highestHAIndex = value;
  }

  get isClosing(): boolean {
    return this._isClosing;
  }

  set isClosing(value: boolean) {
    this._isClosing = value;
  }
  get photos(): any[] {
    return this._photos;
  }

  set photos(value: any[]) {
    this._photos = value;
  }
  get photosRWA(): any[] {
    return this._photosRWA;
  }

  set photosRWA(value: any[]) {
    this._photosRWA = value;
  }
  get photosDWA(): any[] {
    return this._photosDWA;
  }

  set photosDWA(value: any[]) {
    this._photosDWA = value;
  }
  get isFirstPage(): boolean {
    return this._isFirstPage;
  }

  set isFirstPage(value: boolean) {
    this._isFirstPage = value;
  }
  get company(): Company {
    return this._company;
  }

  set company(value: Company) {
    this._company = value;
  }
  get highestSlokkerIndex(): number {
    return this._highestSlokkerIndex;
  }

  set highestSlokkerIndex(value: number) {
    this._highestSlokkerIndex = value;
  }
  public lastPhoto: string;
  get suggestStreet(): string {
    return this._suggestStreet;
  }

  set suggestStreet(value: string) {
    this._suggestStreet = value;
  }
  get slokkerId(): string {
    return this._slokkerId;
  }

  set slokkerId(value: string) {
    this._slokkerId = value;
  }
  get hasEditedProject(): boolean {
    return this._hasEditedProject;
  }

  set hasEditedProject(value: boolean) {
    this._hasEditedProject = value;
  }
  get hasUpdatedGroup(): boolean {
    return this._hasUpdatedGroup;
  }

  set hasUpdatedGroup(value: boolean) {
    this._hasUpdatedGroup = value;
  }
  get isNewGroup(): boolean {
    return this._isNewGroup;
  }

  set isNewGroup(value: boolean) {
    this._isNewGroup = value;
  }
  get lastPage(): string {
    return this._lastPage;
  }

  set lastPage(value: string) {
    this._lastPage = value;
  }
  get currentGroup(): Groups {
    return this._currentGroup;
  }

  set currentGroup(value: Groups) {
    this._currentGroup = value;
  }
  get currentGroupId(): string {
    return this._currentGroupId;
  }

  set currentGroupId(value: string) {
    this._currentGroupId = value;
  }
  get groupList(): Groups[] {
    return this._groupList;
  }

  set groupList(value: Groups[]) {
    this._groupList = value;
  }
  get currentSlokkerProject(): SlokkerProjects {
    return this._currentSlokkerProject;
  }

  set currentSlokkerProject(value: SlokkerProjects) {
    this._currentSlokkerProject = value;
  }
  get slokkerProjectsList(): SlokkerProjects[] {
    return this._slokkerProjectsList;
  }

  set slokkerProjectsList(value: SlokkerProjects[]) {
    this._slokkerProjectsList = value;
  }
  get slokker(): Slokkers {
    return this._slokker;
  }

  set slokker(value: Slokkers) {
    this._slokker = value;
  }
  get projectSort(): string {
    return this._projectSort;
  }

  set projectSort(value: string) {
    this._projectSort = value;
  }
  get regenWaterId(): string {
    return this._regenWaterId;
  }

  set regenWaterId(value: string) {
    this._regenWaterId = value;
  }
  get droogWaterId(): string {
    return this._droogWaterId;
  }

  set droogWaterId(value: string) {
    this._droogWaterId = value;
  }
  public _hasPaused: boolean;
  public _isOnPause: boolean;
  public isOnePhotoSave: boolean;
  private _comingFromAutoLogin: boolean;
  private _isAutoLogin: boolean;
  private _isClosing: boolean;
  private _currentProject: Project;
  private _isFirstPage: boolean;
  private _currentSlokkerProject: SlokkerProjects;
  private _projectList: Project[];
  private _hasUpdatedGroup: boolean;
  private _groupList: Groups[];
  private _hasEditedProject: boolean;
  private _currentGroupId: string;
  private _lastPage: string;
  private _isNewGroup: boolean;
  private _homeLastId: number;
  private _company: Company;
  private _currentGroup: Groups;
  private _slokkerProjectsList: SlokkerProjects[];
  private _droogwaterAfvoer: Waterafvoer;
  private _projectInfo: Project;
  private _regenwaterAfvoer: Waterafvoer;
  private _regenWaterId: string;
  public hasUpdatedProject: boolean;
  private _isExit: boolean;
  private _droogWaterId: string;
  private _isNewProject: boolean;
  private _slokker: Slokkers;
  private _slokkerId: string;
  private _projectSort: string;
  private _suggestStreet: string;
  private _photosDWA = new Array(5).fill(null);
  public _photos = new Array(5).fill(null);
  private _photosRWA = new Array(5).fill(null);
  private _highestSlokkerIndex: number;
  private _highestHAIndex: number;
  public drawings = '';
  public drawingsRWA = '';
  public _isPhotoLoading: boolean;
  public photosLoading: string[];
  public homeY: number;
  public homeX: number;
  private _isPloegB: boolean;
  private _noInternetConnection: boolean;
  public isDeletingPhoto : boolean;
  public totalProjectsToUpload: number;
  public currentMeerwerk: Meerwerk;
  constructor() {}

  get currentProject(): Project {
    return this._currentProject;
  }
  get isNewProject(): boolean {
    return this._isNewProject;
  }

  set isNewProject(value: boolean) {
    this._isNewProject = value;
  }

  set currentProject(value: Project) {
    this._currentProject = value;
  }

  get regenwaterAfvoer(): Waterafvoer {
    return this._regenwaterAfvoer;
  }

  set regenwaterAfvoer(value: Waterafvoer) {
    this._regenwaterAfvoer = value;
  }
  set projectList(value: Project[]) {
    this._projectList = value;
  }
  get projectInfo(): Project {
    return this._projectInfo;
  }

  set projectInfo(value: Project) {
    this._projectInfo = value;
  }
  get droogwaterAfvoer(): Waterafvoer {
    return this._droogwaterAfvoer;
  }

  set droogwaterAfvoer(value: Waterafvoer) {
    this._droogwaterAfvoer = value;
  }
}
