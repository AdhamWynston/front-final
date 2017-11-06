
export default {
  data () {
    return {
      config: {
        title: 'Listagem dos Funcionários',
        columnPicker: true,
        leftStickyColumns: 0,
        rightStickyColumns: 2,
        refresh: true,
        bodyStyle: {
          maxHeight: '500px'
        },
        selection: 'single',
        rowHeight: '60px',
        responsive: true,
        pagination: {
          rowsPerPage: 5,
          options: [5, 10, 15, 30, 50, 500]
        },
        messages: {
          noData: '<i class="material-icons">error_outline</i> Nenhum registro para exibir.',
          noDataAfterFiltering: '<i class="material-icons">error_outline</i> Nenhum resultado. Refine os termos da busca.'
        },
        labels: {
          columns: 'Colunas',
          search: 'Pesquisar cliente...',
          allCols: 'Todas as colunas',
          clear: 'limpar',
          all: 'Todos',
          rows: 'Registros por página',
          selected: {
            singular: 'item selecionado.',
            width: '10px'
          }
        }
      },
      columns: [
        {
          label: 'Nome',
          field: 'name',
          type: 'string',
          width: '80px',
          sort: true,
          filter: true
        },
        {
          label: 'Início',
          field: 'startDate',
          width: '60px',
          type: 'date',
          sort: true,
          filter: true
        },
        {
          label: 'Término',
          field: 'endDate',
          type: 'date',
          width: '60px',
          sort: true,
          filter: true
        },
        {
          label: 'Duração',
          field: 'duration',
          width: '40px',
          sort: true,
          format (value) {
            return value + ' Horas'
          }
        },
        {
          label: 'Status',
          field: 'sta',
          filter: true,
          sort: true,
          type: 'integer',
          width: '50px'
        },
        {
          label: 'Ações',
          field: 'actions',
          width: '30px'
        }
      ]
    }
  }
}
