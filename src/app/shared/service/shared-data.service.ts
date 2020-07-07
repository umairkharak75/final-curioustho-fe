import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
link:string
  constructor() { }

setLink(link:string){
this.link=link

}
getLink(){

return this.link

}

}
