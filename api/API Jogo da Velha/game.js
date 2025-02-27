// Inicia o jogo
let player = "X";
let moves = 0;
let isFirstCpuMove = true;

/**
 * Insere o simbolo escolhido no local onde o jogador clicou
 */
function playMove(id) {
  const cell = document.getElementById(id);

    // Só permite o movimento se a table/espaço estiver vazio
  if (cell.src.includes("transp.png")) {
      cell.src = getPlayerImage(player); // Obtenha a imagem correta
      moves++;

      // Confere se a jogada resultou em vitoria, derrota ou empate
      if (checkWin()) {
          setTimeout(() => alert(`Game Over: ${player} venceu!`), 10);
          return;
      }

      if (moves === 9) {
          setTimeout(() => alert("Game Over: Deu velha!"), 10);
          return;
      }

      // Troca o jogador
      player = player === "X" ? "O" : "X";

      // Se o modo de jogar contra computador estiver ativado, o computador faz uma jogada
      if (document.getElementById("cpu").checked && player === "O") {
          if (isFirstCpuMove) {
              // Verifica se o meio (c5) está vazio
              if (getImageSrc("c5") === "transp.png") {
                  playMove("c5"); // O computador marca o meio
                  isFirstCpuMove = false; // Atualiza para que não seja mais a primeira jogada
              } else {
                const pcMove = getBestMove();
                playMove(pcMove);
            }
          } else {
              const pcMove = getBestMove();
              playMove(pcMove);
          }
      }
  }
}

/**
 * Confere se existe uma combinação que leve a vitória
 * @returns {boolean} - True se vitoria for detectada, se nao, false.
 */
function checkWin() {
  const winPatterns = [
      ["c1", "c2", "c3"],
      ["c4", "c5", "c6"],
      ["c7", "c8", "c9"],
      ["c1", "c4", "c7"],
      ["c2", "c5", "c8"],
      ["c3", "c6", "c9"],
      ["c1", "c5", "c9"],
      ["c3", "c5", "c7"],
  ];

  return winPatterns.some(pattern => {
      const [a, b, c] = pattern;
      return (
          getImageSrc(a) === getImageSrc(b) &&
          getImageSrc(b) === getImageSrc(c) &&
          getImageSrc(a) !== "transp.png"
      );
  });
}

/**
 * Recupera o nome do arquivo de imagem para uma determinada célula.
 * @param {string} id - o ID da celula.
 * @returns {string} - Onome do file da imagem na celula.
 */
function getImageSrc(id) {
  const src = document.getElementById(id).src;
  return src.substring(src.lastIndexOf("/") + 1);
}

/**
 * Encontra a melhor jogada para o computador
 * @returns {string} - o ID da celula para a jogada do computador.
 */
function getBestMove() {
  const emptyCells = [];
  for (let i = 1; i <= 9; i++) {
      if (getImageSrc(`c${i}`) === "transp.png") {
          emptyCells.push(`c${i}`);
      }
  }

  // Procura por uma jogada que ira vencer o jogo
  for (const cell of emptyCells) {
      document.getElementById(cell).src = getPlayerImage("O"); // Simula a jogada do computador
      if (checkWin()) {
          document.getElementById(cell).src = "img/transp.png"; // Desfaz jogada
          return cell; // Volta a jogada vencedora
      }
      document.getElementById(cell).src = "img/transp.png"; // Desfaz jogada
  }

  // Procura por uma jogada que ira bloquear oponente
  for (const cell of emptyCells) {
      document.getElementById(cell).src = getPlayerImage("X"); // Simula a jogada do computador
      if (checkWin()) {
          document.getElementById(cell).src = "img/transp.png"; // Desfaz jogada
          return cell; // Returna ao movimento de bloqueio
      }
      document.getElementById(cell).src = "img/transp.png"; // Desfaz jogada
  }

   // Se não houver movimento vencedor ou bloqueador, retorne uma célula vazia aleatória
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

/**
 * Reseta o jogo
 */
function resetGame() {
  for (let i = 1; i <= 9; i++) {
      document.getElementById(`c${i}`).src = "img/transp.png";
  }
  player = "X";
  moves = 0;
  isFirstCpuMove = true;
}

const images = {
    "one-piece": {
        "X": "img/X_one_piece.png",
        "O": "img/O_one_piece.png"
    },
    "death": {
        "X": "img/X_death.png",
        "O": "img/O_death.png"
    },
    "gow": {
        "X": "img/X_gow.png",
        "O": "img/O_gow.png"
    },
    "dragon-ball": {
        "X": "img/X_dragon_ball.png",
        "O": "img/O_dragon_ball.png"
    },
    "bleach": {
        "X": "img/X_bleach.png",
        "O": "img/O_bleach.png"
    }
};

function changeTheme(theme) {
  // Remove todas as classes
  document.body.classList.remove('one-piece', 'death', 'gow', 'dragon-ball', 'bleach');
  
  // Adiciona a classe escolhida
  document.body.classList.add(theme);
  resetGame();
}

function getPlayerImage(player) {
  const currentTheme = getCurrentTheme();
  return images[currentTheme][player];
}

function getCurrentTheme() {
  if (document.body.classList.contains('one-piece')) {
      return 'one-piece';
  } else if (document.body.classList.contains('death')) {
      return 'death';
  } else if (document.body.classList.contains('dragon-ball')) {
      return 'dragon-ball';
  } else if (document.body.classList.contains('gow')) {
      return 'gow';
  }
}
