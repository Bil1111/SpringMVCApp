import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Chart} from 'chart.js/auto';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements AfterViewInit {
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef;
  chart!: Chart<"bar" | "line" | "scatter" | "bubble" | "pie" | "doughnut" | "polarArea" | "radar", number[], string>;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.loadChartData();
  }

  loadChartData() {
    this.http.get<{ [key: string]: number }>('http://localhost:8080/api/users/cities').subscribe(data => {
      const cities = Object.keys(data);
      const counts = Object.values(data);

      // Якщо графік уже існує — знищуємо його перед створенням нового
      if (this.chart) {
        this.chart.destroy();
      }

      function getRandomColor(alpha = 0.5) {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }

      this.chart = new Chart(this.chartCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: cities,
          datasets: [{
            label: 'Кількість входів за містами',
            data: counts,
            backgroundColor: counts.map(() => getRandomColor()),
            borderColor: counts.map(() => getRandomColor(1)),
            borderWidth: 1,
            barPercentage: 0.5, // Розмір окремого стовпця (0 - дуже тонкий, 1 - максимально широкий)
            categoryPercentage: 0.6 // Відстань між стовпцями
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
