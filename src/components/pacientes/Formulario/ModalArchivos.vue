<template>
    <div class="contenedor">

        <div class="arrow_left">
            <i @click="mover('anterior')" class="fas fa-arrow-circle-left"></i>
        </div>

        <div class="photo">
            <img :src="ff[pos].archivo" class="imgc" alt="">
        </div>

        <div class="arrow_right">
            <i @click="mover('siguiente')" class="fas fa-arrow-circle-right"></i>
        </div>

        <div class="sing_cerrar" @click="cerrarModalArchivos">
            <i class="fas fa-times-circle"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: "ModalArchivos",
    props: ['ff', 'position'],
    data() {
        return {
            pos: 0
        }
    },
    methods: {
        cerrarModalArchivos(){
            this.$emit('cModalArchivo', false)
        },
        mover(direccion){

            if (direccion == 'anterior') {

                if (this.pos <= 0) {
                    
                }else{
                    let n = parseInt(this.pos--)
                }

            }else{

                if (this.pos >= this.ff.length - 1) {
                    
                }else{
                    let n = parseInt(this.pos++)
                }

            }
            
        }
    },
    mounted() {
        this.pos = this.position
    },
}
</script>

<style scope>
    .contenedor{
        width: 100%;
        height: 100%;
        padding-right: 250px;
        padding-left: 250px;
        color: white;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
    }
        .photo{
            width: 100%;
            height: 100%;
            background-color: black;
            display: flex;
            justify-content: center;
            align-items: center;
        }
            .photo img{
                max-width:100%;
                max-height:100%;
                vertical-align: middle;
            }

            .arrow_left{
                width: 45px;
                height: 100%;
                position: absolute;
                top: 0;
                left: 20px;
                display: flex;
                align-items: center;
                font-size: 45px;
                cursor: pointer;
            }

            .arrow_right{
                width: 45px;
                height: 100%;
                position: absolute;
                top: 0;
                right: 20px;
                display: flex;
                align-items: center;
                font-size: 45px;
                cursor: pointer;
            }

            .sing_cerrar{
                width: 30px;
                height: 30px;
                font-size: 30px;
                line-height: 0;
                position: absolute;
                top: 10px;
                right: 10px;
                cursor: pointer;
            }

            /* @supports(object-fit: cover){
                .photo img{
                    height: 100%;
                    object-fit: cover;
                    object-position: center center;
                }
            } */
</style>