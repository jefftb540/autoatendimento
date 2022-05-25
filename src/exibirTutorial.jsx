import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Passos from './Passos';



const tutoriais = [
    {
        id:'1',
        titulo: "Como conectar-se a Wi-fi no Android 11",
        passos: [
            {
                id:1,
                passo: "Conecte-se  rede sem fio wIFRN-Visitantes. Senha visitante@ifrn"
            },
            {
                id:2,
                passo: 'No navegador do seu celular, acesse: https://www2.ifrn.edu.br/wifi, ou escaneie o QR Code',
                imagem:'/qr_ifrn_certificado.png'
            },
            {
                id:3,
                passo: 'Na página que se abre, escolha a opção "configuração manual"'
            },
            {
                id:4,
                passo: "Faça o download do certificado rnp-ca.cer "
            },
            {
                id:5,
                passo: 'Em seu dispositivo Android, vá à tela de configuração da rede sem fio. Toque em "Preferências de Wi-Fi".'

            },
            {
                id:6,
                passo: 'Na tela que surge toque em "Avançado".'
            },
            {
                id:7,
                passo: 'Em seguida em "Instalar Certificados"'
            },
            {
                id:8,
                passo: 'Em seguida selecione o arquivo "rnp-ca.cer" salvo na pasta Download.'
            },
            {
                id:9,
                passo: "Digite um nome para o certificado (sugestão: ifrn) e clique em ok"
            },
            {
                id:10,
                passo: 'Esqueça a rede Certificado-Eduroam e conecte à rede eduroam'

            },
            {
                id:11,
                passo: 'No campo Certificado CA escolha IFRN ou o nome escolhido por você.'
            },
            {
                id:12,
                passo: "No campo Domínio digite: ifrn.edu.br"
            },
            {
                id:13,
                passo: 'No campo Identidade digite: matricula@ifrn.edu.br'
            },
            {
                id:14,
                passo: 'No campo Senha digite sua senha do SUAP'
            },
            {
                id:15,
                passo: 'Clique em conectar'
            }
        ]

    }
];



const ExibirTutorial = () => {
    const navigate = useNavigate();
    let  tutorial = [];
    const params = useParams();    
    console.log(tutoriais)
    console.log(params)
    tutorial = tutoriais.filter((tutorial) => tutorial.id === params.id);
    
    
    console.log(tutorial)

    
    const [currentPage, setCurrentPage] = useState(1);
    const [passosPorPagina] = useState(6);

    const indexOfLastPost = currentPage * passosPorPagina;
    const indexOfFirstPost = indexOfLastPost - passosPorPagina;
    const currentPosts = tutorial[0].passos.slice(indexOfFirstPost, indexOfLastPost);

    const handleKeyPress = (event) => {
        console.log(event)
        if (event.keyCode ===13){
            if(currentPage < (tutorial[0].passos.length / passosPorPagina)){
                setCurrentPage(currentPage+1)
            }else{
                navigate('/')
            }
        }
      }
    return (<>
        <div className='hidden-input'><input type='text' autoFocus onKeyDown={handleKeyPress}></input></div>
        <Passos tutorial={currentPosts}/>
    </>);
}
 
export default ExibirTutorial;