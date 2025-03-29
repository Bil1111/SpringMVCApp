import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartType, registerables } from 'chart.js';

// Реєструємо всі необхідні модулі Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements AfterViewInit {
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('adoptionCanvas', { static: false }) adoptionCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('wardCanvas', { static: false }) wardCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('volunteerCanvas', { static: false }) volunteerCanvas!: ElementRef<HTMLCanvasElement>;

  charts: { [key: string]: Chart<ChartType, number[], string> } = {}; // Коректна типізація

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    setTimeout(() => this.loadChartData(), 500);
  }

  loadChartData() {
    this.http.get<{ [key: string]: number }>('https://springmvcapp.onrender.com/api/users/cities').subscribe(data => {
      this.createChart(this.chartCanvas.nativeElement, 'bar', data, 'Кількість входів за містами', false);
    });

    this.http.get<{ [key: string]: number }>('https://springmvcapp.onrender.com/api/statistics/adoptions').subscribe(data => {
      this.createChart(this.adoptionCanvas.nativeElement, 'pie', data, 'Популярність тварин для усиновлення', true);
    });

    this.http.get<{ [key: string]: number }>('https://springmvcapp.onrender.com/api/statistics/wards').subscribe(data => {
      this.createChart(this.wardCanvas.nativeElement, 'pie', data, 'Популярність тварин для опіки', true);
    });

    this.http.get<{ [key: string]: number }>('https://springmvcapp.onrender.com/api/statistics/volunteers').subscribe(data => {
      this.createChart(this.volunteerCanvas.nativeElement, 'pie', data, 'Кількість волонтерів у притулках', true);
    });
  }

  createChart(canvas: HTMLCanvasElement, type: ChartType, data: { [key: string]: number }, label: string, isPie: boolean) {
    const canvasId = canvas.id;

    if (this.charts[canvasId]) {
      this.charts[canvasId].destroy();
    }

    function getRandomColor(alpha = 0.5) {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    this.charts[canvasId] = new Chart<ChartType, number[], string>(canvas, {
      type: type,
      data: {
        labels: Object.keys(data),
        datasets: [{
          label: label,
          data: Object.values(data),
          backgroundColor: Object.values(data).map(() => getRandomColor()),
          borderColor: Object.values(data).map(() => getRandomColor(1)),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Дозволяє змінювати розмір
        ...(isPie ? { width: 300, height: 300 } : {}), // Фіксуємо розмір для кругових діаграм
        ...(type === 'bar' ? { scales: { y: { beginAtZero: true } } } : {})
      }
    });
  }
}
