import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';

const temperature = (text) => <span>{text}<sup>o</sup> C</span>;

const TableColumns = [
  {
    title: 'Cidade',
    dataIndex: 'city',
    key: 'city'
  },
  {
    title: 'Temperatura',
    dataIndex: 'temp',
    key: 'temp',
    render: (text) => temperature(text)
  },
  {
    title: 'Mínima',
    dataIndex: 'min',
    key: 'min',
    render: (text) => temperature(text)
  },
  {
    title: 'Máxima',
    dataIndex: 'max',
    key: 'max',
    render: (text) => temperature(text)
  }
];

const ReportTable = ({ reports }) => {
  return(
    <>
      <Link to="/">
      <Button type="primary" icon={<ArrowLeftOutlined />}>
      Voltar
      </Button>
      </Link>
      <Table 
        pagination={{ 
          total: 500
        }} 
        columns={TableColumns} 
        dataSource={reports}
      />
    </>
  );
};

export default ReportTable;
