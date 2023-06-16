import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/app/services/chart.service';
import { Chart, registerables } from 'node_modules/chart.js'
Chart.register(...registerables);
import { ManufacturerService } from 'src/app/services/manufacturer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private service: ChartService,
    private apiService: ManufacturerService) { }
  chartdata: any;

  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];

  monthdata: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  colourdata: any[] = ["red", "pink", "yellow", "purple","orange","blue","turquoise", "brown", "green", "grey", "salmon", "gold" ];



  orders: any[] = [];

  totalOrderPrice: number = 0;
  orderQuantity: number = 0;
  customerQuantity: number = 0;
  productQuantity: number = 0;


  ngOnInit(): void {
    this.apiService.getTotalOrdersPrice().subscribe(price => {
      this.totalOrderPrice = price;
      console.log("total" + this.totalOrderPrice);
    });

    this.apiService.getOrderQuantity().subscribe(quantity => {
      this.orderQuantity = quantity;
    });

    this.apiService.getCustQuantity().subscribe(quantity => {
      this.customerQuantity = quantity;
    });

    this.apiService.getProdQuantity().subscribe(quantity => {
      this.productQuantity = quantity;
    });

    this.apiService.getRecentOrders(5).subscribe(data => {
      this.orders = data;
    });

    this.service.Getchartinfo().subscribe(result => {
      this.chartdata = result;
      if(this.chartdata!=null){
        for(let i=0; i<this.chartdata.length ;i++){
          //console.log(this.chartdata[i]);
          this.labeldata.push(this.chartdata[i].year);
          this.realdata.push(this.chartdata[i].amount);
          this.colordata = this.colourdata;
        }
        
       
        //this.RenderChart(this.labeldata,this.realdata,this.colordata,'doughnut','dochart');

        
      }
    });      
    this.apiService.getTotalPricesByYear(2023).subscribe((totalPrices: number[]) => {

      this.RenderChart(this.monthdata,totalPrices,this.colourdata,'bar','barchart', 'Revenue In VND');
    });

    this.apiService.getCategoryNames().subscribe((nameCategories: string[]) => {
      this.apiService.getCategoryCounts().subscribe((categoryData: number[]) => {
        this.RenderPieChart(nameCategories,categoryData,this.colourdata,'pie','piechart', 'Quantity');
      });
    });

    this.apiService.getTopPurchasedProducts().subscribe((topProducts: { name: string, quantity: number }[]) => {
      const productNames = topProducts.map(product => product.name);
      const productQuantities = topProducts.map(product => product.quantity);
  
      this.RenderChartHorizontal(productNames,productQuantities,this.colourdata,'horizontal_barchart', 'Quantity');
    });
    

    
    
  }

  RenderChart(labeldata:any,maindata:any,colordata:any,type:any,id:any, field: any) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [{
          label: field,
          data: maindata,
          backgroundColor: colordata,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  RenderPieChart(labeldata:any,maindata:any,colordata:any,type:any,id:any, field: any) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [{
          label: field,
          data: maindata,
          backgroundColor: colordata,
          borderWidth: 1
        }]
      }
    });
  }


  RenderChartHorizontal(labeldata:any,maindata:any,colordata:any,id:any, field:any) {
    const myChart = new Chart(id, {
      type: 'bar',
      data: {
        labels: labeldata,
        datasets: [{
          label: field,
          data: maindata,
          backgroundColor: colordata,
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
      }
    });
  }
}
