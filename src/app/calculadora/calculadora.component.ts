import { Component } from '@angular/core';
import { LocalStorageService } from '../Servicios/local-storage.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.css'
})
export class CalculadoraComponent {
  pantalla = '';
  botones = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C'];
  claveHistorial = 'calculatorHistory';
  historial: string[] = [];
  operadores = ['/', '*', '-', '+'];
  ultimaAccionFueEvaluacion = false;

  constructor(private servicioLocalStorage: LocalStorageService<string>) {}

  ngOnInit(): void {
    this.cargarHistorial();
  }

  onButtonClick(valor: string): void {
    if (valor === 'C') {
      this.pantalla = '';
      this.ultimaAccionFueEvaluacion = false;
    } else if (valor === '=') {
      try {
        const resultado = eval(this.pantalla);
        if (isNaN(resultado) || !isFinite(resultado)) {
          throw new Error('Invalid calculation');
        }
        this.actualizarHistorial(`${this.pantalla} = ${resultado}`);
        this.pantalla = resultado.toString();
        this.ultimaAccionFueEvaluacion = true;
      } catch {
        this.pantalla = 'Error';
        this.ultimaAccionFueEvaluacion = false;
      }
    } else {
      if (this.operadores.includes(valor)) {
        if (this.pantalla === '' || this.operadores.includes(this.pantalla.slice(-1))) {
          this.pantalla = this.pantalla.slice(0, -1) + valor;
        } else {
          this.pantalla += valor;
        }
        this.ultimaAccionFueEvaluacion = false;
      } else {
        if (this.ultimaAccionFueEvaluacion) {
          this.pantalla = valor;
        } else {
          this.pantalla += valor;
        }
        this.ultimaAccionFueEvaluacion = false;
      }
    }
  }

  actualizarHistorial(operacion: string): void {
    let historial = this.servicioLocalStorage.getItem(this.claveHistorial) || [];
    if (historial.length >= 3) {
      historial.shift();
    }
    historial.push(operacion);
    this.servicioLocalStorage.setItem(this.claveHistorial, historial);
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    this.historial = this.servicioLocalStorage.getItem(this.claveHistorial) || [];
  }
}
