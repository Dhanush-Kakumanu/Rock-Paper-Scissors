let computer;
        let human;
        let result;
        let score=JSON.parse(localStorage.getItem('score'));
        if (!score){
          score={
          wins: 0,
          losses: 0,
          ties: 0,
          };
        }
        updateScore();
        function updateScore(){
          document.querySelector('.js-score').innerHTML = `Wins: ${score.wins},Losses: ${score.losses},Ties: ${score.ties}`;
        }
        function pickMove() {
          computer=Math.random()*3;
          if(computer<1){
            computer='Rock';
          } else if(computer<2 && computer>=1){
            computer='Paper';
          } else{
            computer='Scissors';
          }
          return computer;
        }

        let isAutoPlaying = false;
        let id;

        function autoPlay() {
          if(!isAutoPlaying) {
            id = setInterval(() => {
              const human = pickMove();
              playGame(human);
            },1000);
            isAutoPlaying = true;
            
          } else {
            clearInterval(id);
            isAutoPlaying = false;
          }
        }

        document.querySelector('.js-rock').addEventListener('click', () => {
          playGame('Rock');
        });
        document.querySelector('.js-paper').addEventListener('click', () => {
          playGame('Paper');
        });
        document.querySelector('.js-scissors').addEventListener('click', () => {
          playGame('Scissors');
        });
        document.querySelector('.js-reset-score').addEventListener('click', () => {
          score={wins: 0,
            losses: 0,
            ties: 0}
          localStorage.removeItem('score');
          updateScore();
        });
        document.querySelector('.js-auto-play').addEventListener('click', () => {
          autoPlay();
        });
        document.body.addEventListener('keydown', (event) => {
          if(event.key === 'r') {
            playGame('Rock');
          } else if (event.key === 'p') {
            playGame('Paper');
          } else if (event.key === 's') {
            playGame('Scissors');
          }
        });
        function playGame(human){
          pickMove(); 
          if(human===computer){
            result='You Tied';
            score.ties++;
          } else if ((human==='Rock' && computer==='Paper')||(human==='Paper' && computer==='Scissors')||(human==='Scissors' && computer==='Rock')){
            result='You Lose';
            score.losses++;
          } else{
            result='You Win';
            score.wins++;
          }
          localStorage.setItem('score',JSON.stringify(score));
          updateScore();
          document.querySelector('.js-result').innerHTML = result;
          document.querySelector('.js-moves').innerHTML = `You picked<img src="${human}-emoji.png" class="move-icon"> Computer picked
          <img src="${computer}-emoji.png" class="move-icon">`;
        }