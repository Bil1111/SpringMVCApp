import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart!: Chart<"bar" | "line" | "scatter" | "bubble" | "pie" | "doughnut" | "polarArea" | "radar", number[], string>;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.loadChartData();
  }

  loadChartData() {
    this.http.get<{ [key: string]: number }>('http://localhost:8080/api/users/cities').subscribe(data => {
      const cities = Object.keys(data);
      const counts = Object.values(data);

      this.chart = new Chart(this.chartCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: cities,
          datasets: [{
            label: 'Кількість входів за містами',
            data: counts,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    });
  }
}
