<template>
	<div class="wrapper-popup" v-bind:class="getClassPopup">
		<div class="rule">
			<h3>Luat Choi</h3>
			<p>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla minima
				est aliquam assumenda, ab dolores fuga iste exercitationem, modi
				sapiente dolorum vel quibusdam porro, dolor nesciunt aliquid id quasi
				molestias?
			</p>
			<button 
                v-on:click="confirm"
                class="confirm">Da hieu</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "popup-rule",
    props:{
        isOpenPopup:{ type: Boolean, default: false}
    },
	data() {
		return {};
	},
    methods: {
        confirm(){
            this.$emit("handleConfirm");
        }
    },
    computed: {
        getClassPopup(){
            return {
                'open-popup': this.isOpenPopup
            }
        }
    }
};
</script>

<style>
.wrapper-popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(0,0,0,0.4);
    opacity: 0;
    visibility: hidden;
    transition: all .3s ease;
    -o-transition: all .3s ease;
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
}
.wrapper-popup.open-popup{
    opacity: 1;
    visibility: visible;
}
.rule{
    position: absolute;
    width: 350px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1.2);
    padding: 20px;
    background-color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    transition: all .3s ease;
    -o-transition: all .3s ease;
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
}
.open-popup .rule{
    transform: translate(-50%, -50%) scale(1);
}
.rule h3{
    margin-bottom: 10px;
}
.rule .confirm{
    background-color:#fff;
    padding: 8px 15px;
    margin-top: 20px;
    cursor: pointer;
    border: 2px solid #333;
    transition: all .3s ease;
    -o-transition: all .3s ease;
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
}
.rule .confirm:hover{
    color:#fff;
    background-color:#333;
}
</style>