import { Component, OnInit, Input } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataServiceBridgeService } from '../data-service-bridge.service';
import { Observable } from 'rxjs';
import { BuyAddOn } from '../../model/BuyModels';
import { Availments } from '../../model/Availmentsmodel';
import { PostpaidBalance } from '../../model/PostpaidBalModel';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [NgbModalConfig, NgbModal, NgbActiveModal, DataServiceBridgeService]
})

export class DashboardComponent implements OnInit {

    @Input() addOn$: any;
    @Input() promos$: any;
    loading = false;
    buyAddOns: boolean = false;
    listAddOns: boolean = false;
    loadBalance: boolean;
    clickMessage = '';

    private buyAddOn: BuyAddOn;
    private availments: Availments;
    private postpaidBalance: PostpaidBalance;


    constructor(config: NgbModalConfig,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private data: DataServiceBridgeService,
        private route: ActivatedRoute) {
        // customize default values of modals used by this component tree
       
        this.loadBalance = false;
        this.route.params.subscribe(params => this.addOn$ = params.id)
        this.route.params.subscribe(params => this.promos$ = params.id)
    }

    openBuyPromo(any, brand: any) {
        this.buyAddOns = true;
        this.listAddOns = false;
        this.modalService.open(any, {centered: true});
        this.activeModal.dismiss();
        this.clickMessage = brand;
        console.log('test');
    }
    
    buyAlladd(AllAdd, brand: any){
        this.modalService.open(AllAdd, {centered: true});
        this.buyAddOns = false;
        this.activeModal.dismiss(AllAdd);
        this.clickMessage = brand;
        console.log(brand);
    }

    openLg(content) {
        this.modalService.open(content, { size: 'lg' });
        this.buyAddOns = false;
        this.listAddOns= true;
      }


    CallLoadPartial() {
        this.loadBalance = true;
        this.loading = true;

    }

    CloseLoadPartial() {
        this.loadBalance = false;
        this.loading = false;
    }



    ngOnInit() {
        this.data.GetAddOns().subscribe(
            data => {
                this.addOn$ = data
                console.log("I got", data)
            })
        
        this.data.GetPromos().subscribe(
            data => {
                this.promos$ = data
                console.log("I got", data)
            })
        
    }

    // title = 'Our Promos';
    // Promos = [
    //   new Promo(1, 3535, 'Home Boost 15', 15.00,'Enjoy 1GB of data, valid for 1 day.', 573, 'False', 'NA', '' ),
    //   new Promo(2, 3535, 'Home Boost 50', 50.00,'Enjoy 1GB of data and 300MB for Youtube, Spinnr, Vimeo valid for 3 days.', 557, 'False', 'NA', '' ),
    //   new Promo(3, 3535, 'Home Boost 100', 100.00,'Enjoy 1GB of data, valid for 1 day.', 573, 'False', 'NA', '' ),
    //         ];

    // myPromo = this.Promos[0];

}

// export class Promo {
//     constructor(
//       public id: Number,
//       public PromID: Number,
//       public Promoname: string,
//       public Price: Number,
//       public PromoDescription: String,
//       public GroupId: Number,
//       public IsPromoRecurring: String,
//       public RecurringPromoId: String,
//       public Spiel: string,

//       ) { }
//   }
