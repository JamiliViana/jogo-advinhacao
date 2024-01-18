import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-jogo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './jogo.component.html',
  styleUrl: './jogo.component.css'
})
export class JogoComponent {
  palavras: string[] = ["casa", "bola", "pano", "gato",
    "mesa", "folha", "carro", "pedra", "janela", "cebola",
    "mala", "pilha", "mochila", "foca", "lobo", "banana"];
  palavraSecreta: string = "";
  chutesRestantes: number = 0;
  chutesErrados: string[] = [];
  palavraAdvinhada: string[] = [];
  letraChute: string = "";
  jogoTerminado: boolean = false;
  mensagemFimDeJogo: string = "";

  constructor() {
    this.iniciarPalavraAdvinhada();
    this.novaRodada();
  }

  iniciarPalavraAdvinhada() {
    this.palavraAdvinhada = Array(this.palavraSecreta.length).fill('_');
  }

  novaRodada(): void {
    this.escolherPalavraAleatoria();
    this.iniciarPalavraAdvinhada();
    this.chutesRestantes = this.palavraSecreta.length * 2;
    this.chutesErrados = [];
    this.jogoTerminado = false;
  }

  escolherPalavraAleatoria(): void {
    const indicePalavra = Math.floor(Math.random() * this.palavras.length);
    this.palavraSecreta = this.palavras[indicePalavra].toUpperCase();
  }

  realizarChute() {
    this.letraChute = this.letraChute.toUpperCase();

    if (this.jogoTerminado) {
      alert("O jogo já terminou. Clique em 'Jogar Novamente' para reiniciar.");
      return;
    }

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
        this.mensagemFimDeJogo = "Parabéns! Você acertou a palavra secreta!";
        this.jogoTerminado = true;

      } else if (this.chutesRestantes === 0) {
        this.mensagemFimDeJogo = "Você perdeu! A palavra secreta era: " + this.palavraSecreta;
        this.jogoTerminado = true;
      }
    }
  }
}
