import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  listaUsuarios: {nombre: string, edad: number, dpi: string}[] = [];
 resultado = '';

 formularioUsuario = new FormGroup({
  nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ\\s]+$')]),
  edad: new FormControl('', [Validators.required, Validators.min(2), Validators.pattern('^[0-9]+$')]),
  dpi: new FormControl('', [Validators.required, Validators.minLength(13), Validators.pattern('^[0-9]{1,13}$')]),
 });

 constructor(@Inject(DOCUMENT) private document: Document) {
  const localStorage = document.defaultView?.localStorage;

  this.listaUsuarios = [];
  let datos = localStorage?.getItem('usuarios');
  if (datos != null) {
   let arreglo = JSON.parse(datos);
   if (arreglo != null){
    for (let usuario of arreglo) {
     this.listaUsuarios.push(usuario);
    }
   }
  }
 }
 agregarUsuario() {
  if (this.formularioUsuario.valid) {
    this.listaUsuarios.push({
      nombre: this.formularioUsuario.value.nombre as string,
      edad: parseInt(this.formularioUsuario.value.edad as string),
      dpi: this.formularioUsuario.value.dpi as string
    });
    localStorage.setItem('usuarios', JSON.stringify(this.listaUsuarios));
    this.formularioUsuario.reset();
      }else{
      this.resultado = 'Datos incorrectos';
    }
 }
 
 borrarUsuario(id: number){
  this.listaUsuarios.splice(id, 1);
  localStorage.setItem('usuarios', JSON.stringify(this.listaUsuarios));
 }

 borrarTodos(){
  localStorage.clear();
  this.listaUsuarios = [];
 }
}
