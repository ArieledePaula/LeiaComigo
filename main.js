'use strict'; //usado para mostrar o problema, caso tenha

 //verifica se o CEP é valido
const eNumero = (numero) => /^[0-9]+$/.test(numero);//expressão para ver se está entre 0 e 9
const cepValido = (cep) => cep.length == 8 && eNumero(cep);//length verifica o tamanho do cep// se tem 8 digitos

const pesquisarCep = async() =>{
    limparFormulario();
    const url = ` http://viacep.com.br/ws/${cep.value}/json/`;


    //reliza verificação 
    if(cepValido(cep.value)){
           const dados = await fetch(url);//await é uma pausa para ver se o fetch vai conseguir dar o retorno da url
           const addres = await dados.json();//transforma o conteudo dados em json
        
        //hasOwnProprety retorna um valor boolean indicando se o objetivo possui a propriedade específica no parenteses
           if(addres.hasOwnProperty('erro')){
              alert('CEP não encontrado');
           }
           else{
            preencherFormulario(addres);
           }
    } else {
        alert("CEP incorreto, tente novamente!");
    }

}
const preencherFormulario = (endereco)  => {
    document.getElementById('rua').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.estado;

}
// função limpar formulario
const limparFormulario = () =>{// => arrow function nao precisa do return
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

document.getElementById('cep').addEventListener('focusout',pesquisarCep);//evento