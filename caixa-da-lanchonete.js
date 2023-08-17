const cardapio = {
    cafe: 3.00,
    chantily: 1.50,
    suco: 6.20,
    sanduiche: 6.50,
    queijo: 2.00,
    salgado: 7.25,
    combo1: 9.50,
    combo2: 7.50
  };
  
  const itensComExtras = {
    chantily: ['cafe'],
    queijo: ['sanduiche']
  };
  
  class CaixaDaLanchonete {
    calcularValorDaCompra(formaPagamento, itensPedido) {
        const pedido = itensPedido.map(itemQuantidade => {
          const [item, quantidade] = itemQuantidade.split(',');
  const quantFinal = parseInt(quantidade) > 0 ? parseInt(quantidade) : 0 
          return [item, quantFinal];
      });


          if (itensPedido.length === 0) {
            console.log("Não há itens no carrinho de compra!");
            return 0;
          }

      if (pedido.every(([_, quantidade]) => quantidade <= 0)) {
        console.log("Quantidade inválida!");
        return 0;
      }

  //Observação: Caso haja um ou mais itens no pedido, o valor total será calculado, 
  //independente da existência de um item com quantidade zero. Na regra: 
  //"Se a quantidade de itens for zero, apresentar mensagem "Quantidade inválida!"." 
  //Não ficou claro se o pedido como um todo deveria ser rejeitado se um item tiver quantidade zero.
  
      if (!['dinheiro', 'credito', 'debito'].includes(formaPagamento)) {
        console.log("Forma de pagamento inválida!");
        return 0;
      }
  
      let total = 0;
      const itensNoPedido = pedido.map(([item, _]) => item);
  
      for (const [item, quantidade] of pedido) {
        if (!cardapio[item]) {
          console.log("Item inválido!");
          return 0;
        }
  
        if (itensComExtras[item]) {
          for (const extra of itensComExtras[item]) {
            if (!itensNoPedido.includes(extra)) {
              console.log(`Item extra ${item} não pode ser pedido sem o item principal ${extra}.`);
              return 0;
            }
          }
        }
        
        total += cardapio[item] * quantidade;
      }
  
      if (formaPagamento === 'dinheiro') {
        total *= 0.95;
      } else if (formaPagamento === 'credito') {
        total *= 1.03;
      }
  
      return total;
    }
    
  }
  


export { CaixaDaLanchonete };
