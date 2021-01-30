import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DropdownComponent } from "./dropdown.component";

@NgModule({
    declarations:[
        DropdownComponent
    ],
    exports:[
        DropdownComponent
    ],
    imports:[
        CommonModule,
        FormsModule
        
    ],
    providers:[]
})

export class sharedModule{}