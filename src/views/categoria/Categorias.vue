<template>
    <v-layout>
        <v-flex>
            <v-card>
                <v-card-title>
                    Categorias
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="categorias"
                    :items-per-page="5"
                    class="elevation-1"
                    loading="true"
                    :search="search"
                >
                    
                </v-data-table>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data(){
        return{
            search: '',
            headers: [
                {
                    text: 'Nombre',
                    align: 'left',
                    sortable: false,
                    value: 'nombre',
                },
                { text: 'Boutiques', value: 'boutiques' },
                { text: 'Prendas', value: 'prendas' },
                { text: 'Opciones', value: 'opciones' },
            ],
            categorias: [
                {
                    nombre: 'Pantalones',
                    boutiques: 10,
                    prendas: 45,
                },
                {
                    nombre: 'Camisas',
                    boutiques: 5,
                    prendas: 30,
                },
                {
                    nombre: 'Vestidos',
                    boutiques: 9,
                    prendas: 10,
                },
                {
                    nombre: 'Zapatos',
                    boutiques: 10,
                    prendas: 89,
                },
            ],
        }
    }
}
</script>

<style>

</style>