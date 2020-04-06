import { Component, OnInit } from '@angular/core';
import {Map} from '../models/concept-map';
import {UserService} from '../services/user.service';

@Component({
  selector: 'cm-done-maps',
  templateUrl: './done-maps.component.html',
  styleUrls: ['./done-maps.component.css']
})
export class DoneMapsComponent implements OnInit {

  maps: Map[];
  mapsTemporal: Map[];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getMaps('done').subscribe(res => {
      this.maps = res;
      console.log('Mapas');
      console.log(this.maps);
      this.mapsTemporal = this.maps.slice();
      console.log(this.mapsTemporal);
    }, error => {
      console.log(error);
    });
  }

  click(mapId) {
    localStorage.setItem('mapId', mapId);
  }

  remove(mapId) {
    this.userService.deleteMap(mapId).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
    window.location.reload();
  }

}
