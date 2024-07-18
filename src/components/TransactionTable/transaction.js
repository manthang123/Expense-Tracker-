import React from 'react'

function transaction(transaction) {
    const columns = [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Type",
          dataIndex: "type",
          key: "type",
        },
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
        },
        {
          title: "Amount",
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: "Tag",
          dataIndex: "tag",
          key: "tag",
        },
      ];
    
    return <Table dataSource ={transaction} columns={columns}/>
}

export default transaction
