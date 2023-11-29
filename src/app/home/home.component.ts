import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  centerContent: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      // Check if the current route is the default route ("/")
      this.centerContent = segments.length === 0 || segments[0].path === '';
    });
  }

}
