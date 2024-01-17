import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-jogo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './jogo.component.html',
  styleUrl: './jogo.component.css'
})
export class JogoComponent {
  palavraSecreta = "banana";
  chutesRestantes = this.palavraSecreta.length * 2;
  chutesErrados: string[] = [];
  palavraAdvinhada: string[] = [];
  letraChute: string = "";

  constructor() {
    this.palavraSecreta = this.palavraSecreta.toUpperCase();
    this.iniciarPalavraAdvinhada();
  }

  iniciarPalavraAdvinhada() {
    for (let i = 0; i < this.palavraSecreta.length; i++) {
      this.palavraAdvinhada.push('_');
    }
  }

  realizarChute() {
    this.letraChute = this.letraChute.toUpperCase();
    if (this.chutesErrados.includes(this.letraChute)) {
      alert("Letra já chutada! Tente outra.");
      return;
    }

    if (this.chutesRestantes > 0) {
      let acertou = false;

      for (let i = 0; i < this.palavraSecreta.length; i++) {
        if (this.palavraSecreta[i] === this.letraChute) {
          if (this.palavraAdvinhada[i] === this.letraChute) {
            alert("Letra já advinhada corretamente. Tente outra.");
            return;
          }

          this.palavraAdvinhada[i] = this.letraChute;
          acertou = true;
        }
      }

      if (!acertou) {
        this.chutesErrados.push(this.letraChute);
      }

      this.chutesRestantes--;

      if (this.palavraAdvinhada.join('') === this.palavraSecreta) {
        alert("Parabéns! Você acertou a palavra secreta!");
      } else if (this.chutesRestantes === 0) {
        alert("Você perdeu! A palavra secreta era: " + this.palavraSecreta);
      }
    }
  }
}
