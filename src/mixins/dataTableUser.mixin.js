export default {
  data () {
    return {
      config: {
        title: 'Listagem dos Usuários',
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
          width: '100px',
          sort: true,
          filter: true
        },
        {
          label: 'E-mail',
          field: 'email',
          type: 'string',
          width: '100px',
          sort: false,
          filter: true
        },
        {
          label: 'Função',
          field: 'role',
          width: '50px',
          sort: true,
          filter: true,
          format (value) {
            if (value === 1) {
              return 'Administrador'
            }
            else {
              return 'Coordenador'
            }
          }
        },
        {
          label: 'Cadastrado em',
          field: 'created_at',
          width: '60px',
          type: 'date',
          sort: true,
          filter: true
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
