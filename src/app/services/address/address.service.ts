import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environmentDev } from '@env/environment.dev';
import { IAddress } from '@models/index';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private addressUrl = `${environmentDev.apiUrl}/account/user/profile/address`;
  private addressesSubject: BehaviorSubject<IAddress[]> = new BehaviorSubject<
    IAddress[]
  >([]);

  get addresses$(): Observable<IAddress[]> {
    return this.addressesSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  addAddress(addressData: IAddress) {
    return this.http.post(this.addressUrl, addressData);
  }

  getAddressesByUserId(userId: number): void {
    this.http
      .get<IAddress[]>(`${this.addressUrl}/${userId}`)
      .subscribe((addresses) => this.addressesSubject.next(addresses));
  }

  getAllAddresses(): Observable<IAddress[]> {
    return this.http.get<IAddress[]>(`${this.addressUrl}`);
  }
}
