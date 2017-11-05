<template>
        <q-toolbar slot="header" color="dark" class="glossy">
            <q-btn
                    flat
                    @click="openDrawer()"
            >
                <q-icon name="menu" />
            </q-btn>
            <q-toolbar-title>
                sgENV
                <div slot="subtitle">Sistema Gerenciador de Eventos</div>
            </q-toolbar-title>
            <template v-if=" this.$route.name != 'index' " >
                <q-btn class="within-iframe-hide" flat @click="back()" style="margin-right: 5px">
                    <q-icon name="keyboard_arrow_left" />
                    Voltar
                </q-btn>
            </template>
        </q-toolbar>
</template>

<script>
  import {
    QIcon,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QList,
    Loading,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QSideLink,
    Events
  } from 'quasar'
  export default {
    name: 'drawer',
    components: {
      Loading,
      QToolbar,
      QToolbarTitle,
      QBtn,
      QIcon,
      QList,
      QListHeader,
      QItem,
      QItemSide,
      QItemMain,
      QSideLink,
      Events
    },
    methods: {
      openDrawer () {
        Events.$emit('openDrawer', true)
      }
    }
  }
</script>

<style>
</style>