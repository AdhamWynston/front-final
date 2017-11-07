import {CPF} from 'cpf_cnpj'
export default {
  data () {
    return {
      configCheck: {
        title: 'Escalar funcionários',
        columnPicker: true,
        leftStickyColumns: 0,
        rightStickyColumns: 2,
        refresh: true,
        bodyStyle: {
          maxHeight: '800'
        },
        rowHeight: '40px',
        responsive: true,
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
            singular: 'Funcionário selecionado.',
            plural: 'Funcionários selecionados'
          }
        }
      },
      columnsCheck: [
        {
          label: '#',
          field: 'select',
          width: '20px'
        },
        {
          label: 'Nome',
          field: 'name',
          type: 'string',
          width: '100px',
          sort: true,
          filter: true
        },
        {
          label: 'Nº Documento',
          field: 'document',
          width: '50px',
          sort: false,
          filter: true,
          format (value) {
            value = CPF.strip(value)
            return CPF.format(value)
          }
        },
        {
          label: 'Telefone',
          field: 'phone',
          width: '50px',
          sort: false,
          filter: true
        }
      ]
    }
  }
}
