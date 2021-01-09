<template>

     <div>
        <div class="barra" id="navb">
            <div class="menu" @click="AbrirMenu" v-if="icono">
                <i class="far fa-arrow-alt-circle-left"></i>
            </div>
            <div class="menu" @click="AbrirMenu" v-else>
                <i class="fas fa-bars"></i>
            </div>

            <!-- COMPONENTES DEL MENU -->
        </div>
        <div class="box">
            <br>
            <i class="fas fa-clock"></i>
            Romario estuvo aqui <br>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui atque sint doloribus, nemo aliquam rem suscipit hic, facere itaque, ab consequatur cumque debitis eveniet aut corrupti soluta quisquam nulla consectetur.
            Praesentium corporis ipsa fuga voluptates aut beatae assumenda, nulla quod optio illo quis eius doloribus harum perspiciatis incidunt hic quam. Suscipit eaque fuga voluptatibus, dolorum deleniti obcaecati libero sed eos!
            Vero delectus consequuntur explicabo ab ipsam sapiente nisi voluptate placeat odit illo, nostrum tempore exercitationem a optio quas. Nesciunt ex iure voluptatum optio? Quibusdam, distinctio sit aliquam labore cupiditate corrupti!
            Rerum quasi magni saepe laudantium, alias ipsa maiores quibusdam recusandae deserunt sunt enim velit reprehenderit quae cumque mollitia autem repellendus cum voluptatem quas molestias animi dolores provident veritatis? Tempora, fugit!
            Placeat rerum obcaecati quasi, corrupti eveniet a sapiente, recusandae rem distinctio quae architecto vel, adipisci dolores saepe mollitia odit perspiciatis laudantium at! Sit labore, iusto enim maxime earum quos harum.
            Non praesentium autem labore temporibus laudantium, odit ut aspernatur. Eius placeat perspiciatis voluptates debitis ex, sint obcaecati recusandae architecto ipsa suscipit, id quia molestiae quis. Voluptatibus laborum nostrum dolore quod!
            Recusandae et debitis maiores delectus, saepe aut libero necessitatibus, odio soluta illo itaque. Ipsam, natus dolorum, corrupti magnam quia voluptates molestiae nostrum distinctio odio tempora, voluptatum veritatis veniam voluptatem vitae.
            Similique ab mollitia iure vitae, natus debitis doloribus blanditiis officia laudantium vero maxime totam accusamus adipisci architecto animi tempore error obcaecati aut est enim at ipsum! Cum eum impedit nam.
            Vel quod aperiam nobis quasi voluptas ea doloremque, tempore quam repellendus architecto asperiores eius, dolorem magnam quos dolor consequatur. Tempora a laboriosam dolor illo aspernatur qui libero ipsum ullam! Recusandae?
            Facere inventore, debitis beatae impedit itaque ipsa aliquam quod alias. Quam aliquam, dolorum placeat soluta harum, consequuntur eum ullam obcaecati, deleniti neque asperiores dolorem nam? Tempora reprehenderit at dolorem veniam?
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui atque sint doloribus, nemo aliquam rem suscipit hic, facere itaque, ab consequatur cumque debitis eveniet aut corrupti soluta quisquam nulla consectetur.
            Praesentium corporis ipsa fuga voluptates aut beatae assumenda, nulla quod optio illo quis eius doloribus harum perspiciatis incidunt hic quam. Suscipit eaque fuga voluptatibus, dolorum deleniti obcaecati libero sed eos!
            Vero delectus consequuntur explicabo ab ipsam sapiente nisi voluptate placeat odit illo, nostrum tempore exercitationem a optio quas. Nesciunt ex iure voluptatum optio? Quibusdam, distinctio sit aliquam labore cupiditate corrupti!
            Rerum quasi magni saepe laudantium, alias ipsa maiores quibusdam recusandae deserunt sunt enim velit reprehenderit quae cumque mollitia autem repellendus cum voluptatem quas molestias animi dolores provident veritatis? Tempora, fugit!
            Placeat rerum obcaecati quasi, corrupti eveniet a sapiente, recusandae rem distinctio quae architecto vel, adipisci dolores saepe mollitia odit perspiciatis laudantium at! Sit labore, iusto enim maxime earum quos harum.
            Non praesentium autem labore temporibus laudantium, odit ut aspernatur. Eius placeat perspiciatis voluptates debitis ex, sint obcaecati recusandae architecto ipsa suscipit, id quia molestiae quis. Voluptatibus laborum nostrum dolore quod!
            Recusandae et debitis maiores delectus, saepe aut libero necessitatibus, odio soluta illo itaque. Ipsam, natus dolorum, corrupti magnam quia voluptates molestiae nostrum distinctio odio tempora, voluptatum veritatis veniam voluptatem vitae.
            Similique ab mollitia iure vitae, natus debitis doloribus blanditiis officia laudantium vero maxime totam accusamus adipisci architecto animi tempore error obcaecati aut est enim at ipsum! Cum eum impedit nam.
            Vel quod aperiam nobis quasi voluptas ea doloremque, tempore quam repellendus architecto asperiores eius, dolorem magnam quos dolor consequatur. Tempora a laboriosam dolor illo aspernatur qui libero ipsum ullam! Recusandae?
            Facere inventore, debitis beatae impedit itaque ipsa aliquam quod alias. Quam aliquam, dolorum placeat soluta harum, consequuntur eum ullam obcaecati, deleniti neque asperiores dolorem nam? Tempora reprehenderit at dolorem veniam?
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui atque sint doloribus, nemo aliquam rem suscipit hic, facere itaque, ab consequatur cumque debitis eveniet aut corrupti soluta quisquam nulla consectetur.
            Praesentium corporis ipsa fuga voluptates aut beatae assumenda, nulla quod optio illo quis eius doloribus harum perspiciatis incidunt hic quam. Suscipit eaque fuga voluptatibus, dolorum deleniti obcaecati libero sed eos!
            Vero delectus consequuntur explicabo ab ipsam sapiente nisi voluptate placeat odit illo, nostrum tempore exercitationem a optio quas. Nesciunt ex iure voluptatum optio? Quibusdam, distinctio sit aliquam labore cupiditate corrupti!
            Rerum quasi magni saepe laudantium, alias ipsa maiores quibusdam recusandae deserunt sunt enim velit reprehenderit quae cumque mollitia autem repellendus cum voluptatem quas molestias animi dolores provident veritatis? Tempora, fugit!
            Placeat rerum obcaecati quasi, corrupti eveniet a sapiente, recusandae rem distinctio quae architecto vel, adipisci dolores saepe mollitia odit perspiciatis laudantium at! Sit labore, iusto enim maxime earum quos harum.
            Non praesentium autem labore temporibus laudantium, odit ut aspernatur. Eius placeat perspiciatis voluptates debitis ex, sint obcaecati recusandae architecto ipsa suscipit, id quia molestiae quis. Voluptatibus laborum nostrum dolore quod!
            Recusandae et debitis maiores delectus, saepe aut libero necessitatibus, odio soluta illo itaque. Ipsam, natus dolorum, corrupti magnam quia voluptates molestiae nostrum distinctio odio tempora, voluptatum veritatis veniam voluptatem vitae.
            Similique ab mollitia iure vitae, natus debitis doloribus blanditiis officia laudantium vero maxime totam accusamus adipisci architecto animi tempore error obcaecati aut est enim at ipsum! Cum eum impedit nam.
            Vel quod aperiam nobis quasi voluptas ea doloremque, tempore quam repellendus architecto asperiores eius, dolorem magnam quos dolor consequatur. Tempora a laboriosam dolor illo aspernatur qui libero ipsum ullam! Recusandae?
            Facere inventore, debitis beatae impedit itaque ipsa aliquam quod alias. Quam aliquam, dolorum placeat soluta harum, consequuntur eum ullam obcaecati, deleniti neque asperiores dolorem nam? Tempora reprehenderit at dolorem veniam?
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui atque sint doloribus, nemo aliquam rem suscipit hic, facere itaque, ab consequatur cumque debitis eveniet aut corrupti soluta quisquam nulla consectetur.
            Praesentium corporis ipsa fuga voluptates aut beatae assumenda, nulla quod optio illo quis eius doloribus harum perspiciatis incidunt hic quam. Suscipit eaque fuga voluptatibus, dolorum deleniti obcaecati libero sed eos!
            Vero delectus consequuntur explicabo ab ipsam sapiente nisi voluptate placeat odit illo, nostrum tempore exercitationem a optio quas. Nesciunt ex iure voluptatum optio? Quibusdam, distinctio sit aliquam labore cupiditate corrupti!
            Rerum quasi magni saepe laudantium, alias ipsa maiores quibusdam recusandae deserunt sunt enim velit reprehenderit quae cumque mollitia autem repellendus cum voluptatem quas molestias animi dolores provident veritatis? Tempora, fugit!
            Placeat rerum obcaecati quasi, corrupti eveniet a sapiente, recusandae rem distinctio quae architecto vel, adipisci dolores saepe mollitia odit perspiciatis laudantium at! Sit labore, iusto enim maxime earum quos harum.
            Non praesentium autem labore temporibus laudantium, odit ut aspernatur. Eius placeat perspiciatis voluptates debitis ex, sint obcaecati recusandae architecto ipsa suscipit, id quia molestiae quis. Voluptatibus laborum nostrum dolore quod!
            Recusandae et debitis maiores delectus, saepe aut libero necessitatibus, odio soluta illo itaque. Ipsam, natus dolorum, corrupti magnam quia voluptates molestiae nostrum distinctio odio tempora, voluptatum veritatis veniam voluptatem vitae.
            Similique ab mollitia iure vitae, natus debitis doloribus blanditiis officia laudantium vero maxime totam accusamus adipisci architecto animi tempore error obcaecati aut est enim at ipsum! Cum eum impedit nam.
            Vel quod aperiam nobis quasi voluptas ea doloremque, tempore quam repellendus architecto asperiores eius, dolorem magnam quos dolor consequatur. Tempora a laboriosam dolor illo aspernatur qui libero ipsum ullam! Recusandae?
            Facere inventore, debitis beatae impedit itaque ipsa aliquam quod alias. Quam aliquam, dolorum placeat soluta harum, consequuntur eum ullam obcaecati, deleniti neque asperiores dolorem nam? Tempora reprehenderit at dolorem veniam?
        </div>
     </div>
</template>

<script>
export default {
    name: "Template",
    data() {
        return {
            icono: true
        }
    },
    methods: {
        AbrirMenu(){
            this.$emit('OpenMenu', true)
            this.icono = !this.icono
        }
    },
    mounted() {
       
    },
}
</script>

<style scope>
    .menu{
        width: 48px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 25px;
        cursor: pointer;
        color: rgb(63, 70, 76);
    }

    .barra{
        width: 100%;
        height: 48px;
        background-color: white;
        transition: .2s ease;
        position: sticky;
        top: 0;
    }

    .box{
        padding: 10px;
        box-sizing: border-box;
    }

   
</style>