import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ConceptMap } from '../conceptmap-module/conceptmap/conceptmap.types';
import { Map } from '../models/concept-map';

@Component({
  selector: 'cm-list-maps',
  templateUrl: './list-maps.component.html',
  styleUrls: ['./list-maps.component.css']
})
export class ListMapsComponent implements OnInit {

  maps: Map[];
  mapsTemporal: Map[];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getMaps().subscribe(res => {
      this.maps = res;
      console.log("Mapas");
      console.log(this.maps);
      this.mapsTemporal = this.maps.slice();
      console.log(this.mapsTemporal);
    }, error => {
      console.log(error);
    });
  }
}
