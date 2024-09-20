import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService<T> {

  constructor() { }

  // Guardar un valor en el localStorage
  setItem(key: string, value: T[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Obtener un valor del localStorage
  getItem(key: string): T[] | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  // Eliminar un valor del localStorage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Limpiar todo el localStorage
  clear(): void {
    localStorage.clear();
  }

}
