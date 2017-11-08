import {CPF} from 'cpf_cnpj'
export default {
  data () {
    return {
      config: {
        title: 'Registrar Frequências',
        bodyStyle: {
          maxHeight: '500px'
        },
        rowHeight: '40px',
        responsive: true,
        messages: {
          noData: '<i class="material-icons">error_outline</i> Nenhum registro para exibir.',
          noDataAfterFiltering: '<i class="material-icons">error_outline</i> Nenhum resultado. Refine os termos da busca.'
        },
        labels: {
          columns: 'Colunas',
          search: 'Pesquisar Funcionário...',
          allCols: 'Todas as colunas'
        }
      },
      columns: [
        {
          label: 'Nome',
          field: 'name',
          type: 'string',
          width: '200px',
          sort: true,
          filter: true
        },
        {
          label: 'Nº Documento',
          field: 'document',
          sort: false,
          width: '200px',
          filter: true,
          format (value) {
            value = CPF.strip(value)
            return CPF.format(value)
          }
        },
        {
          label: 'Entrada',
          field: 'checkin',
          width: '150px'
        },
        {
          label: 'Saída',
          field: 'checkout',
          width: '150px'
        }
      ]
    }
  }
}
