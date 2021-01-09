<template>
    <div class="contendor_transfer">
        <div class="cuerpo_transfer">
            <div class="top_transfer">
                Catálogo de transfer
            </div>
            <div class="box_transfer">
                <div v-for="(item, index) in transfers" :key="index" class="recipiente_transfer" @click="seleccion(item.codigoTransfer)">
                    <img :src="item.url" style="width: 100%;height: 100%;" alt="" :title="item.codigoTransfer">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'EligeTransfer',
    computed: {
        ...mapState(['transfers'])
    },
    data() {
        return {
            
        }
    },
    created() {
        window.addEventListener('keydown', this.doCommand)
    },
    destroyed() {
        window.removeEventListener('keydown', this.doCommand)
    },
    methods: {
        cerrar(){
            this.$emit('cerrar_transfer', false)
        },
        doCommand(e){
            if (e.keyCode == 27) {
                this.cerrar()
            }
        },
        seleccion(id){
            this.$emit('transfer_seleccionado', id)
            this.cerrar()
        }
    },
}
</script>

<style scoped>
    .contendor_transfer{
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        padding: 40px;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
    }
        .cuerpo_transfer{
            background-color: white;
            width: 100%;
            height: 100%;
        }

        .top_transfer{
            width: 100%;
            height: 40px;
            border-bottom: 1px solid #edebe9;
            font-size: 19px;
            display: flex;
            align-items: center;
            padding-left: 10px;
        }

        .box_transfer{
            width: 100%;
            height: calc(100% - 40px);
            padding: 40px;
            overflow: auto;
            
        }
            .recipiente_transfer{
                width: 100px;
                height: 100px;
                transition: .4s ease;
                cursor: pointer;
                margin-right: 10px;
                margin-bottom: 10px;
                float: left;
            }

            .recipiente_transfer:hover{
                transform: scale(1.8);
            }
</style>