<template>
    <div class="layout-padding row justify-center">
        <div class="col-xs-12 col-sm-8 col-md-8">
            <q-collapsible
                    icon="info_outline"
                    label="Dados do Evento"
                    style="max-width: 800px; margin-bottom: 10px"
                    class="shadow-2"
            >
                <div>
                    <q-item>
                        <q-item-main>
                            <q-item-tile label>Nome</q-item-tile>
                            <q-item-tile sublabel>{{ event.name }}</q-item-tile>
                        </q-item-main>
                    </q-item>
                    <q-item>
                        <q-item-main>
                            <q-item-tile label>Início do evento</q-item-tile>
                            <q-item-tile sublabel>{{ event.startDate | moment}}</q-item-tile>
                        </q-item-main>
                    </q-item>
                    <q-item>
                        <q-item-main>
                            <q-item-tile label>Término do evento</q-item-tile>
                            <q-item-tile sublabel>{{ event.endDate | moment}}</q-item-tile>
                        </q-item-main>
                    </q-item>
                    <q-item>
                        <q-item-main>
                            <q-item-tile label>Quantidade de Seguranças</q-item-tile>
                            <q-item-tile sublabel>{{ event.quantityEmployees }}</q-item-tile>
                        </q-item-main>
                    </q-item>
                    <q-item>
                        <q-item-main>
                            <q-item-tile label>Observações</q-item-tile>
                            <q-item-tile sublabel>{{ event.observations }}</q-item-tile>
                        </q-item-main>
                    </q-item>
                    <q-item>
                        <q-item-main>
                            <q-item-tile label>Cadastrado em</q-item-tile>
                            <q-item-tile sublabel>{{ event.created_at | moment }}</q-item-tile>
                        </q-item-main>
                    </q-item>
                    <q-item>
                        <q-item-main>
                            <q-item-tile label>Atualizado em</q-item-tile>
                            <q-item-tile sublabel>{{ event.updated_at | moment }}</q-item-tile>
                        </q-item-main>
                    </q-item>
                </div>
            </q-collapsible>
          <q-collapsible
             icon="ion-person"
             label="Dados do Cliente"
             style="max-width: 800px; margin-bottom: 10px"
             class="shadow-2"
          >
            <div>
              <template v-if="event.client">
                <q-item>
                  <q-item-main>
                    <q-item-tile label>Nome</q-item-tile>
                    <q-item-tile sublabel>{{ event.client.name }}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>Document</q-item-tile>
                    <q-item-tile sublabel>{{ event.client.document | document }}</q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>Telefone</q-item-tile>
                    <q-item-tile sublabel>{{ event.client.phone }}</q-item-tile>
                  </q-item-main>
                </q-item>
                <template v-if="event.client.phoneAlternative != null">
                  <q-item>
                    <q-item-main>
                      <q-item-tile label>Telefone Alternativo</q-item-tile>
                      <q-item-tile sublabel>{{ event.client.phoneAlternative }}</q-item-tile>
                    </q-item-main>
                  </q-item>
                </template>
              </template>
            </div>
          </q-collapsible>
          <div>
            <q-progress :percentage="progress" stripe animate style="height: 45px" />
          </div>
            <template >
                <q-data-table
                        :data="employeesList.data || []"
                        :columns="columns"
                        :config="config"
                        @refresh="refresh"
                        @selection="check"
                >
                    <template slot="col-created_at" slot-scope="cell">
                        <span>{{cell.row.created_at | moment }}</span>
                    </template>
                    <template slot="col-select" slot-scope="cell">
                      <q-checkbox v-model="check_employee" @input="confirme" :val="cell.row.id"/>
                    </template>
                    <template slot="selection" slot-scope="selection">
                        <q-btn class="primary clear" @click="goTo(selection)"><q-icon name="remove_red_eye"></q-icon>Salvar registros</q-btn>
                    </template>
                </q-data-table>
            </template>
        </div>
      <q-fixed-position corner="bottom-left" :offset="[16, 16]">
        <q-btn  @click="goEdit()" round icon="ion-edit" color="orange">
        </q-btn>
      </q-fixed-position>
      {{ tees }}
    </div>
</template>

<script>
    import moment from 'moment'
    import dataTableEventMixin from '../../../mixins/dataTableManageEvent'
    import { CNPJ, CPF } from 'cpf_cnpj'
    import {
      QProgress,
      Dialog,
      QDataTable,
      QFixedPosition,
      QFab,
      QFabAction,
      Toast,
      QModal,
      QStepper,
      QStep,
      QStepperNavigation,
      QModalLayout,
      QCheckbox,
      QRadio,
      QToggle,
      QList,
      QListHeader,
      QItem,
      QItemSeparator,
      QCollapsible,
      QInnerLoading,
      QItemSide,
      QItemMain,
      QItemTile,
      QLayout,
      QCard,
      QCardTitle,
      QCardMedia,
      QCardActions,
      QCardSeparator,
      QCardMain,
      QToolbar,
      clone,
      QToolbarTitle,
      QSearch,
      QTabs,
      QRouteTab,
      QBtn,
      QIcon,
      QSideLink,
      QTooltip,
      QScrollArea} from 'quasar'
    export default {
      mixins: [dataTableEventMixin],
      data () {
        return {
          client: {},
          employees: [],
          check_row: false,
          checked: 0
        }
      },
      methods: {
        goEdit () {
          this.$router.push('/events/' + this.event.id + '/edit')
        },
        removeLastArray () {
          this.check_employee.pop()
        },
        registerEmployees () {
          let data = {
            event_id: this.$route.params.id,
            employees: this.check_employee
          }
          this.$store.dispatch('manageInsert', data)
            .then((response) => {
              console.log(response)
              this.$router.push('/events')
              Toast.create.positive({
                html: 'Evento cadastrado com sucesso!',
                icon: 'done'
              })
            })
            .catch((response) => {
              console.log(response)
              Toast.create.negative({
                html: 'Não pode ser cadastrado',
                icon: 'cancel'
              })
            })
        },
        goTo (value) {
          console.log(value)
        },
        check (value) {
          this.checked = this.checked + 1
          if (value === 2) {
            console.log('teste')
          }
          else if (value > 2) {
            return false
          }
        },
        refresh (done) {
          this.timeout = setTimeout(() => {
            done()
          }, 5000)
        },
        getEmployees () {
          this.$http.get('http://127.0.0.1:8000/api/employees?where[status]=1')
            .then((response) => {
              this.employees = response.data
            })
        }
      },
      computed: {
        confirme () {
          if (this.check_employee.length > this.event.quantityEmployees) {
            this.removeLastArray()
          }
          else if (this.check_employee.length === this.event.quantityEmployees) {
            console.log(this.check_employee.length)
          }
        },
        tees () {
          console.log(this.check_employee)
        },
        check_employee () {
          return this.$store.state.events.manageEmployees || []
        },
        manageEmployees () {
          return this.$store.state.events.manageEmployees || []
        },
        progress () {
          let x = this.event.quantityEmployees
          let val = (100 / x) * this.check_employee.length
          return val
        },
        employeesList () {
          return this.$store.state.events.employeeList
        },
        event () {
          return this.$store.state.events.one || {}
        }
      },
      mounted () {
        this.$store.dispatch('eventsGet', this.$route.params.id)
        this.$store.dispatch('employeesManageList')
        this.$store.dispatch('manageGet', this.$route.params.id)
      },
      filters: {
        moment: function (date) {
          return moment(date).format('DD/MM/YYYY HH:mm')
        },
        document: function (value) {
          if (value.length === 11) {
            return CPF.format(value)
          }
          return CNPJ.format(value)
        }
      },
      watch: {
        pagination (value) {
          if (!value) {
            this.oldPagination = clone(this.config.pagination)
            this.config.pagination = false
            return
          }
          this.config.pagination = this.oldPagination
        },
        rowHeight (value) {
          this.config.rowHeight = value + 'px'
        },
        bodyHeight (value) {
          let style = {}
          if (this.bodyHeightProp !== 'auto') {
            style[this.bodyHeightProp] = value + 'px'
          }
          this.config.bodyStyle = style
        },
        bodyHeightProp (value) {
          let style = {}
          if (value !== 'auto') {
            style[value] = this.bodyHeight + 'px'
          }
          this.config.bodyStyle = style
        }
      },
      components: {
        QProgress,
        QDataTable,
        QFixedPosition,
        QCheckbox,
        QModal,
        QModalLayout,
        QRadio,
        QToggle,
        QCollapsible,
        QList,
        QStepper,
        QStep,
        QStepperNavigation,
        QItem,
        QItemSeparator,
        QItemTile,
        QInnerLoading,
        QTooltip,
        QCard,
        QCardMedia,
        QCardActions,
        QCardSeparator,
        QCardMain,
        QCardTitle,
        QFabAction,
        QFab,
        QLayout,
        QToolbar,
        QToolbarTitle,
        QSearch,
        QTabs,
        QRouteTab,
        QBtn,
        QIcon,
        QItemSide,
        QItemMain,
        Toast,
        QSideLink,
        QListHeader,
        QScrollArea
      }
    }
</script>

<style>
</style>
