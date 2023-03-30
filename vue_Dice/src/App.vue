<template>
	<div id="app">
		<div class="wrapper clearfix">
            <players
                v-bind:scorePlayer="scorePlayer"
                v-bind:currentScore="currentScore"
                v-bind:activePlayer="activePlayer"
                v-bind:isWinner="isWinner"
            />
            
            <controls 
                v-bind:isWinner="isWinner"
                v-on:handleNewGame="handleNewGame"
                v-on:handleRollDice="handleRollDice"
                v-on:handleHold="handleHold"
                v-on:handleFinalScore="handleFinalScore"
                v-bind:finalScore="finalScore"
                v-bind:isPlaying="isPlaying"
            />
				
			<dices 
                v-bind:dices="dices"
            />
            <popup-rule 
                v-on:handleConfirm="handleConfirm"
                v-bind:isOpenPopup="isOpenPopup" />
        </div>
	</div>
</template>

<script>
import Players from './components/Players';
import Controls from './components/Controls';
import Dices from './components/Dices';
import PopupRule from './components/PopupRule';

export default {
	name: 'app',
	data () {
		return {
			scorePlayer: [1,4],
            currentScore: 0,
            activePlayer: 2,
            isPlaying: false,
            isOpenPopup: false,
            dices:[2,5], 
            finalScore: 10
		}
	},
	components: {
		Players,
		Controls,
		Dices,
        PopupRule
	},
    methods: {
        handleNewGame(){
            this.isOpenPopup = true;
        },
        handleFinalScore(e){
            var number = parseInt(e.target.value);
            if(isNaN(number)){
                this.finalScore = "";
            }else{
                this.finalScore = number;
            }
        },
        handleHold(){
            if (this.isPlaying) {
                let {scorePlayer, activePlayer, currentScore} = this;
                let oldScore = scorePlayer[activePlayer];
                
                // let cloneScore = [...scorePlayer];
                // cloneScore[activePlayer] = oldScore + currentScore;
                // this.scorePlayer = cloneScore;

                this.$set(this.scorePlayer, activePlayer, oldScore + currentScore);
                console.log(this.scorePlayer);
                // this.scorePlayer[this.activePlayer] = this.scorePlayer[this.activePlayer] + this.currentScore; 
            
                if(!this.isWinner){
                    this.nextPlayer();
                }
            }else {
                alert("Press New Game to start")
            }
        },
        handleConfirm(){
            this.isOpenPopup = false;
            this.isPlaying = true;
            this.activePlayer =0;
            this.scorePlayer =[0,0];
            this.currentScore =0;
        },
        handleRollDice(){
            if(this.isPlaying){
                var d1 = Math.floor(Math.random()*6) + 1;
                var d2 = Math.floor(Math.random()*6) + 1;
                this.dices = [d1,d2];
                
                if(d1===1 || d2===1){  
                    // let activePlayer = this.activePlayer;            
                    // setTimeout(() => {
                    //     alert(`Player ${activePlayer + 1} rolled 1. Sorry`);
                    // }, 100);

                    this.nextPlayer();                      
                }else {
                    this.currentScore = this.currentScore + d1 + d2;
                }
            } else {
                alert("Press New Game to start")
            }
        },
        nextPlayer(){
            this.activePlayer = this.activePlayer ===0? 1 : 0;
            this.currentScore = 0;
        }
    },
    computed: {
        isWinner(){
            let {scorePlayer, finalScore} = this;
            if(scorePlayer[0] >= finalScore || scorePlayer[1] >= finalScore){
                this.isPlaying = false;
                return true;
            }
            return false;
        }
    }
}
</script>
Controls

<style>
/**********************************************
*** GENERAL
**********************************************/
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
}

.clearfix::after {
    content: "";
    display: table;
    clear: both;
}

body {
    background-image: linear-gradient(rgba(62, 20, 20, 0.4), rgba(62, 20, 20, 0.4)), url('/public/assets/back.jpg');
    background-size: cover;
    background-position: center;
    font-family: Lato;
    font-weight: 300;
    position: relative;
    height: 100vh;
    color: #555;
}

.wrapper {
    width: 1000px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.3);
    overflow: hidden;
}

</style>
