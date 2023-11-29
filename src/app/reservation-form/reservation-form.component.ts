import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReservationService} from "../reservation/reservation.service";
import {Reservation} from "../models/reservation";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {
  //inside form groups, we have form controls, so they have the same name as in the formControlName
  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required]
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      let reservation = this.reservationService.getReservation(id);
      if (reservation) {
        this.reservationForm.patchValue(reservation)
      }
    }
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      //check if we want to create a new one, or if we have already an id, to just edit
      let reservation: Reservation = this.reservationForm.value;

      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if (id) {
        //Update the existing reservation
        this.reservationService.updateReservation(id, reservation);
      }else{
        //Create new one
        this.reservationService.addReservation(reservation);
      }
      this.router.navigate(["/list"]);
    }
  }
}
